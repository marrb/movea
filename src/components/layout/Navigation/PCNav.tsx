import SearchBar from "./SearchBar";
import { FilmIcon } from "@heroicons/react/outline";
import NavDropdown from "./Dropdown/NavDropdown";
import { NavLink } from "react-router-dom";

const PCNav = () => {
  return (
    <header className="relative flex justify-between after:absolute after:-bottom-3 after:h-px after:w-full after:bg-gradient-to-r after:from-deep-black after:via-white after:to-deep-black after:transition-[height] after:duration-300 after:content-[''] after:hover:h-1">
      <NavLink to="/" className={"flex items-center"}>
        <FilmIcon className="h-6 w-6 mr-2" />
        <h1 className="text-lg font-bold">MOVEA</h1>
      </NavLink>
      <nav className=" divide-x-[1px] divide-purple-500 flex">
        <NavDropdown
          NavTitles={["Movies", "TV Shows"]}
          DropdownTitles={[
            ["- Popular", "- New Releases", "- Top Rated"],
            ["- Popular", "- Airing", "- Top Rated"],
          ]}
          TitlesNavPaths={["/", "/tv"]}
          DropdownTitlesPaths={[
            ["/movies/popular", "/movies/now_playing", "/movies/top_rated"],
            ["/tvs/popular", "/tvs/on_the_air", "/tvs/top_rated"],
          ]}
        />
      </nav>
      <SearchBar />
    </header>
  );
};

export default PCNav;
