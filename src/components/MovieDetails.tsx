import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import detailedMovieStore from "../stores/DetailedMovieStore";
import { getMovieDetails } from "../services/api";
import { Typography, Card, CardContent } from "@mui/material";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

interface MovieDetailsProps {
  match: any;
}

const MovieDetails: React.FC<MovieDetailsProps> = observer(({ match }) => {
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    const savedTime = getLocalStorage(`movie-${match.params.id}-time`);
    if (savedTime) {
      setCurrentTime(savedTime);
    }
    getMovieDetails(match.params.id).then((movie: any) => {
      detailedMovieStore.setDetailedMovie(movie);
    });
  }, [match.params.id]);

  const handleTimeUpdate = (event: any) => {
    setCurrentTime(event.target.currentTime);
  };

  useEffect(() => {
    if (detailedMovieStore.detailedMovie) {
      setLocalStorage(`movie-${match.params.id}-time`, currentTime);
    }
  }, [currentTime]);

  return (
    <div>
      {detailedMovieStore.detailedMovie && (
        <Card>
          <CardContent>
            <Typography variant="h5">
              {detailedMovieStore.detailedMovie.Title}
            </Typography>
            <Typography variant="body2">
              Description: {detailedMovieStore.detailedMovie.Plot}
            </Typography>
            <Typography variant="body2">
              Genre: {detailedMovieStore.detailedMovie.Genre}
            </Typography>
            <Typography variant="body2">
              Director: {detailedMovieStore.detailedMovie.Director}
            </Typography>
            <Typography variant="body2">
              Rating: {detailedMovieStore.detailedMovie.imdbRating}
            </Typography>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${detailedMovieStore.detailedMovie.imdbID}`}
              title="Movie Video"
              frameBorder="0"
              allowFullScreen
              onTimeUpdate={handleTimeUpdate}
            ></iframe>
          </CardContent>
        </Card>
      )}
    </div>
  );
});

export default MovieDetails;
