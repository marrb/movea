import Container from "../../utils/Container";
import { useState } from "react";
import MobileNav from "./MobileNav";
import PCNav from "./PCNav";

const MainNav = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  return (
    <Container>{windowWidth >= 640 ? <PCNav /> : <MobileNav />}</Container>
  );
};

export default MainNav;
