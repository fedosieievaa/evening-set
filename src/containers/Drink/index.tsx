import { useEffect, useState } from "react";

import { DRINK, POSTER_URL, SIGNED_IN } from "const";
import { Layout } from "components/Layout";

import style from "./style.module.scss";

export const Drink = () => {
  const [drink, setDrink] = useState<any>(null);
  const activeUser = localStorage.getItem(SIGNED_IN) || "";

  useEffect(() => {
    const data = localStorage.getItem(DRINK);
    const drink = data ? JSON.parse(data)[activeUser] || {} : {};
    !isObjectEmpty(drink) && setDrink(drink);
  }, []);

  const isObjectEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
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
      {drink ? (
        <div className={style.container}>
          <div className={style.drinkContainer}>
            <img src={drink?.strDrinkThumb} alt="Drink" width="400" />
            <div className={style.drinkInfo}>
              <h5 className={style.drinkTitle}>DRINK: {drink?.strDrink}</h5>

              <div>Glass: {drink?.strGlass}</div>
              <div>Category: {drink?.strCategory}</div>
              <div>
                Alcoholic:{" "}
                {drink?.strAlcoholic === "Alcoholic"
                  ? "yes"
                  : drink?.strAlcoholic}
              </div>
              <div>
                Ingredients: {drink?.strIngredient1} {drink?.strIngredient2}{" "}
                {drink?.strIngredient3} {drink?.strIngredient4}{" "}
                {drink?.strIngredient5} {drink?.strIngredient6}{" "}
                {drink?.strIngredient7} {drink?.strIngredient8}{" "}
                {drink?.strIngredient9} {drink?.strIngredient10}{" "}
                {drink?.strIngredient11} {drink?.strIngredient12}{" "}
                {drink?.strIngredient13} {drink?.strIngredient14}{" "}
                {drink?.strIngredient15}
              </div>

              <div>Instructions: {drink?.strInstructions}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.empty}>You don't have a drink</div>
      )}
    </Layout>
  );
};
