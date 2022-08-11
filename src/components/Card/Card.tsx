import { useItemPictureQuery, useGenreListQuery } from "../../lib/axios";
import Loading from "../utils/Loading";
import { useNavigate } from "react-router-dom";
import RenderIfVisible from "react-render-if-visible";
import CardExpandable from "./CardExpandable";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { useMemo, useState } from "react";
import background_unknown from "../../img/background_unknown.jpg";

interface CardProps {
  isTouchDevice: boolean;
  path: string;
  id: string;
  genre_ids: number[];
  title: string;
  vote_average: number;
  release_date: string;
}

const Card: React.FC<CardProps> = ({
  id,
  genre_ids,
  title,
  vote_average,
  release_date,
  isTouchDevice,
  path,
}) => {
  const navigate = useNavigate();
  const itemPictureInfoQuery = useItemPictureQuery(path, id);
  const genre_codes = useGenreListQuery(path);
  const [expandableState, setExpandableState] = useState(false);

  //Construct path to image background
  const image_path = useMemo(() => {
    if (!itemPictureInfoQuery.isSuccess) return;
    return itemPictureInfoQuery.data?.backdrops[0]
      ? import.meta.env.VITE_APP_BASE_URL_PICTURES +
          "/w780" +
          itemPictureInfoQuery.data?.backdrops[0].file_path
      : background_unknown;
  }, [itemPictureInfoQuery.data]);

  //Find all genres that belong to a movie
  const genre_strings = useMemo(() => {
    if (!genre_codes.isSuccess) return;
    return genre_ids.map((genre) => {
      const result = genre_codes.data!.find((code) => code.id === genre);
      if (result) {
        if (result.name === "Science Fiction") return "Sci-fi";
        return result.name;
      }
    });
  }, [genre_codes.data]);

  if (itemPictureInfoQuery.isLoading || genre_codes.isLoading) {
    return (
      <Loading classAttr="border-gray mx-3 mb-5 h-52 shrink-0 grow-0 rounded-2xl border-2 border-solid xs:basis-80 basis-60" />
    );
  }

  return (
    <div className="grow-0 shrink-0 xs:basis-80 basis-60 snap-center mb-5 cursor-pointer overflow-hidden h-[13rem] hover:shadow-lg hover:rounded-xl hover:shadow-purple-500 transition-all duration-500">
      <RenderIfVisible visibleOffset={1000}>
        <div
          className={
            "h-52 bg-cover bg-center rounded-xl group relative overflow-hidden"
          }
          style={{
            backgroundImage: "url(" + image_path + ")",
          }}
          onClick={() => {
            navigate(path + "/" + id);
          }}
        >
          <CardExpandable
            title={title}
            vote_average={vote_average}
            release_date={release_date}
            genre_strings={genre_strings!}
            expandable_state={expandableState}
          />
          {isTouchDevice ? (
            <div
              className="absolute p-2 m-4 top-0 right-0 bg-side-black rounded-xl text-purple-500"
              onClick={(e) => {
                e.stopPropagation();
                setExpandableState(!expandableState);
              }}
            >
              {expandableState ? (
                <ChevronDownIcon className="w-5 h-5" />
              ) : (
                <ChevronUpIcon className="w-5 h-5" />
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </RenderIfVisible>
    </div>
  );
};

export default Card;
