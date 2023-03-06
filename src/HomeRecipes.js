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
          ? " grid h-full w-full pt-14 md:grid-cols-3 md:gap-3 md:pt-32 md:mt-3 lg:mt-0 xl:mt-0 lg:grid-cols-4 xl:grid-cols-5 lg:pt-36 xl:pt-20"
          : "grid h-full w-full pt-72 md:grid-cols-3 md:gap-3 md:pt-36 lg:grid-cols-4 xl:grid-cols-5 lg:pt-34 xl:pt-20"
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
