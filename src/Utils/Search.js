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
    <div className={"relative p-2  bg-blue-50 mb-1 mt-1"}>

        <div>               
            <div className={'relative w-80'}>
                <div className={'absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'}>
                    <svg aria-hidden="true" className={'w-5 h-4 text-gray-500 dark:text-gray-400'} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input onInput={handleInput} onBlur={stopSearch} type="search" className={'block w-full p-4 pl-10 text-sm text-gray-900 focus:outline-0 border rounded-md bg-gray-50 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-myblack'} placeholder='Find Recipe'></input>
                <button type="submit" className={'text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700'}>Search</button>
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
                          className={"block p-2 capitalize hover:text-blue-200 hover:scale-x-110"}
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
