import DropdownItem from "./DropdownItem";

interface DropdownProps {
  NavTitles: string[];
  DropdownTitles: string[][];
  TitlesNavPaths: string[];
  DropdownTitlesPaths: string[][];
}

const NavDropdown: React.FC<DropdownProps> = ({
  NavTitles,
  DropdownTitles,
  TitlesNavPaths,
  DropdownTitlesPaths,
}) => {
  return (
    <>
      {NavTitles.map((title, idx) => {
        return (
          <DropdownItem
            MainTitle={title}
            MainPath={TitlesNavPaths[idx]}
            ListTitles={DropdownTitles[idx]}
            ListPaths={DropdownTitlesPaths[idx]}
            key={idx}
          />
        );
      })}
    </>
  );
};

export default NavDropdown;
