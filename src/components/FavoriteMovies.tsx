import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import favoriteMovieStore from "../stores/FavoriteMovieStore";
import { Grid, Card, CardContent, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const FavoriteMovies: React.FC = observer(() => {
  const [isEmptyFavoriteMovies, setIsEmptyFavoriteMovies] = useState(
    isEmptyData()
  );

  useEffect(() => {
    setIsEmptyFavoriteMovies(isEmptyData());
  }, []);

  function isEmptyData() {
    return Boolean(
      favoriteMovieStore.getFavoriteMovies &&
        favoriteMovieStore.getFavoriteMovies.length === 0
    );
  }

  function removeFavoriteMovie(movie: any) {
    favoriteMovieStore.removeFavoriteMovie(movie);
    setIsEmptyFavoriteMovies(isEmptyData());
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Favorite Movies
      </Typography>
      <Grid container spacing={2}>
        {isEmptyFavoriteMovies ? (
          <p style={{ margin: "20px 0 0 16px" }}>
            <span className="empty-text"> No favorite movies available.</span>
            <Link to="/" className="link-go-back">
              Go back to Home
            </Link>
          </p>
        ) : (
          favoriteMovieStore.getFavoriteMovies.map((movie: any) => (
            <Grid item xs={4} key={movie.imdbID}>
              <Card>
                <CardContent>
                  <div className="movie-card" key={movie.imdbID}>
                    <Link
                      to={`/movie/${movie.imdbID}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="movie-poster"
                      />
                      <Typography variant="h6" className="movie-title">
                        {movie.Title}
                      </Typography>
                      <Typography variant="body2" className="movie-year">
                        Year: {movie.Year}
                      </Typography>
                    </Link>
                    <Button
                      variant="contained"
                      onClick={() => removeFavoriteMovie(movie)}
                    >
                      Remove from Favorites
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
});

export default FavoriteMovies;
