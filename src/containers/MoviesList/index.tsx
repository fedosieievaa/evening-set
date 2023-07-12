import { useEffect, useState } from "react";
import { Layout } from "components/Layout";
import { API_KEY, POSTER_URL, SIGNED_IN, WATCHED_LIST } from "const";
import style from "./style.module.scss";
import { Modal } from "components/Modal";

// const justWatchUrl = "https://apis.justwatch.com/content/titles/movie";

export const MoviesList = () => {
  const [movies, setMovies] = useState<any>(null);
  const [movie, setMovie] = useState<any>(null);
  const activeUser = localStorage.getItem(SIGNED_IN) || "";

  // const [streamingLinks, setStreamingLinks] = useState<any>([]);

  useEffect(() => {
    getMovies();
  }, []);

  async function getMovies() {
    const data: any = localStorage.getItem(WATCHED_LIST);
    const list = data ? JSON.parse(data) : [];
    setMovies(list[activeUser]);
  }

  const deleteMovie = (id: any) => {
    const data: any = localStorage.getItem(WATCHED_LIST);
    const list = data ? JSON.parse(data) : {};
    list[activeUser] = list[activeUser].filter((movie: any) => movie.id !== id);
    localStorage.setItem(WATCHED_LIST, JSON.stringify(list));
    getMovies();
  };

  const evaluateMovie = (id: any, bool: any) => {
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

  // async function fetchMovieStream(movieId: any) {
  //   try {
  //     const justWatchResponse = await fetch(
  //       `${justWatchUrl}/${movieId}/locale/en_US`
  //     );
  //     const justWatchData = await justWatchResponse.json();
  //     setStreamingLinks(justWatchData.offers);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function fetchMovieDetails(movieId: any) {
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;

    try {
      const response = await fetch(movieDetailsUrl);
      const movieData = await response.json();
      setMovie(movieData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout>
      <div
        style={{
          backgroundImage: `url(${POSTER_URL}${
            localStorage.getItem(POSTER_URL) ||
            "/vYbSNn5u1YzoBE0akLRCTZN5k7m.jpg"
          })`,
        }}
        className={style.backdrop}
      />
      {/* {streamingLinks?.length && (
        <div>
          {streamingLinks.map((link: any) => {
            console.log(link);
            return (
              <div key={link.provider_id}>
                <a href={link.urls.standard_web}>{link.provider_name}</a>
              </div>
            );
          })}
        </div>
      )} */}
      {movies?.length ? (
        <div className={style.movies}>
          {movies.map((movie: any) => (
            <div key={movie.id} className={style.movie}>
              <h4
                onClick={() => {
                  // fetchMovieStream(movie.id);
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
                  {movie.isGood ? (
                    <button className={style.good} />
                  ) : movie.isGood === false ? (
                    <button className={style.bad} />
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
          close={function (): void {
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
              <p className={style.overview}>{movie?.overview}</p>
            </div>
          </div>
        </Modal>
      )}
    </Layout>
  );
};
