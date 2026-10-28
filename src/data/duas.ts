import catalogue from "./catalogue.json";

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
  { id: "waking-up", title: "When Waking Up", description: "Hisnul Muslim · Chapter 1" },
  { id: "wearing-garment", title: "When Wearing a Garment", description: "Hisnul Muslim · Chapter 2" },
  { id: "new-garment", title: "When Wearing a New Garment", description: "Hisnul Muslim · Chapter 3" },
  { id: "someone-new-garment", title: "For Someone Wearing a New Garment", description: "Hisnul Muslim · Chapter 4" },
  { id: "undressing", title: "Before Undressing", description: "Hisnul Muslim · Chapter 5" },
  { id: "entering-bathroom", title: "Before Entering the Bathroom", description: "Hisnul Muslim · Chapter 6" },
  { id: "leaving-bathroom", title: "After Leaving the Bathroom", description: "Hisnul Muslim · Chapter 7" },
  { id: "istikhara", title: "Seeking Guidance (Istikhara)", description: "Hisnul Muslim · Chapter 26" },
  { id: "fear-during-sleep", title: "Fear During Sleep", description: "Hisnul Muslim · Chapter 30" },
  { id: "dreams", title: "Good and Bad Dreams", description: "Hisnul Muslim · Chapter 31" },
  { id: "encountering-enemy", title: "Encountering an Enemy or Authority", description: "Hisnul Muslim · Chapter 36" },
  { id: "unjust-ruler", title: "Fear of a Ruler's Injustice", description: "Hisnul Muslim · Chapter 37" },
  { id: "doubts-in-faith", title: "Doubts in Faith", description: "Hisnul Muslim · Chapter 40" },
  { id: "settling-debt", title: "Settling a Debt", description: "Hisnul Muslim · Chapter 41" },
  { id: "protecting-children", title: "Protecting Children", description: "Hisnul Muslim · Chapter 48" },
  { id: "visiting-sick", title: "Visiting the Sick", description: "Hisnul Muslim · Chapter 49" },
];

const chapterIds: Record<string, number> = {
  "waking-up": 1,
  "wearing-garment": 2,
  "new-garment": 3,
  "someone-new-garment": 4,
  undressing: 5,
  "entering-bathroom": 6,
  "leaving-bathroom": 7,
  istikhara: 26,
  "fear-during-sleep": 30,
  dreams: 31,
  "encountering-enemy": 36,
  "unjust-ruler": 37,
  "doubts-in-faith": 40,
  "settling-debt": 41,
  "protecting-children": 48,
  "visiting-sick": 49,
};


export const duas: Dua[] = [];

type CatalogueStep = {
  type?: string;
  arabic?: string;
  text?: string;
  items?: {
    dua?: {
      id?: string;
      arabic?: string;
      transliteration?: string;
      translation?: string;
    };
  }[];
};

type CatalogueVariation = {
  id: string;
  label?: string;
  steps?: CatalogueStep[];
};

type CatalogueEntry = {
  id: string;
  title: string;
  chapterId: string;
  sourceReference: string;
  steps?: CatalogueStep[];
  variations?: CatalogueVariation[];
};

const entries = catalogue.entries as CatalogueEntry[];

for (const category of duaCategories) {
  const chapterNumber = chapterIds[category.id];
  const chapterId = `chapter-${String(chapterNumber).padStart(6, "0")}`;

  const chapterEntries = entries.filter(
    (entry) => entry.chapterId === chapterId
  );

  for (const entry of chapterEntries) {
    
    if (category.id === "doubts-in-faith") {
      const steps =
        entry.variations?.flatMap(
          (variation) => variation.steps ?? []
        ) ?? entry.steps ?? [];

      const instruction = steps
        .filter((step) => step.type === "instruction")
        .map((step) => step.text ?? "")
        .filter(Boolean)
        .join("\n\n");

      const recitations = steps.flatMap(
        (step) => step.items ?? []
      );

      const arabic = recitations
        .map((item) => item.dua?.arabic ?? "")
        .filter(Boolean)
        .join("\n\n");

      const transliteration = recitations
        .map((item) => item.dua?.transliteration ?? "")
        .filter(Boolean)
        .join("\n\n");

      const translation = recitations
        .map((item) => item.dua?.translation ?? "")
        .filter(Boolean)
        .join("\n\n");

      const instructionArabic = steps
        .filter((step) => step.type === "instruction")
        .map((step) => step.arabic ?? "")
        .filter(Boolean)
        .join("\n\n");

      duas.push({
        id: entry.id,
        categoryId: category.id,
        title: entry.title,
        arabic: arabic || instructionArabic,
        transliteration,
        meaning: [instruction, translation]
          .filter(Boolean)
          .join("\n\n"),
        reference: `Hisnul Muslim ${entry.sourceReference}`,
      });

      continue;
    }

    const reference = `Hisnul Muslim ${entry.sourceReference}`;
    const seen = new Set<string>();

    function addSteps(
      steps: CatalogueStep[],
      variationId: string,
      variationLabel?: string
    ) {
      for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
        const step = steps[stepIndex];

        if (step.type === "instruction" && step.text) {
          const key = `instruction-${step.arabic ?? ""}-${step.text}`;

          if (!seen.has(key)) {
            seen.add(key);

            duas.push({
              id: `${entry.id}-${variationId}-instruction-${stepIndex}`,
              categoryId: category.id,
              title: entry.title,
              arabic: step.arabic ?? "",
              transliteration: "",
              meaning: step.text,
              reference,
            });
          }
        }

        for (const item of step.items ?? []) {
          const dua = item.dua;

          if (!dua?.arabic || !dua.translation) continue;

          const key = `dua-${dua.id ?? dua.arabic}`;

          if (seen.has(key)) continue;

          seen.add(key);

          duas.push({
            id: `${entry.id}-${variationId}-${dua.id ?? stepIndex}`,
            categoryId: category.id,
            title: variationLabel
              ? `${entry.title} (${variationLabel})`
              : entry.title,
            arabic: dua.arabic,
            transliteration: dua.transliteration ?? "",
            meaning: dua.translation,
            reference,
          });
        }
      }
    }

    addSteps(entry.steps ?? [], "main");

    for (const variation of entry.variations ?? []) {
      addSteps(
        variation.steps ?? [],
        variation.id,
        variation.label
      );
    }
  }
}
