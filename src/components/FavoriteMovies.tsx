import React from "react";
import { observer } from "mobx-react";
import favoriteMovieStore from "../stores/FavoriteMovieStore";
import { Grid, Card, CardContent, Button, Typography } from "@mui/material";
import { setLocalStorage } from "../utils/localStorage";

const FavoriteMovies: React.FC = observer(() => {
  React.useEffect(() => {
    setLocalStorage("favoriteMovies", favoriteMovieStore.favoriteMovies);
  }, [favoriteMovieStore.favoriteMovies]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Favorite Movies
      </Typography>
      <Grid container spacing={2}>
        {favoriteMovieStore.favoriteMovies.map((movie: any) => (
          <Grid item xs={4} key={movie.imdbID}>
            <Card>
              <CardContent>
                <Typography variant="h6">{movie.Title}</Typography>
                <Button
                  variant="outlined"
                  onClick={() =>
                    favoriteMovieStore.removeFavoriteMovie(movie.imdbID)
                  }
                >
                  Remove from Favorites
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
});

export default FavoriteMovies;
