import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/outline";

interface MobileDropdownItemProps {
  MainTitle: string;
  MainTitlePath: string;
  DropdownTitles: string[];
  DropdownTitlesPaths: string[];
}

const MobileDropdownItem: React.FC<MobileDropdownItemProps> = ({
  MainTitle,
  MainTitlePath,
  DropdownTitles,
  DropdownTitlesPaths,
}) => {
  const [dropDownState, setDropdownState] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <NavLink
          to={MainTitlePath}
          className={({ isActive }) =>
            (isActive ? "text-purple-300 " : "") + "py-2 w-full text-purple-500"
          }
        >
          {MainTitle}
        </NavLink>
        <ChevronDownIcon
          onClick={() => setDropdownState(!dropDownState)}
          className={"w-8 h-8 " + (dropDownState ? "rotate-180" : "")}
        />
      </div>
      <div
        className={
          "overflow-hidden flex flex-col transition-[max-height] duration-300 text-slate-300 " +
          (dropDownState ? " max-h-96" : " max-h-0")
        }
      >
        {DropdownTitles.map((title, idx) => {
          return (
            <NavLink
              to={DropdownTitlesPaths[idx]}
              className={({ isActive }) =>
                (isActive ? "text-white " : "") + "py-2 px-5"
              }
              key={idx}
            >
              {title}
            </NavLink>
          );
        })}
      </div>
    </>
  );
};

export default MobileDropdownItem;
