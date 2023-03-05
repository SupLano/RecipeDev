import { React, useContext } from "react";
import { AppNavContext } from "./App";
import RecipeCard from "./Utils/RecipeCard";
import Loading from "./Utils/Loading";
import Fetcher from "./Utils/Fetcher";

function HomeRecipes() {
  const { isNavActive } = useContext(AppNavContext);
  const { data, loading } = Fetcher({type: 'Homepage'});

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
