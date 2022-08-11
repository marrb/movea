import { useState } from "react";
import { NavLink } from "react-router-dom";

interface DropdownProps {
  MainTitle: string;
  MainPath: string;
  ListTitles: string[];
  ListPaths: string[];
}

const DropdownItem: React.FC<DropdownProps> = ({
  MainTitle,
  MainPath,
  ListTitles,
  ListPaths,
}) => {
  const [dropDownState, setDropdownState] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setDropdownState(true)}
      onMouseLeave={() => setDropdownState(false)}
      className="relative"
    >
      <NavLink
        to={MainPath}
        className={({ isActive }) =>
          isActive ? "px-5" : "px-5 text-headline-white hover:text-white"
        }
      >
        {MainTitle}
      </NavLink>

      <div
        className={
          (dropDownState
            ? "p-3 max-h-64 border-2 border-purple-500 "
            : "p-0 max-h-0 ") +
          "absolute bg-side-black rounded-xl flex-col flex z-10 gap-y-2 duration-500 left-2 overflow-hidden w-max text-slate-300 mt-2"
        }
      >
        {ListTitles.map((title, idx) => {
          return (
            <NavLink
              to={ListPaths[idx]}
              className={({ isActive }) =>
                isActive ? "text-white" : "hover:text-white"
              }
              key={idx}
            >
              {title}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default DropdownItem;
