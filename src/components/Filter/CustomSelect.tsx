import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";

interface CustomSelectProps {
  selectState: string;
  selectOptions: string[];
  setSelectState: (option: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  selectState,
  selectOptions,
  setSelectState,
}) => {
  const [dropdownState, setDropdownState] = useState(false);

  return (
    <div className="bg-deep-black p-1 rounded-lg">
      <div
        className="px-1 flex justify-between items-center"
        onClick={() => setDropdownState(!dropdownState)}
      >
        <span>{selectState}</span>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      <ul
        className={
          "overflow-hidden transition-[max-height] duration-300 " +
          (dropdownState ? "max-h-96" : "max-h-0")
        }
      >
        {selectOptions.map((option, idx) => {
          return (
            <li
              className={
                "first:mt-1 p-1 rounded-lg " +
                (selectState === option ? " bg-slate-500 bg-opacity-40" : "")
              }
              onClick={() => {
                setDropdownState(false);
                setSelectState(option);
              }}
              key={idx}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CustomSelect;
