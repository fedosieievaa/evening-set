import { useEffect, useState } from "react";

import style from "./style.module.scss";

export const Filter = ({
  genres,
  selectedYear,
  selectedRating,
  setGenre,
  setGenerateDrink,
  setSelectedYear,
  setSelectedRating,
}: any) => {
  const [releaseYears, setReleaseYears] = useState<any>([]);

  useEffect(() => {
    generateReleaseYears();
  }, []);

  const generateReleaseYears = () => {
    const currentYear = new Date().getFullYear();
    const numYears = 30;

    const years = Array.from(
      { length: numYears },
      (_, index) => currentYear - index
    );

    setReleaseYears(years);
  };

  const handleYearChange = (event: any) => {
    setSelectedYear(event.target.value);
  };

  const handleRatingChange = (event: any) => {
    setSelectedRating(event.target.value);
  };

  const handleGenreChange = (event: any) => {
    setGenre(event.target.value);
  };

  const handleDrinkCheckbox = (event: any) => {
    setGenerateDrink(event.target.checked);
  };

  return (
    <div className={style.filter}>
      <div className={style.dropdown}>
        <label htmlFor="genre">Select Genre:</label>
        <select id="genre" onChange={handleGenreChange}>
          <option value="">All</option>
          {genres.map((genre: any) => (
            <option key={genre?.id} value={genre?.id}>
              {genre?.name}
            </option>
          ))}
        </select>
      </div>
      <div className={style.dropdown}>
        <label htmlFor="year">Release Year:</label>
        <select id="year" value={selectedYear} onChange={handleYearChange}>
          <option value="">All</option>
          {releaseYears.map((year: any) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className={style.dropdown}>
        <label htmlFor="rating">Rating:</label>
        <select
          id="rating"
          value={selectedRating}
          onChange={handleRatingChange}
        >
          <option value="">All</option>
          <option value="0-3">0-3</option>
          <option value="3-5">3-5</option>
          <option value="5-7">5-7</option>
          <option value="7-10">7-10</option>
        </select>
      </div>
      <div className={style.checkbox}>
        <label htmlFor="drink">Generate a drink:</label>
        <input type="checkbox" onChange={handleDrinkCheckbox} />
      </div>
    </div>
  );
};
