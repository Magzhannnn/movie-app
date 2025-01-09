import { makeAutoObservable } from "mobx";

class DetailedMovieStore {
  detailedMovie: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  setDetailedMovie(movie: any) {
    this.detailedMovie = movie;
  }
}

export default new DetailedMovieStore();
