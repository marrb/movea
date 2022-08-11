import React, { useRef } from "react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/outline";

const SearchBar = () => {
  const input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const updateSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) navigate("/search/movies/" + e.target.value);
  };
  const handleInput = debounce(updateSearchText, 500);

  return (
    <div
      className="flex justify-start w-min"
      onClick={() => {
        input.current?.focus();
      }}
    >
      <SearchIcon className="h-6 w-6 cursor-pointer" />
      <input
        type={"text"}
        className="transition-[width, p] ml-2 h-6 w-0 border-b-2 border-b-purple-500 bg-deep-black px-0 text-lg  caret-white duration-500 focus:w-40 focus:px-1 focus:pb-1 focus:outline-none text-white"
        spellCheck="false"
        ref={input}
        onChange={handleInput}
      />
    </div>
  );
};

export default SearchBar;
