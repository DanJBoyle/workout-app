import { fetchExerciseByMuscle } from "@/api/exerciseApi";
import { getExerciseCache, saveExerciseCache } from "@/database/db";

/**
 * Smart exercise fetching with caching
 * 1. Checks if body part is cached
 * 2. If cached, returns cached results
 * 3. If not cached, fetches from API
 * 4. Saves results to cache
 * 5. Returns results
 */
export const getExercisesSmart = async (bodyPart: string) => {
  if (!bodyPart || bodyPart.trim().length === 0) {
    return [];
  }

  // Check cache first
  const cached = getExerciseCache(bodyPart);
  if (cached) {
    console.log(`Cache hit for bodyPart: ${bodyPart}`);
    return cached;
  }

  console.log(`Cache miss for bodyPart: ${bodyPart}, fetching from API...`);

  // Fetch from API if not cached
  const data = await fetchExerciseByMuscle(bodyPart);

  // Save to cache for future use
  if (data && data.length > 0) {
    saveExerciseCache(bodyPart, data);
    console.log(`Cached ${data.length} exercises for bodyPart: ${bodyPart}`);
  }

  return data;
};
