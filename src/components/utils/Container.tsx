import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  classAttr?: string;
}

const Container: React.FC<ContainerProps> = ({ children, classAttr }) => {
  return (
    <div className={"mx-auto max-w-screen-2xl " + classAttr}>{children}</div>
  );
};

export default Container;
