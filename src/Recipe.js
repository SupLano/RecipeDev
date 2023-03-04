import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppNavContext } from "./App";
import Loading from "./Utils/Loading";
import RecipeCard from "./Utils/RecipeCard";
import Get from "./Utils/Get";

function Recipe(props) {
  const { isNavActive, handleNavDrop } = useContext(AppNavContext);
  const [idPage, setidPage] = useState(null);
  const { id } = useParams();
  const [pageDetails, setpageDetails] = useState({ url: ``, type: `` });

  //Keys are stored publicly for uptime maintenance

  useEffect(() => {
    setidPage(null);
    setpageDetails(null);
    const keys = [
      "1882448aefc44b3ea30609cdccf40951",
      "30a751e2874b43f1ad3ecaee77f90358",
      "0196cdecde9e4bc9b480c4aa600c5da0",
      "745e795c3f0c4208bca68eb1cee6b5cc",
      "dace1d4c4a18413aaae4c957cd7c06da",
      "281e19f37bff48b6a40aebba8c5c3daa",
      "0888534ce1d745669ac10e33a796231b",
      "9ec50c8497ff444ebc23caff064ecb84",
      "2d2179c4d6a84cecb45f33eb7c7a7fcd",
      "ab2ba4413ae64f3983f87fae07bf602d",
      "67f51a29ba7d4d17a05abfe0cd981d80",
      "b996787c904f49ba9142544aa5832a3e",
      "bdd064e1a1d64716b37ff9b6368a03ad",
      "c192100da37d45f7a623175aa6541583",
      "8b9f348c4c774156b9e7c50e428c7ca4",
      "b63ef92116bd4190bef73a4889f032d9",
      "cff3befae479438f8f9dfffcbe5be535",
      "a20b5632aa8d489e82a17c2b6b5c57b9",
      "bdd064e1a1d64716b37ff9b6368a03ad",
      "ebf26298c85c4ab9a16fdcd10992f311",
      "fa37f0fee335472a906bdc5a0cb4c3a8",
    ];
    let key = keys[Math.floor(Math.random() * 20)];

    //Setter section - Set URL request parameters - Everytime URL changes
    if (!id) {
      setidPage(false);
      switch (props.type) {
        case "African":
          setpageDetails({
            url: `https://api.spoonacular.com/recipes/complexSearch?query=african&number=24&apiKey=${key}`,
            type: "Page",
          });
          break;

        case "American":
          setpageDetails({
            url: `https://api.spoonacular.com/recipes/complexSearch?query=american&number=24&apiKey=${key}`,
            type: "Page",
          });
          break;

        case "Chinese":
          setpageDetails({
            url: `https://api.spoonacular.com/recipes/complexSearch?query=chinese&number=24&apiKey=${key}`,
            type: "Page",
          });
          break;

        case "European":
          setpageDetails({
            url: `https://api.spoonacular.com/recipes/complexSearch?query=european&number=24&apiKey=${key}`,
            type: "Page",
          });
          break;

        case "Spanish":
          setpageDetails({
            url: `https://api.spoonacular.com/recipes/complexSearch?query=spanish&number=24&apiKey=${key}`,
            type: "Page",
          });
          break;

        default:
          break;
      }
    }

    if (id) {
      setidPage(true);
      setpageDetails({
        url: `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${key}`,
        type: `Id`,
      });
    }
  }, [props.type, id]);

  const { data, loading } = Get(pageDetails);

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
            <div className="bg-blu-900 flex h-full w-full flex-wrap justify-center gap-2 p-2 md:flex-nowrap">
              <span
                className={
                  "font-na bg-ky-900 pl-2 pt-2 pb-2 text-center text-5xl font-extrabold tracking-widest opacity-90"
                }
              >
                {data.title}
              </span>
              <div className="bg-ed-900 flex w-1/2 items-center justify-center gap-2 self-center p-2 text-center md:justify-end">
                <div
                  className={
                    "rounded-lg border border-orange-400 bg-orange-600 pl-4 pr-2 pt-2 pb-3 text-sm font-bold shadow"
                  }
                >
                  Save
                </div>
                <div
                  className={
                    "rounded-lg border border-green-500 bg-green-600 pl-4 pr-2 pt-2 pb-3 text-sm font-bold shadow"
                  }
                >
                  Share
                </div>
                <div
                  className={
                    "rounded-lg border border-red-500 bg-red-600 pl-4 pr-2 pt-2 pb-3 text-sm font-bold shadow"
                  }
                >
                  Download
                </div>
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
