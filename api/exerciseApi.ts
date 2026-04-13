const API_KEY = "0ac2fad436msh2d57d5a8a178aeep1faa3ajsn102f7b6e6320";

export const fetchExerciseByMuscle = async (bodyPart: string) => {
  try {
    const res = await fetch(
      `https://edb-with-videos-and-images-by-ascendapi.p.rapidapi.com/api/v1/exercises?bodyParts=${bodyPart}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host":
            "edb-with-videos-and-images-by-ascendapi.p.rapidapi.com",
          "x-rapidapi-key": API_KEY,
        },
      }
    );

    const json = await res.json();

    return json?.data ?? [];
  } catch (err) {
    console.error("API error:", err);
    return [];
  }
};