import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
import detailedMovieStore from "../stores/DetailedMovieStore";

const YOUTUBE_API_KEY = "AIzaSyDngrctixzI2x6CmOJstzSsmJYTpaLtKQA";

const VideoPlayer: React.FC = () => {
  const youtubeRef = useRef<HTMLIFrameElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [youtubeVideoId, setYoutubeVideoId] = useState<string>("");
  const [isLoadingTrailerVideo, setIsLoadingTrailerVideo] = useState(true);

  useEffect(() => {
    const movie = detailedMovieStore.detailedMovie;
    if (!movie) return;

    const savedTime = getLocalStorage(`movie-${movie.imdbID}-time`);
    if (savedTime) {
      setCurrentTime(savedTime);
    }

    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          movie.Title + " trailer"
        )}&key=${YOUTUBE_API_KEY}&type=video&maxResults=1`
      )
      .then((response) => {
        if (response.data.items.length > 0) {
          setYoutubeVideoId(response.data.items[0].id.videoId);
        }
      })
      .catch((error) => console.error("Error fetching YouTube video:", error))
      .finally(() => setIsLoadingTrailerVideo(false));
  }, []);

  useEffect(() => {
    const movie = detailedMovieStore.detailedMovie;
    if (movie) {
      setLocalStorage(`movie-${movie.imdbID}-time`, currentTime);
    }
  }, [currentTime]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || event.data.event !== "infoDelivery") return;
      if (event.data.info && event.data.info.currentTime) {
        setCurrentTime(event.data.info.currentTime);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const sendCommandToPlayer = (command: string) => {
    if (youtubeRef.current) {
      youtubeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: command, args: [] }),
        "*"
      );
    }
  };

  return isLoadingTrailerVideo ? (
    <p>Loading...</p>
  ) : (
    <div className="video-player">
      {youtubeVideoId ? (
        <iframe
          ref={youtubeRef}
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${youtubeVideoId}?enablejsapi=1&start=${currentTime}`}
          title="Movie Trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <img
          src={detailedMovieStore.detailedMovie.Poster}
          alt={detailedMovieStore.detailedMovie.Title}
          style={{ maxWidth: "100%" }}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
