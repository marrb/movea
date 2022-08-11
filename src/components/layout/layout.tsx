import { ReactNode } from "react";
import MainNav from "./Navigation/MainNav";
import FilterSideTab from "../Filter/FilterSideTab";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="pt-5 font-sans text-white caret-transparent sm:px-10">
      <MainNav />
      <main className="my-12 px-10 xl:pb-5">
        <FilterSideTab />
        {children}
      </main>
    </div>
  );
};

export default Layout;
