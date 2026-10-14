import {
    createContext,
    useContext,
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

export function DhikrProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [count, setCount] = useState(0);
  const [selectedDhikrId, setSelectedDhikrId] = useState("");

  function incrementCount() {
    setCount((previousCount) => previousCount + 1);
  }

  function selectDhikr(id: string) {
    setSelectedDhikrId(id);
    setCount(0);
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
