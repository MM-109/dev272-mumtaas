export type Dhikr = {
  id: string;
  name: string;
  meaning: string;
  hadith: string;
  target: number;
  isFavorite: boolean;
};

export const dhikr: Dhikr[] = [
  {
    id: "1",
    name: "Subhanallah",
    meaning: "Glory be to Allah",
    hadith: "Whoever says 'Subhanallah wa bihamdihi' 100 times a day, his sins will be forgiven even if they are like the foam of the sea.",
    target: 33,
    isFavorite: true,
  },
  {
    id: "2",
    name: "Alhamdulillah",
    meaning: "Praise be to Allah",
    hadith: "Alhamdulillah fills the scale, and Subhanallah and Alhamdulillah fill what is between the heavens and the earth.",
    target: 33,
    isFavorite: true,
  },
  {
    id: "3",
    name: "Allahu Akbar",
    meaning: "Allah is the Greatest",
    hadith: "The most beloved words to Allah are four: Subhanallah, Alhamdulillah, La ilaha illallah, and Allahu Akbar.",
    target: 34,
    isFavorite: true,
  },
  {
    id: "4",
    name: "Astaghfirullah",
    meaning: "I seek forgiveness from Allah",
    hadith: "If anyone constantly seeks forgiveness, Allah will appoint for him a way out of every distress and a relief from every anxiety.",
    target: 100,
    isFavorite: false,
  },
  {
    id: "5",
    name: "La ilaha illallah",
    meaning: "There is no deity except Allah",
    hadith: "The best remembrance is the remembrance of La ilaha illallah.",
    target: 100,
    isFavorite: true,
  },
  {
    id: "6",
    name: "Subhanallahi wa bihamdihi",
    meaning: "Glory and praise be to Allah",
    hadith: "Two phrases are light on the tongue, heavy on the scale, and beloved to the Most Merciful.",
    target: 100,
    isFavorite: false,
  },
  {
    id: "7",
    name: "La hawla wala quwwata illa billah",
    meaning: "There is no power and no strength except with Allah",
    hadith: "It is a treasure from the treasures of Paradise.",
    target: 100,
    isFavorite: false,
  },
  {
    id: "8",
    name: "Allahumma salli 'ala Muhammad",
    meaning: "O Allah, send blessings upon Muhammad",
    hadith: "Whoever sends blessings upon me once, Allah will send blessings upon him tenfold.",
    target: 100,
    isFavorite: true,
  },
];