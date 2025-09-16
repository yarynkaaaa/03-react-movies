import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";

async function fetchMovies(query: string) {
  const apiKey = '32d71409388ca40f8f0650d9623a983b'; 
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data = await response.json();
  return data.results;
}

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSubmit = async (query: string) => {
    if (!query) return; 
    
    setIsLoading(true);
    setIsError(false);
    setMovies([]);
    
    try {
      const newMovies = await fetchMovies(query);
      setMovies(newMovies);

      if (newMovies.length === 0) {
        toast.error("No movies found for your request.");
      }
    } catch (error) {
      setIsError(true);
      toast.error("There was an error, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <Toaster />
      <main>
        {isError && <ErrorMessage />}
        {isLoading && <Loader />}
        {!isLoading && !isError && <MovieGrid movies={movies} onSelect={handleSelect} />}
      </main>
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
    </>
  );
}