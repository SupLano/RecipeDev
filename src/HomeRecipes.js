import { React, useContext } from "react";
import { AppNavContext } from "./App";
import RecipeCard from "./Utils/RecipeCard";
import Loading from "./Utils/Loading";
import Get from "./Utils/Get";

function HomeRecipes() {
  const { isNavActive } = useContext(AppNavContext);
  const keys = [
    "1882448aefc44b3ea30609cdccf40951",
    "b996787c904f49ba9142544aa5832a3e",
    "fa37f0fee335472a906bdc5a0cb4c3a8",
  ];
  let key = keys[Math.floor(Math.random() * 3)];
  const { data, loading } = Get({
    url: `https://api.spoonacular.com/recipes/random?number=24&apiKey=${key}`,
    type: "Homepage",
  });

  return (
    <div
      className={
        isNavActive
          ? " grid h-full w-full pt-14 md:grid-cols-3 md:gap-3 md:pt-32 lg:grid-cols-4 lg:pt-16"
          : "grid h-full w-full pt-64 md:grid-cols-3 md:gap-3 md:pt-28 lg:grid-cols-4 lg:pt-16"
      }
    >
      {loading ? (
        <Loading />
      ) : (
        data.map((rec) => {
          return (
            <RecipeCard
              key={rec.id}
              id={rec.id}
              title={rec.title}
              summary={rec.summary}
              cheap={rec.cheap}
              diets={rec.diets}
              image={rec.image}
            />
          );
        })
      )}
    </div>
  );
}

export default HomeRecipes;
