export type Dua = {
  id: string;
  categoryId: string;
  title: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  reference: string;
};

export type DuaCategory = {
  id: string;
  title: string;
  description: string;
};

export const duaCategories: DuaCategory[] = [
  {
    id: "waking-up",
    title: "When Waking Up",
    description: "Supplications for beginning the day",
  },
  {
    id: "sleeping",
    title: "Before Sleeping",
    description: "Supplications before going to bed",
  },
  {
    id: "anxiety",
    title: "For Anxiety and Sorrow",
    description: "Supplications for difficult moments",
  },
];

export const duas: Dua[] = [];
