import MobileDropdownItem from "./MobileDropdownItem";

interface MobileDropdownProps {
  MainTitles: string[];
  MainTitlesPaths: string[];
  DropdownTitles: string[][];
  DropdownTitlesPaths: string[][];
}

const MobileDropdown: React.FC<MobileDropdownProps> = ({
  MainTitles,
  MainTitlesPaths,
  DropdownTitles,
  DropdownTitlesPaths,
}) => {
  return (
    <div className="flex flex-col">
      {MainTitles.map((title, idx) => {
        return (
          <MobileDropdownItem
            MainTitle={title}
            MainTitlePath={MainTitlesPaths[idx]}
            DropdownTitles={DropdownTitles[idx]}
            DropdownTitlesPaths={DropdownTitlesPaths[idx]}
            key={idx}
          />
        );
      })}
    </div>
  );
};

export default MobileDropdown;
