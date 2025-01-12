import { makeObservable, observable, action } from "mobx";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

class FavoriteMovieStore {
  favoriteMovies = new Map();

  constructor() {
    makeObservable(this, {
      favoriteMovies: observable,
      loadFavoriteMovies: action,
    });

    this.loadFavoriteMovies();
  }

  get getFavoriteMovies() {
    return Array.from(this.favoriteMovies.values());
  }

  isFindFavoriteMovieById(movieImDbID: string) {
    return this.favoriteMovies.has(movieImDbID);
  }

  loadFavoriteMovies() {
    const storedFavorites = JSON.parse(
      getLocalStorage("favoriteMovies") ?? "false"
    );
    if (storedFavorites) {
      this.favoriteMovies = new Map(storedFavorites);
    }
  }

  addFavoriteMovie(movie: any) {
    this.favoriteMovies.set(movie.imdbID, movie);
    setLocalStorage("favoriteMovies", JSON.stringify(this.favoriteMovies));
  }

  removeFavoriteMovie(movie: any) {
    this.favoriteMovies.delete(movie.imdbID);
    setLocalStorage("favoriteMovies", JSON.stringify(this.favoriteMovies));
  }
}

export default new FavoriteMovieStore();
