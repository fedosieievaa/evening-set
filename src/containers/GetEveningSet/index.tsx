import { useEffect, useState } from "react";

import { Notification } from "components/Notification";
import { Button } from "components/Button";
import { Layout } from "components/Layout";
import { Set } from "components/Set";

import {
  API_KEY,
  DRINK_URL,
  MAX_PAGES,
  WATCHED_LIST,
  DRINK,
  SIGNED_IN,
} from "const";

import style from "./style.module.scss";

export const GetEveningSet = () => {
  const [movie, setMovie] = useState<any>(null);
  const [genres, setGenres] = useState<any>([]);
  const [genre, setGenre] = useState<string>();
  const [drink, setDrink] = useState(null);
  const [generateDrink, setGenerateDrink] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrinkLoading, setIsDrinkLoading] = useState(false);

  const activeUser = localStorage.getItem(SIGNED_IN) || "";

  useEffect(() => {
    fetchGenres()
      .then((genres) => {
        setGenres(genres);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  async function getEveningSet() {
    setIsLoading(true);
    const randomPage = Math.floor(Math.random() * MAX_PAGES) + 1;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}${
      genre ? "&with_genres=" + genre : ""
    }&page=${randomPage}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const movies = data.results.filter((m: any) => !m.adult);

      const randomIndex = Math.floor(Math.random() * movies.length);
      const randomMovie = movies[randomIndex];
      const storage: any = localStorage.getItem(WATCHED_LIST);
      const previousList = storage ? JSON.parse(storage) : {};

      const ids = previousList[activeUser]
        ? previousList[activeUser]?.map((m: any) => m.id)
        : [];

      if (ids.includes(randomMovie.id && activeUser)) {
        getEveningSet();
      } else {
        setMovie(randomMovie);
        if (!drink && generateDrink) {
          await getRandomDrink();
        }
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
      throw new Error("Failed to fetch a random movie.");
    }
  }

  async function fetchGenres() {
    const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const genres = data.genres;
      return genres;
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Failed to fetch genres.");
    }
  }

  async function getRandomDrink() {
    setIsDrinkLoading(true);
    const response = await fetch(DRINK_URL);
    const data = await response.json();
    setDrink(data.drinks[0]);
    setIsDrinkLoading(false);
    if (activeUser) {
      const db = localStorage.getItem(DRINK);
      const drinks = db ? JSON.parse(db) || {} : {};
      drinks[activeUser] = data.drinks[0];
      localStorage.setItem(DRINK, JSON.stringify(drinks));
    }
  }

  return (
    <Layout>
      <div className={style.overflow}>
        <div className={style.filter}>
          <div className={style.dropdown}>
            <label htmlFor="genre">Select Genre:</label>
            <select
              id="genre"
              onChange={(e) => {
                setGenre(e.target.value);
              }}
            >
              {genres.map((genre: any) => (
                <option key={genre?.id} value={genre?.id}>
                  {genre?.name}
                </option>
              ))}
            </select>
          </div>
          <div className={style.checkbox}>
            <label htmlFor="drink">Generate a drink:</label>
            <input
              type="checkbox"
              onChange={(e) => {
                setGenerateDrink(e.target.checked);
              }}
            />
          </div>
        </div>
        {!movie && (
          <div className={style.getMovieButton}>
            <Button
              text="Get Evening Set"
              status={isLoading ? "loading" : ""}
              onClick={getEveningSet}
            />
          </div>
        )}
        <Set
          movie={movie}
          genres={genres}
          getEveningSet={getEveningSet}
          setMovie={setMovie}
          setShowNotification={setShowNotification}
          isLoading={isLoading}
          drink={drink}
          getRandomDrink={getRandomDrink}
          isDrinkLoading={isDrinkLoading}
        />
      </div>
      {showNotification && (
        <Notification
          message="Movie is added"
          setNotification={setShowNotification}
        />
      )}
    </Layout>
  );
};
