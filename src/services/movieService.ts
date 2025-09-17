import axios from "axios";
import { type Movie } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

interface SearchResponse {
  results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  if (!API_KEY) {
    throw new Error("TMDB token is not defined in environment variables.");
  }

  const response = await axios.get<SearchResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: {
        query: query,
      },
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  return response.data.results;
}
