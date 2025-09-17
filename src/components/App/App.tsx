import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { type Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSubmit = async (query: string) => {
    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

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
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <Toaster position="top-right" reverseOrder={false} />
      <main>
        {isError && <ErrorMessage />}
        {isLoading && <Loader />}
        {!isLoading && !isError && movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={handleSelect} />
        )}
      </main>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}