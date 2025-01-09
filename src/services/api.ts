import axios from 'axios';

const API_KEY = "7e59b8de";

const api = axios.create({
  baseURL: `http://www.omdbapi.com/`,
  params: {
    apikey: API_KEY,
  },
});

export const getMovies = async (query: string, page: number = 1) => {
  try {
    const response = await api.get("/", {
      params: { s: query, page },
    });
    return {
      movies: response.data.Search,
      totalResults: response.data.totalResults, // Общее количество результатов
      totalPages: Math.ceil(response.data.totalResults / 10), // Количество страниц (по 10 фильмов на страницу)
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

export const getMovieDetails = async (id: string) => {
  try {
    const response = await api.get("/", {
      params: { i: id },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};
