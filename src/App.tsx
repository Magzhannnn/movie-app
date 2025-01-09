import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import FavoriteMovies from "./components/FavoriteMovies";
import { CssBaseline, Container, Typography } from "@mui/material";
import MoviesList from "./components/MoviesList";
import "./styles/global.css";

const App: React.FC = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg" style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Movie App
        </Typography>
        <Router>
          <Routes>
            <Route path="/" element={<MoviesList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<FavoriteMovies />} />
          </Routes>
        </Router>
      </Container>
    </div>
  );
};

export default App;
