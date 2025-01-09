import { makeAutoObservable } from "mobx";

class MovieStore {
  movies: any[] = [];
  searchQuery: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setMovies(movies: any[]) {
    this.movies = movies;
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }
}

export default new MovieStore();
