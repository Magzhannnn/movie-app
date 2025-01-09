import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { Card, CardContent, Button } from "@mui/material";
import VideoPlayer from "./VideoPlayer";
import MovieInfo from "./MovieInfo";
import detailedMovieStore from "../stores/DetailedMovieStore";
import { getMovieDetails } from "../services/api";

const MovieDetails: React.FC = observer(() => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    // Загрузка деталей фильма из OMDB
    getMovieDetails(id).then((movie: any) => {
      console.log(movie)
      detailedMovieStore.setDetailedMovie(movie);
    });
  }, [id]);

  return (
    <div>
      <div>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          style={{ marginBottom: "20px" }}
        >
          Назад
        </Button>
      </div>
      {detailedMovieStore.detailedMovie && (
        <Card>
          <CardContent>
            <MovieInfo movie={detailedMovieStore.detailedMovie} />
            <VideoPlayer />
          </CardContent>
        </Card>
      )}
    </div>
  );
});

export default MovieDetails;
