import MobileDropdown from "./Mobile Dropdown/MobileDropdown";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { FilmIcon } from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";

const MobileNav = () => {
  const [mobileNavState, setMobileNavState] = useState(false);

  return (
    <header
      className={
        "absolute top-0 w-full z-30 px-5 rounded-b-md transition-[background-color] duration-300 " +
        (mobileNavState ? "bg-side-black" : " delay-300")
      }
    >
      <div className="flex justify-between place-content-center items-center">
        <NavLink to="/" className={"flex items-center py-2"}>
          <FilmIcon className="h-6 w-6 mr-2" />
          <h2 className="text-lg font-bold">MOVEA</h2>
        </NavLink>
        <div className="flex items-center gap-x-3">
          <SearchBar />
          <div
            className={
              "h-[3px] w-7 relative before:content-[''] transition-[background-color] delay-200 before:bg-white before:h-[3px] before:w-7 before:absolute before:top-2 after:content-[''] after:bg-white after:h-[3px] after:w-7 after:absolute after:bottom-2 before:transition-[transform,top] before:duration-[200,200] before:delay-[0ms,200ms] after:transition-[transform,bottom] after:duration-[200,200] after:delay-[0ms,200ms] " +
              (mobileNavState
                ? "bg-side-black before:top-0 before:rotate-45 before:duration-[200,200] before:delay-[200ms,0ms] after:bottom-0 after:-rotate-45 after:duration-[200,200] after:delay-[200ms,0ms]"
                : "bg-white ")
            }
            onClick={() => setMobileNavState(!mobileNavState)}
          />
        </div>
      </div>
      <nav
        className={
          "overflow-hidden h-auto transition-[max-height] duration-500 " +
          (mobileNavState ? "max-h-96" : "max-h-0")
        }
      >
        <div>
          <MobileDropdown
            MainTitles={["Movies", "TV Shows"]}
            MainTitlesPaths={["/", "/tv"]}
            DropdownTitles={[
              ["- Popular", "- New Releases", "- Top Rated"],
              ["- Popular", "- Airing", "- Top Rated"],
            ]}
            DropdownTitlesPaths={[
              ["/movies/popular", "/movies/now_playing", "/movies/top_rated"],
              ["/tvs/popular", "/tvs/on_the_air", "/tvs/top_rated"],
            ]}
          />
        </div>
      </nav>
    </header>
  );
};

export default MobileNav;
