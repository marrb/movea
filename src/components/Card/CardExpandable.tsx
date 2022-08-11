import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { CalendarIcon } from "@heroicons/react/outline";

interface CardExpandableProps {
  title: string;
  vote_average: number;
  release_date: string;
  genre_strings: (string | undefined)[];
  expandable_state: boolean;
}

const CardExpandable: React.FC<CardExpandableProps> = ({
  title,
  vote_average,
  release_date,
  genre_strings,
  expandable_state,
}) => {
  return (
    <div
      className={
        "bg-slate-500 backdrop-blur-[10px] group absolute bottom-0 grid max-h-[4rem] min-h-[4rem] w-full auto-rows-auto gap-y-1 rounded-xl bg-opacity-50 px-5 transition-[max-height] duration-500 font-bold group-hover:max-h-[15rem] " +
        (expandable_state ? "max-h-[15rem]" : "")
      }
    >
      <div className="flex h-[4rem] items-center justify-between gap-5">
        <p>{title.length > 45 ? title.substring(0, 45) + "..." : title}</p>
        <div className="flex items-center justify-between gap-1">
          <StarIcon className="w-5 h-5" />
          <p>{vote_average}</p>
        </div>
      </div>
      <div className="flex flex-wrap">
        {genre_strings!.slice(0, 3).map((genre) => (
          <span
            className="h-min m-1 rounded-xl bg-purple-500 p-1 text-center text-black"
            key={genre}
          >
            {genre}
          </span>
        ))}
      </div>
      <div className="flex items-center mt-1">
        <CalendarIcon className="h-6 w-6" />
        <span className="m-1">{release_date}</span>
      </div>
    </div>
  );
};

export default CardExpandable;
