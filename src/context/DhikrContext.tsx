import { dhikr as initialDhikr, type Dhikr } from "@/data/dhikr";
import type { DhikrData } from "@/utils/dhikrSchema";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type DhikrContextType = {
  dhikrList: Dhikr[];
  count: number;
  selectedDhikrId: string;
  incrementCount: () => void;
  selectDhikr: (id: string) => void;
  addDhikr: (data: DhikrData) => void;
};

const DhikrContext = createContext<DhikrContextType | undefined>(
  undefined
);

export function DhikrProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dhikrList, setDhikrList] = useState<Dhikr[]>(initialDhikr);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [selectedDhikrId, setSelectedDhikrId] = useState("");

  const count = counts[selectedDhikrId] ?? 0;

  function incrementCount() {
    if (!selectedDhikrId) return;

    setCounts((previousCounts) => ({
      ...previousCounts,
      [selectedDhikrId]:
        (previousCounts[selectedDhikrId] ?? 0) + 1,
    }));
  }

  function selectDhikr(id: string) {
    setSelectedDhikrId(id);
  }

  function addDhikr(data: DhikrData) {
    const newItem: Dhikr = {
      id: Date.now().toString(),
      name: data.name,
      meaning: data.meaning,
      hadith: data.hadith,
      target: data.target,
      isFavorite: data.isFavorite,
    };

    setDhikrList((previousList) => [newItem, ...previousList]);
  }

  return (
    <DhikrContext.Provider
      value={{
        dhikrList,
        count,
        selectedDhikrId,
        incrementCount,
        selectDhikr,
        addDhikr,
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
