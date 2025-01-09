import React from "react";
import { Typography } from "@mui/material";
import FavoriteMovieButton from "../UI/FavoriteMovieButton";

interface MovieInfoProps {
  movie: {
    Title: string;
    Plot: string;
    Genre: string;
    Director: string;
    imdbRating: string;
    Poster: string;
  };
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
  return (
    <>
      <Typography variant="h5">{movie.Title}</Typography>
      <Typography variant="body2">Description: {movie.Plot}</Typography>
      <Typography variant="body2">Genre: {movie.Genre}</Typography>
      <Typography variant="body2">Director: {movie.Director}</Typography>
      <Typography variant="body2">Rating: {movie.imdbRating}</Typography>
      <FavoriteMovieButton movie={movie} />
    </>
  );
};

export default MovieInfo;
