import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type DhikrContextType = {
  count: number;
  selectedDhikrId: string;
  incrementCount: () => void;
  selectDhikr: (id: string) => void;
};

const DhikrContext = createContext<DhikrContextType | undefined>(
  undefined
);

const STORAGE_KEY = "adhkar-progress";

export function DhikrProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [selectedDhikrId, setSelectedDhikrId] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    async function loadProgress() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);

        if (saved) {
          const progress = JSON.parse(saved);
          setCounts(progress.counts ?? {});
          setSelectedDhikrId(progress.selectedDhikrId ?? "");
        }
      } catch (error) {
        console.error("Unable to load dhikr progress:", error);
      } finally {
        setHydrated(true);
      }
    }

    loadProgress();
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    async function saveProgress() {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ counts, selectedDhikrId })
        );
      } catch (error) {
        console.error("Unable to save dhikr progress:", error);
      }
    }

    saveProgress();
  }, [counts, selectedDhikrId, hydrated]);

  const count = counts[selectedDhikrId] ?? 0;

  function incrementCount() {
    if (!selectedDhikrId || !hydrated) return;

    setCounts((previousCounts) => ({
      ...previousCounts,
      [selectedDhikrId]:
        (previousCounts[selectedDhikrId] ?? 0) + 1,
    }));
  }

  function selectDhikr(id: string) {
    if (!hydrated) return;
    setSelectedDhikrId(id);
  }

  return (
    <DhikrContext.Provider
      value={{
        count,
        selectedDhikrId,
        incrementCount,
        selectDhikr,
      }}
    >
      {children}
    </DhikrContext.Provider>
  );
}

export function useDhikr() {
  const context = useContext(DhikrContext);

  if (!context) {
    throw new Error("useDhikr must be used inside DhikrProvider");
  }

  return context;
}
