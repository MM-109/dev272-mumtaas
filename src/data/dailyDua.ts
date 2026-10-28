import catalogue from "./catalogue.json";

export type DailyDua = {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
};

const dailyDuas: DailyDua[] = [];
const seen = new Set<string>();

for (const entry of catalogue.entries) {
  if (entry.type !== "invocation") continue;

  for (const variation of entry.variations ?? []) {
    for (const step of variation.steps) {
      for (const item of step.items ?? []) {
        const dua = item.dua;

        if (!dua || seen.has(dua.id)) continue;

        const fields = [
          dua.arabic,
          dua.transliteration,
          dua.translation,
        ];

        if (
          fields.some(
            (field) =>
              !field ||
              field.includes("...") ||
              field.includes("…")
          )
        ) {
          continue;
        }

        seen.add(dua.id);

        dailyDuas.push({
          id: dua.id,
          title: entry.title,
          arabic: dua.arabic,
          transliteration: dua.transliteration,
          translation: dua.translation,
          reference: `Hisnul Muslim ${entry.sourceReference}`,
        });
      }
    }
  }
}

console.log("Daily duas available:", dailyDuas.length);

export function getDuaOfTheDay(date = new Date()) {
  if (dailyDuas.length === 0) return null;

  const day = Math.floor(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ) / 86400000
  );

  const index = ((day % dailyDuas.length) + dailyDuas.length) %
    dailyDuas.length;

  return dailyDuas[index];
}
