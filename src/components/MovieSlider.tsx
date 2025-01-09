import favoriteMovieStore from "../stores/FavoriteMovieStore";
import NextArrow from "../UI/NextArrow";
import PrevArrow from "../UI/PrevArrow";

import { Typography } from "@mui/material";
import Slider from "react-slick";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import FavoriteMovieButton from "../UI/FavoriteMovieButton";

interface PropsMovieSlider {
  movies: any[];
}

const MovieSlider: React.FC<PropsMovieSlider> = observer(
  ({ movies }: PropsMovieSlider) => {
    // Настройки слайдера
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };

    return (
      <Slider {...sliderSettings} className="movies-slider">
        {movies.map((movie: any) => (
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
            <FavoriteMovieButton movie={movie} />
          </div>
        ))}
      </Slider>
    );
  }
);

export default MovieSlider;
