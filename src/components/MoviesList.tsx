import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import movieStore from "../stores/MovieStore";
import favoriteMovieStore from "../stores/FavoriteMovieStore";
import { getMovies } from "../services/api";
import {
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Pagination,
} from "@mui/material";
import useDebounce from "../hooks/useDebounce";

const MoviesList: React.FC = observer(() => {
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

  const handleFavoriteMovie = (movie: any) => {
    const isFindFovoriteMovieById = favoriteMovieStore.isFindFovoriteMovieById(
      movie.imdbID
    );

    if (!isFindFovoriteMovieById) {
      favoriteMovieStore.addFavoriteMovie(movie);
    } else {
      favoriteMovieStore.removeFavoriteMovie(movie);
    }
  };

  return (
    <div>
      <TextField
        label="Search Movies"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
      />
      {loading && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <CircularProgress />
        </div>
      )}
      <Grid container spacing={2} marginTop={2}>
        {movieStore.movies ? (
          movieStore.movies.map((movie: any) => (
            <Grid item xs={4} key={movie.imdbID}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{movie.Title}</Typography>
                  <Typography variant="body2">Year: {movie.Year}</Typography>
                  <Button
                    variant={
                      !favoriteMovieStore.isFindFovoriteMovieById(movie.imdbID)
                        ? "outlined"
                        : "contained"
                    }
                    onClick={() => handleFavoriteMovie(movie)}
                  >
                    {!favoriteMovieStore.isFindFovoriteMovieById(movie.imdbID)
                      ? "Add"
                      : "Remove"}{" "}
                    to Favorites
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <p>No movies available</p>
        )}
      </Grid>

      {movieStore.movies && movieStore.movies.length > 0 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
          style={{ marginTop: 20 }}
        />
      )}
    </div>
  );
});

export default MoviesList;
