import React from "react";
import favoriteMovieStore from "../stores/FavoriteMovieStore";
import { Button } from "@mui/material";

interface FavoriteMovieProps {
  movie: {
    imdbID: string;
  };
}

const FavoriteMovieButton: React.FC<FavoriteMovieProps> = ({ movie }) => {
  const handleFavoriteMovie = (movie: any) => {
    const isFindFavoriteMovieById = favoriteMovieStore.isFindFavoriteMovieById(
      movie.imdbID
    );

    if (!isFindFavoriteMovieById) {
      favoriteMovieStore.addFavoriteMovie(movie);
    } else {
      favoriteMovieStore.removeFavoriteMovie(movie);
    }
  };

  return (
    <Button
      variant={
        !favoriteMovieStore.isFindFavoriteMovieById(movie.imdbID)
          ? "outlined"
          : "contained"
      }
      onClick={() => handleFavoriteMovie(movie)}
      className="favorite-button"
    >
      {!favoriteMovieStore.isFindFavoriteMovieById(movie.imdbID)
        ? "Add"
        : "Remove"}{" "}
      to Favorites
    </Button>
  );
};

export default FavoriteMovieButton;
