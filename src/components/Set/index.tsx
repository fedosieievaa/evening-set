import { Button } from "components/Button";
import { POSTER_URL, SIGNED_IN, WATCHED_LIST } from "const";

import style from "./style.module.scss";
import { useState } from "react";
import { Loader } from "components/Loader";

export const Set = ({
  movie,
  genres,
  getEveningSet,
  setMovie,
  setShowNotification,
  isLoading,
  drink,
  getRandomDrink,
  isDrinkLoading,
}: any) => {
  const activeUser = localStorage.getItem(SIGNED_IN) || "";
  const [watchMovieLoading, setWatchMovieLoading] = useState(false);

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

    movie?.backdrop_path &&
      localStorage.setItem(POSTER_URL, movie?.backdrop_path);

    previousList[activeUser] = [template, ...(previousList[activeUser] || [])];

    localStorage.setItem(WATCHED_LIST, JSON.stringify(previousList));
    setTimeout(() => {
      setWatchMovieLoading(false);
      setShowNotification(true);
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
            "/vYbSNn5u1YzoBE0akLRCTZN5k7m.jpg"
          })`,
        }}
        className={style.backdrop}
      />
      {movie && (
        <>
          <div className={style.container}>
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
                    {genres.map((genre: any, i: number) => {
                      if (movie.genre_ids.includes(genre.id)) {
                        return (
                          <>
                            <span key={genre.id}>{genre.name} </span>
                            {/* {genre.id !==
                              movie.genre_ids[movie.genre_ids.length - 1] &&
                              ", "}{" "} */}
                            {/* // TODO:fix */}
                          </>
                        );
                      }
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
                  {activeUser && (
                    <Button
                      text="Watch"
                      status={watchMovieLoading ? "loading" : ""}
                      onClick={watchMovie}
                    />
                  )}
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
                      <button className={style.other} onClick={getRandomDrink}>
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
        </>
      )}
    </>
  );
};
