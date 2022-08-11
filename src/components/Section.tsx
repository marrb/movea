import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { isTouchDevice } from "./utils/isTouchDevice";
import Card from "./Card/Card";

type ItemData = {
  id: string;
  genre_ids: number[];
  title: string;
  vote_average: number;
  release_date: string;
};

interface SectionProps {
  Section_Title: string;
  fetch_title: string;
  data: ItemData[];
  classAttr?: string;
  path: string;
}

const Section: React.FC<SectionProps> = ({
  Section_Title,
  fetch_title,
  data,
  classAttr,
  path,
}) => {
  const touchActive = isTouchDevice();

  return (
    <section className="mb-24">
      <div className="flex items-center justify-between">
        <h2 className="mb-4 text-2xl font-bold">{Section_Title}</h2>
        <NavLink to={path + "s/" + fetch_title}>
          <h3 className="text-section-gray hover:text-white">View all &#62;</h3>
        </NavLink>
      </div>
      <div
        className={
          "flex w-full overflow-x-auto snap-x gap-x-8 px-4 " + classAttr
        }
      >
        {data.map((item) => {
          return (
            <Card
              isTouchDevice={touchActive}
              path={path}
              id={item.id}
              genre_ids={item.genre_ids}
              title={item.title}
              vote_average={item.vote_average}
              release_date={item.release_date}
              key={item.id}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Section;
