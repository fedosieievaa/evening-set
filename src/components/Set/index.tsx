import { useEffect, useState } from "react";

import { POSTER_URL, SIGNED_IN, WATCHED_LIST } from "const";
import { Button } from "components/Button";
import { Loader } from "components/Loader";

import style from "./style.module.scss";

export const Set = ({
  movie,
  prevMovie,
  genres,
  getEveningSet,
  setMovie,
  setShowNotification,
  isLoading,
  drink,
  getRandomDrink,
  isDrinkLoading,
  isAnimated,
}: any) => {
  const activeUser = localStorage.getItem(SIGNED_IN) || "";
  const [watchMovieLoading, setWatchMovieLoading] = useState(false);
  const [currentMovieGenres, setCurrentMovieGenres] = useState<any>([]);
  const [prevMovieGenres, setPrevMovieGenres] = useState<any>([]);

  useEffect(() => {
    const data = genres?.filter((genre: any, i: number) =>
      movie?.genre_ids?.includes(genre.id)
    );
    const prevData = genres?.filter((genre: any, i: number) =>
      prevMovie?.genre_ids?.includes(genre.id)
    );
    setCurrentMovieGenres(data);
    setPrevMovieGenres(prevData);
  }, [movie, prevMovie]);

  const watchMovie = () => {
    setWatchMovieLoading(true);
    const data: any = localStorage.getItem(WATCHED_LIST);
    const previousList = data ? JSON.parse(data) : {};
    const template = {
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      isGood: null,
    };

    if (activeUser) {
      movie?.backdrop_path &&
        localStorage.setItem(POSTER_URL, movie?.backdrop_path);
      previousList[activeUser] = [
        template,
        ...(previousList[activeUser] || []),
      ];

      localStorage.setItem(WATCHED_LIST, JSON.stringify(previousList));
    }

    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      `${movie?.title} ${movie?.release_date.split("-")[0]}`
    )}`;
    window.open(searchUrl, "_blank");

    setTimeout(() => {
      setWatchMovieLoading(false);
      activeUser && setShowNotification(true);
      setMovie(null);
    }, 1000);
  };
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${POSTER_URL}${
            movie?.backdrop_path ||
            localStorage.getItem(POSTER_URL) ||
            "/wRxLAw4l17LqiFcPLkobriPTZAw.jpg"
          })`,
        }}
        className={style.backdrop}
      />
      {prevMovie && movie && (
        <div className={style.content}>
          <div
            className={`${style.animationContainer} ${
              isAnimated ? style.flip : ""
            }`}
          >
            <div className={style.container}>
              <img
                src={`${POSTER_URL}${prevMovie.poster_path}`}
                alt="Poster"
                className={style.moviePoster}
              />
              <div>
                <div className={style.information}>
                  <h2 className={style.title}>
                    {prevMovie?.title} {"("}
                    {prevMovie?.release_date.split("-")[0]}
                    {")"}
                  </h2>
                  <div className={style.additional}>
                    <div className={style.genres}>
                      {prevMovieGenres.map((genre: any, i: number) => {
                        return (
                          <>
                            <span key={`m-${genre.id}`}>{genre.name}</span>
                            {genre.id !==
                              prevMovieGenres[prevMovieGenres.length - 1].id &&
                              ", "}{" "}
                          </>
                        );
                      })}
                    </div>
                    <div className={style.vote_average}>
                      {prevMovie?.vote_average}
                      <span>
                        {" "}
                        {"("}
                        {prevMovie?.vote_count}
                        {")"}
                      </span>
                    </div>
                  </div>
                  <p className={style.overview}>{prevMovie?.overview}</p>
                  <div className={style.buttons}>
                    <Button
                      text="Not Today"
                      status={isLoading ? "loading" : ""}
                      onClick={getEveningSet}
                    />
                    <Button
                      text="Watch"
                      status={watchMovieLoading ? "loading" : ""}
                      onClick={watchMovie}
                    />
                  </div>
                </div>
                {drink && (
                  <div className={style.drinkContainer}>
                    <img src={drink?.strDrinkThumb} alt="Drink" width="200" />
                    <div className={style.drinkInfo}>
                      <div className={style.top}>
                        <h5 className={style.drinkTitle}>
                          DRINK: {drink?.strDrink}
                        </h5>
                        <button
                          className={style.other}
                          onClick={getRandomDrink}
                        >
                          {!isDrinkLoading ? "other" : <Loader />}
                        </button>
                      </div>
                      <div>Glass: {drink?.strGlass}</div>
                      <div>Category: {drink?.strCategory}</div>
                      <div>
                        Alcoholic:{" "}
                        {drink?.strAlcoholic === "Alcoholic"
                          ? "yes"
                          : drink?.strAlcoholic}
                      </div>
                      <div>
                        Ingredients: {drink?.strIngredient1}{" "}
                        {drink?.strIngredient2} {drink?.strIngredient3}{" "}
                        {drink?.strIngredient4} {drink?.strIngredient5}{" "}
                        {drink?.strIngredient6} {drink?.strIngredient7}{" "}
                        {drink?.strIngredient8} {drink?.strIngredient9}{" "}
                        {drink?.strIngredient10} {drink?.strIngredient11}{" "}
                        {drink?.strIngredient12} {drink?.strIngredient13}{" "}
                        {drink?.strIngredient14} {drink?.strIngredient15}
                      </div>

                      <div>Instructions: {drink?.strInstructions}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {movie && (
              <div
                className={`${style.container} ${style.next}  ${
                  isAnimated ? style.flipCard : ""
                }`}
              >
                {" "}
                <img
                  src={`${POSTER_URL}${movie.poster_path}`}
                  alt="Poster"
                  className={style.moviePoster}
                />
                <div>
                  <div className={style.information}>
                    <h2 className={style.title}>
                      {movie?.title} {"("}
                      {movie?.release_date.split("-")[0]}
                      {")"}
                    </h2>
                    <div className={style.additional}>
                      <div className={style.genres}>
                        {currentMovieGenres.map((genre: any, i: number) => {
                          return (
                            <>
                              <span key={`m-${genre.id}`}>{genre.name}</span>
                              {genre.id !==
                                currentMovieGenres[
                                  currentMovieGenres.length - 1
                                ].id && ", "}{" "}
                            </>
                          );
                        })}
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
                    <div className={style.buttons}>
                      <Button
                        text="Not Today"
                        status={isLoading ? "loading" : ""}
                        onClick={getEveningSet}
                      />
                      <Button
                        text="Watch"
                        status={watchMovieLoading ? "loading" : ""}
                        onClick={watchMovie}
                      />
                    </div>
                  </div>
                  {drink && (
                    <div className={style.drinkContainer}>
                      <img src={drink?.strDrinkThumb} alt="Drink" width="200" />
                      <div className={style.drinkInfo}>
                        <div className={style.top}>
                          <h5 className={style.drinkTitle}>
                            DRINK: {drink?.strDrink}
                          </h5>
                          <button
                            className={style.other}
                            onClick={getRandomDrink}
                          >
                            {!isDrinkLoading ? "other" : <Loader />}
                          </button>
                        </div>
                        <div>Glass: {drink?.strGlass}</div>
                        <div>Category: {drink?.strCategory}</div>
                        <div>
                          Alcoholic:{" "}
                          {drink?.strAlcoholic === "Alcoholic"
                            ? "yes"
                            : drink?.strAlcoholic}
                        </div>
                        <div>
                          Ingredients: {drink?.strIngredient1}{" "}
                          {drink?.strIngredient2} {drink?.strIngredient3}{" "}
                          {drink?.strIngredient4} {drink?.strIngredient5}{" "}
                          {drink?.strIngredient6} {drink?.strIngredient7}{" "}
                          {drink?.strIngredient8} {drink?.strIngredient9}{" "}
                          {drink?.strIngredient10} {drink?.strIngredient11}{" "}
                          {drink?.strIngredient12} {drink?.strIngredient13}{" "}
                          {drink?.strIngredient14} {drink?.strIngredient15}
                        </div>

                        <div>Instructions: {drink?.strInstructions}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
