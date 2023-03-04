import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Search() {
  const [In, SetIn] = useState(false);
  const [Input, setInput] = useState("");

  const [Results, setResults] = useState(null);
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

  const handleInput = (evt) => {
    //If change empties input field
    evt.preventDefault();
    const value = evt.target.value;
    if (!value) {
      SetIn(false);
      console.log("emptied...");
    } else {
      //If text changes
      SetIn(true);
      setInput(value);
      console.log(value);
      console.log("Word Changed");
    }
  };

  useEffect(() => {
    console.log("searching based on new variable" + " " + Input);
    const res = fetch(
      `https://api.spoonacular.com/recipes/autocomplete?number=10&query=${Input}&apiKey=${key}`
    )
      .then((res) => res.json())
      .then((res) => setResults(res));
  }, [Input]);

  const stopSearch = (evt) => {
    setTimeout(() => {
      SetIn(false);
      setInput(null);
    }, 100);
  };

  return (
    <div className={"relative p-2 md:block"}>
      <div className={"flex justify-center"}>
        <div className={" xl:w-96"}>
          <div className={"input-group relative flex w-full items-stretch"}>
            <input
              type="search"
              onInput={handleInput}
              onBlur={stopSearch}
              placeholder="Search recipe"
              className={
                "form-control relative m-0 block w-full min-w-0 flex-auto rounded-l border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1 font-nav text-base text-gray-700 transition ease-in-out focus:border-gray-100 focus:bg-white focus:text-gray-700 focus:outline-none"
              }
            />
            <button
              className={
                "btn flex items-center bg-gray-500 text-xs  font-medium uppercase text-white  transition duration-150 ease-in-out hover:bg-gray-900 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-100 active:shadow-lg"
              }
              type="button"
              id="button-addon2"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className={"w-4"}
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {In ? (
        <div
          className={
            "max-w-lga absolute mt-6 min-w-full break-words rounded border bg-myblack p-2 text-center text-white opacity-80 md:-ml-3 lg:-ml-1"
          }
        >
          {Results ? (
            <div>
              {Array.isArray(Results) && Results.length > 1 ? (
                <div>
                  {Results.map((result) => {
                    return (
                      <Link
                        key={result.id}
                        to={`/Recipe/${result.id}`}
                        className={"block p-2"}
                      >
                        {result.title}
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div>Result not found...</div>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default Search;
