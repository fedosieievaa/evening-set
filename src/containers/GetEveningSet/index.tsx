import { useEffect, useState } from "react";

import {
  API_KEY,
  DRINK_URL,
  MAX_PAGES,
  WATCHED_LIST,
  DRINK,
  SIGNED_IN,
} from "const";
import { Notification } from "components/Notification";
import { Button } from "components/Button";
import { Layout } from "components/Layout";
import { Set } from "components/Set";
import { Filter } from "components/Filter";

import style from "./style.module.scss";

export const GetEveningSet = () => {
  const [movie, setMovie] = useState<any>(null);
  const [genres, setGenres] = useState<any>([]);
  const [genre, setGenre] = useState<string>();
  const [selectedYear, setSelectedYear] = useState("");
  const [drink, setDrink] = useState(null);
  const [generateDrink, setGenerateDrink] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrinkLoading, setIsDrinkLoading] = useState(false);
  const [selectedRating, setSelectedRating] = useState("");

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

  const getEveningSet = async () => {
    setIsLoading(true);
    const noFilters: any = !genre && !selectedYear && !selectedRating;
    const max = noFilters ? MAX_PAGES : 3;
    const randomPage = Math.floor(Math.random() * max) + 1;

    let range: any = null;
    if (selectedRating) {
      range = selectedRating.split("-");
    }
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}${
      genre ? "&with_genres=" + genre : ""
    }${selectedYear ? "&primary_release_year=" + selectedYear : ""}${
      range
        ? "&vote_average.gte=" + range[0] + "&vote_average.lte=" + range[1]
        : ""
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
  };

  const fetchGenres = async () => {
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
  };

  const getRandomDrink = async () => {
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
  };

  return (
    <Layout>
      <div className={style.overflow}>
        <Filter
          setGenre={setGenre}
          genres={genres}
          selectedYear={selectedYear}
          selectedRating={selectedRating}
          setGenerateDrink={setGenerateDrink}
          setSelectedYear={setSelectedYear}
          setSelectedRating={setSelectedRating}
        />
        {!movie && (
          <>
            <div className={style.getMovieButton}>
              <Button
                text="Get Evening Set"
                status={isLoading ? "loading" : ""}
                onClick={getEveningSet}
              />
            </div>
            <div className={style.description}>
              In case you don't know what to watch press the "GET EVENING SET"
              button. Filter it by genre & year. If you want to have a drink
              too, check the "GENERATE A DRINK" checkbox.{" "}
              <span>Have a nice evening!</span>
            </div>
          </>
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
