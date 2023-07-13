import { useEffect, useState } from "react";

import { API_KEY, POSTER_URL, SIGNED_IN, WATCHED_LIST } from "const";
import { Layout } from "components/Layout";
import { Modal } from "components/Modal";

import style from "./style.module.scss";

export const MoviesList = () => {
  const [movies, setMovies] = useState<any>(null);
  const [movie, setMovie] = useState<any>(null);

  const activeUser = localStorage.getItem(SIGNED_IN) || "";

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const data: any = localStorage.getItem(WATCHED_LIST);
    const list = data ? JSON.parse(data) : [];
    setMovies(list[activeUser]);
  };

  const deleteMovie = (id: any) => {
    const data: any = localStorage.getItem(WATCHED_LIST);
    const list = data ? JSON.parse(data) : {};
    list[activeUser] = list[activeUser].filter((movie: any) => movie.id !== id);
    localStorage.setItem(WATCHED_LIST, JSON.stringify(list));
    getMovies();
  };

  const evaluateMovie = (id: any, bool: boolean | null) => {
    const data: any = localStorage.getItem(WATCHED_LIST);
    const list = data ? JSON.parse(data) : {};
    list[activeUser] = list[activeUser].map((movie: any) => {
      if (movie.id === id) {
        return {
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          isGood: bool,
        };
      } else {
        return movie;
      }
    });
    localStorage.setItem(WATCHED_LIST, JSON.stringify(list));
    getMovies();
  };

  const fetchMovieDetails = async (movieId: any) => {
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;

    try {
      const response = await fetch(movieDetailsUrl);
      const movieData = await response.json();
      setMovie(movieData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div
        style={{
          backgroundImage: `url(${POSTER_URL}${
            localStorage.getItem(POSTER_URL) ||
            "/wRxLAw4l17LqiFcPLkobriPTZAw.jpg"
          })`,
        }}
        className={style.backdrop}
      />
      {movies?.length ? (
        <div className={style.movies}>
          {movies.map((movie: any) => (
            <div key={movie.id} className={style.movie}>
              <h4
                onClick={() => {
                  fetchMovieDetails(movie.id);
                }}
              >
                {movie?.title}{" "}
                <span>
                  {"("}
                  {movie?.release_date.split("-")[0]}
                  {")"}
                </span>
              </h4>
              <div className={style.buttons}>
                <div className={style.evaluate}>
                  {movie.isGood || movie.isGood === false ? (
                    <button
                      className={movie.isGood ? style.good : style.bad}
                      onClick={() => {
                        evaluateMovie(movie.id, null);
                      }}
                    />
                  ) : (
                    <>
                      <button
                        className={style.bad}
                        onClick={() => {
                          evaluateMovie(movie.id, false);
                        }}
                      />
                      <button
                        className={style.good}
                        onClick={() => {
                          evaluateMovie(movie.id, true);
                        }}
                      />
                    </>
                  )}
                </div>
                <button
                  className={style.delete}
                  onClick={() => {
                    deleteMovie(movie.id);
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={style.empty}>You have not added a movie yet</div>
      )}

      {movie && (
        <Modal
          close={() => {
            setMovie(null);
          }}
        >
          <div className={style.container}>
            <img
              src={`${POSTER_URL}${movie.poster_path}`}
              alt="Poster"
              className={style.moviePoster}
            />
            <div className={style.information}>
              <h2 className={style.title}>
                {movie?.title} {"("}
                {movie?.release_date.split("-")[0]}
                {")"}
              </h2>
              <div className={style.additional}>
                <div className={style.genres}>
                  {movie.genres.map((genre: any, i: number) => (
                    <>
                      <span key={genre.id}>{genre.name} </span>
                      {genre.id !==
                        movie.genres[movie?.genres?.length - 1].id && ", "}
                    </>
                  ))}
                </div>
                <div className={style.vote_average}>
                  {movie?.vote_average}
                  <span>
                    {" "}
                    {"("}
                    {movie?.vote_count}
                    {")"}
                  </span>
                </div>
              </div>
              <p className={style.overview}>
                {movie?.overview?.length > 300
                  ? `${movie?.overview.slice(0, 300)}...`
                  : movie?.overview}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </Layout>
  );
};
