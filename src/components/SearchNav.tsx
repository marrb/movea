import Container from "./utils/Container";
import { NavLink } from "react-router-dom";

interface SearchNavProps {
  searchQuery: string;
}

const SearchNav: React.FC<SearchNavProps> = ({ searchQuery }) => {
  return (
    <Container>
      <div className=" rounded-r-xl gap-8 flex mb-5 mx-4 font-bold text-lg">
        <NavLink
          to={"/search/movies/" + searchQuery!.replace(" ", "%20")}
          className={({ isActive }) =>
            (isActive ? " bg-purple-400 text-black " : "bg-purple-600 ") +
            "p-2 rounded-sm hover:bg-purple-400 hover:text-black transition-all duration-200 w-full"
          }
        >
          <p className="mx-auto w-fit">Movies</p>
        </NavLink>
        <NavLink
          to={"/search/tvs/" + searchQuery!.replace(" ", "%20")}
          className={({ isActive }) =>
            (isActive ? " bg-purple-400  text-black " : "bg-purple-600  ") +
            "p-2 rounded-sm hover:bg-purple-400 hover:text-black w-full transition-all duration-200"
          }
        >
          <p className="mx-auto w-fit">TV Shows</p>
        </NavLink>
      </div>
    </Container>
  );
};

export default SearchNav;
