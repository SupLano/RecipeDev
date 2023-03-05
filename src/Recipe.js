import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppNavContext } from "./App";
import Loading from "./Utils/Loading";
import RecipeCard from "./Utils/RecipeCard";
import Fetcher from "./Utils/Fetcher"

function Recipe(props) {
  const { isNavActive} = useContext(AppNavContext);
  const [idPage, setidPage] = useState(null);
  const { id } = useParams();
  const [pageDetails, setpageDetails] = useState({ url: ``, type: `` });

  //Keys are stored publicly for uptime maintenance

  useEffect(() => {
    setidPage(null);
    setpageDetails(null);

    //Setter section - Set URL request parameters - Everytime URL changes
    
    if (!id) {
      setidPage(false);
      setpageDetails({
        pageType: props.type,
        type: "Page",
      });
    }

    if (id) {
      setidPage(true);
      setpageDetails({
        ID: id,
        type: `Id`,
      });
    }
  }, [props.type, id]);

  const { data, loading } = Fetcher(pageDetails);

  if (!idPage) {
    return (
      <div className={""}>
        <div
          className={
            isNavActive
              ? " grid h-full w-full gap-10 pt-20 md:grid-cols-3 md:pt-36 lg:grid-cols-4 lg:pt-20"
              : " grid h-full w-full gap-10 pt-72 md:grid-cols-3 md:pt-32 lg:grid-cols-4 lg:pt-20"
          }
        >
          {loading ? (
            <Loading />
          ) : (
            Array.isArray(data) &&
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
      </div>
    );
  } else if (idPage) {
    return (
      <div>
        {loading ? (
          <Loading />
        ) : data.image ? (
          <div
            className={
              isNavActive
                ? "relative ml-0 mr-0 flex h-full w-full flex-col items-center justify-center overflow-hidden pt-14 pb-80 md:mt-10 md:pt-32 lg:pt-20"
                : " bg-sky-40 relative mt-5 ml-0 mr-0 flex h-full w-full flex-col items-center justify-center overflow-hidden pt-64 pb-80 md:mt-10 md:pt-28 lg:pt-14"
            }
          >
            <div className="bg-lue-900 flex h-full w-full flex-wrap justify-around gap-2 p-2 md:flex-nowrap md:justify-between">
              <span
                className={
                  "font-na bg-ky-900 pl-2 pt-2 pb-2 text-center text-5xl font-extrabold tracking-widest opacity-90"
                }
              >
                {data.title}
              </span>
              <div className="bg-ed-900 flex w-1/2  items-center justify-center gap-2  p-2 text-center md:justify-end lg:justify-end">
                <div
                  className={
                    "rounded border border-orange-500 bg-orange-600 pl-4 pr-3 pt-2 pb-3 text-sm font-bold shadow hover:bg-orange-300 hover:cursor-pointer"
                  }
                >
                  Save
                </div>
                <div
                  className={
                    "rounded border border-green-500 bg-green-500 pl-4 pr-3 pt-2 pb-3 text-sm font-bold shadow hover:bg-green-300 hover:cursor-pointer"
                  }
                >
                  Share
                </div>
                <button class="inline-flex items-center rounded bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400">
                  <svg
                    class="mr-2 h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                  </svg>
                  <span>Download</span>
                </button>
              </div>
            </div>
            <div
              className={
                "bg-red-20 bg-gray-5 mt-10 ml-9 mr-9 grid w-full gap-2 p-5 md:grid-cols-3"
              }
            >
              <div
                className={
                  "bg-blue-10 relative flex h-fit items-start justify-center"
                }
              >
                <span
                  className={
                    "absolute top-4 left-0 rounded-full bg-pink-600 p-2 font-nav text-lg font-bold uppercase text-white  "
                  }
                >
                  {data.readyInMinutes ? data.readyInMinutes + " Mins" : ""}
                </span>
                <div className={"p-4"}>
                  <img
                    src={data.image}
                    alt={data.title}
                    className={"w-full rounded shadow-inner"}
                  />
                </div>
              </div>

              <div className={"bg-yellow-10 relative"}>
                <span
                  className={
                    "absolute top-0 mt-3 rounded-full bg-pink-600 p-2 font-nav text-lg font-bold uppercase text-white"
                  }
                >
                  Ingredients
                </span>
                <div className={"p-4"}>
                  <div
                    className={"m-2 mt-8 h-fit p-4 text-center hover:shadow-xl"}
                  >
                    {data.nutrition.ingredients ? (
                      data.nutrition.ingredients.map((ingredient) => {
                        return (
                          <span
                            key={ingredient.name}
                            className={"block pl-4 pr-4 pb-4 uppercase"}
                          >
                            {ingredient.name}
                          </span>
                        );
                      })
                    ) : (
                      <div>failed to get ingredients...</div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={
                  "relative order-1 mt-3 h-fit bg-gray-100 hover:bg-gray-50"
                }
              >
                <span
                  className={
                    "absolute top-0 mb-3 rounded-full bg-pink-600 p-2 font-nav text-lg font-bold  uppercase text-white  "
                  }
                >
                  Steps
                </span>
                <div className="p-4">
                  {data.analyzedInstructions[0].steps ? (
                    data.analyzedInstructions[0].steps.map(({ step }) => {
                      return (
                        <div
                          key={step}
                          className={
                            "block p-8 text-center font-thin odd:bg-gray-100"
                          }
                        >
                          {step}
                        </div>
                      );
                    })
                  ) : (
                    <div>failed!!!!!!!</div>
                  )}
                </div>
              </div>
            </div>
            <div
              className={
                "relative mt-5 h-fit rounded border-t bg-gray-50 p-7 pt-20 font-serif shadow lg:mt-32 lg:w-2/3"
              }
            >
              <span
                className={
                  "absolute top-0 mt-3 rounded-full bg-pink-600 p-2 font-nav text-lg font-bold uppercase text-white  "
                }
              >
                Conclusion
              </span>
              <h3
                className={"text-center"}
                dangerouslySetInnerHTML={{ __html: data.summary }}
              ></h3>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default Recipe;
