import { useEffect, useRef, useState } from "react";
import { genre } from "../../contracts";
import { PlusIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";

interface GenrePickerProps {
  genres: genre[];
  selectState: string;
  setChosenGenres: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        id: number;
      }[]
    >
  >;
  chosenGenres: {
    name: string;
    id: number;
  }[];
}

const GenrePicker: React.FC<GenrePickerProps> = ({
  genres,
  selectState,
  setChosenGenres,
  chosenGenres,
}) => {
  const [inputFocusState, setInputFocusState] = useState(false);
  const [inputText, setInputText] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const handleOutsideClickEvent = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setInputFocusState(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClickEvent, true);
    return () => {
      document.removeEventListener("click", handleOutsideClickEvent, true);
    };
  }, [inputFocusState, ref]);

  useEffect(() => {
    setChosenGenres([]);
  }, [selectState]);

  return (
    <>
      <div
        className="bg-deep-black rounded-lg w-full p-1 overflow-x-hidden"
        onClick={() => setInputFocusState(true)}
        ref={ref}
      >
        <input
          type="text"
          placeholder="Search genres"
          className="bg-deep-black outline-none caret-white px-1 w-full"
          onChange={(e) => setInputText(e.target.value.toLowerCase())}
        />
        <div
          className={
            "overflow-y-auto overflow-x-hidden " +
            (inputFocusState ? "max-h-32 my-1" : "max-h-0")
          }
        >
          {genres
            .filter((genre) => {
              return (
                genre.name.toLowerCase().includes(inputText) &&
                !chosenGenres.includes(genre)
              );
            })
            .map((genre) => {
              return (
                <div
                  className="flex flex-col after:relative after:h-px after:w-full after:bg-gradient-to-r after:from-deep-black after:via-white after:to-deep-black after:content-[''] hover:bg-slate-700 bg-opacity-50 duration-300 rounded-md after:last:bg-none"
                  key={genre.id}
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => {
                      setChosenGenres((prev) => [...prev, genre]);
                    }}
                  >
                    <p className="pl-1 py-1 ">{genre.name}</p>
                    <PlusIcon className="h-4 w-4 mr-2 text-green-500" />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className={"flex gap-2 flex-wrap mt-3"}>
        {chosenGenres.map((genre, idx) => {
          return (
            <div
              className="flex items-center bg-purple-500 rounded-xl p-1 cursor-pointer text-sm font-bold text-black"
              onClick={() =>
                setChosenGenres((prev) =>
                  [...prev].filter((item) => {
                    return item !== genre;
                  })
                )
              }
              key={idx}
            >
              <p>{genre.name}</p>
              <XIcon className="w-4 h-4" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GenrePicker;
