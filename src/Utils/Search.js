import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Fetcher from "./Fetcher"

function Search() {
  const [In, SetIn] = useState(false);
  const [Input, setInput] = useState(null);
  const [pageDetails, setpageDetails] = useState({ type: null, Input: null });

  const handleInput = (evt) => {
    evt.preventDefault();
    const value = evt.target.value;

    //If change empties input field
    if (!value) {
      SetIn(null);
    }

    else {
      //If text changes
      SetIn(true);
      setInput(value);
    }
  };



      useEffect(() => {
          setTimeout(() => {
            setpageDetails({type: 'Search', Input: Input})
          }, 1);
        
      }, [Input, In]);

  const stopSearch = () => {
    setTimeout(() => {
      SetIn(false);
      setInput(null);
    }, 100);
  };

  const { data } = Fetcher(pageDetails)

  return (
    <div className={"relative p-2 md:block"}>
      <div className={"flex justify-center"}>
        <div className={" xl:w-72"}>
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
            "max-w-lg shadow-lg absolute mt-6 min-w-full break-words rounded border bg-myblack p-2 text-center text-white opacity-80 md:-ml-3 lg:-ml-1"
          }
        >
          {data ? (
            <div>
              {Array.isArray(data) && data.length > 1 ? (
                <div>
                  {data.map((result) => {
                    return (
                      <Link
                        key={result.id}
                        to={`/Recipe/${result.id}`}
                        className={"block p-2 capitalize"}
                      >
                        {result.title}
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div>No Results Found...</div>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default Search;
