import type { Dhikr } from "@/data/dhikr";
import { supabase } from "@/lib/supabase";
import type { DhikrData } from "@/utils/dhikrSchema";

export async function fetchDhikr(): Promise<Dhikr[]> {
  const { data, error } = await supabase
    .from("dhikr")
    .select("id, name, meaning, hadith, target, isFavorite")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data as Dhikr[];
}

export async function fetchDhikrById(id: string): Promise<Dhikr> {
  const { data, error } = await supabase
    .from("dhikr")
    .select("id, name, meaning, hadith, target, isFavorite")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Dhikr;
}

export async function createDhikr(input: DhikrData): Promise<Dhikr> {
  const { data, error } = await supabase
    .from("dhikr")
    .insert({
      name: input.name,
      meaning: input.meaning,
      hadith: input.hadith,
      target: input.target,
      isFavorite: input.isFavorite,
    })
    .select("id, name, meaning, hadith, target, isFavorite")
    .single();

  if (error) throw error;

  return data as Dhikr;
}
