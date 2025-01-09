import React, { useState, useEffect } from "react";
import movieStore from "../stores/MovieStore";
import { getMovies } from "../services/api";
import { TextField, CircularProgress, Pagination } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useDebounce from "../hooks/useDebounce";
import MovieSlider from "./MovieSlider";

const MoviesList: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 300);
  const [loading, setLoading] = useState<boolean>(false);

  // Пагинация состояние
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      getMovies(debouncedQuery, page) // передаем page в запрос
        .then((movies: any) => {
          movieStore.setMovies(movies.movies);
          setTotalPages(Math.ceil(movies.totalResults / 10)); // пагинация 10 фильмов на странице
        })
        .finally(() => setLoading(false));
    }
  }, [debouncedQuery, page]); // Отслеживаем изменения дебаунса и страницы

  const handleChangePage = (event: any, value: number) => {
    setPage(value); // Меняем страницу
  };

  const setQueryHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setQuery(event.target.value);
  };

  return (
    <div className="movies-list-container">
      <TextField
        label="Search Movies"
        variant="outlined"
        value={query}
        onChange={setQueryHandle}
        fullWidth
      />
      {loading && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <CircularProgress />
        </div>
      )}

      {movieStore.movies && movieStore.movies.length > 0 ? (
        <MovieSlider movies={movieStore.movies} />
      ) : (
        <p style={{ textAlign: "center", marginTop: 20 }}>
          No movies available
        </p>
      )}

      {movieStore.movies && movieStore.movies.length > 0 && (
        <div className="pagination-container">
          <Pagination
            className="pagination"
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
            size="large"
          />
        </div>
      )}
    </div>
  );
};

export default MoviesList;
