import { useState } from "react";
import { GetPicturesResponse } from "../contracts";
import { GetVideoListResponse } from "../contracts";

interface MediaListProps {
  media: GetPicturesResponse;
  videos: GetVideoListResponse;
}

const MediaList: React.FC<MediaListProps> = ({ media, videos }) => {
  const [mediaState, changeMediaState] = useState("backdrops");

  const base_image_path = import.meta.env.VITE_APP_BASE_URL_PICTURES + "/w500/";
  return (
    <>
      <h1 className="mb-5 text-2xl font-bold">Media:</h1>
      <div className="bg-side-black rounded-lg">
        <div className="flex gap-x-6 text-lg p-5 border-b-[1px] border-purple-500">
          <span
            onClick={() => changeMediaState("backdrops")}
            className={
              (mediaState === "backdrops" ? "border-b-2" : "") +
              " cursor-pointer hover:border-b-2"
            }
          >
            Backdrops
          </span>
          <span
            onClick={() => changeMediaState("posters")}
            className={
              (mediaState === "posters" ? "border-b-2" : "") +
              " cursor-pointer hover:border-b-2"
            }
          >
            Posters
          </span>
          <span
            onClick={() => changeMediaState("videos")}
            className={
              (mediaState === "videos" ? "border-b-2" : "") +
              " cursor-pointer hover:border-b-2"
            }
          >
            Videos
          </span>
        </div>
        <div className="flex overflow-x-auto my-2 snap-x px-2">
          {mediaState === "backdrops"
            ? media.backdrops
                .sort((a) => {
                  if (a.iso_639_1 === "en") return -1;
                  else return 1;
                })
                .slice(0, 8)
                .map((backdrop, idx) => {
                  return (
                    <img
                      src={base_image_path + backdrop.file_path}
                      className="mx-2 rounded-md mb-2 hover:shadow-md hover:shadow-white transition-all duration-200 snap-center"
                      key={idx}
                    />
                  );
                })
            : null}
          {mediaState === "posters"
            ? media.posters
                .sort((a) => {
                  if (a.iso_639_1 === "en") return -1;
                  else return 1;
                })
                .slice(0, 5)
                .map((poster, idx) => {
                  return (
                    <img
                      src={base_image_path + poster.file_path}
                      className="mx-2 rounded-md mb-2 h-[281px] w-auto hover:shadow-md hover:shadow-white transition-all duration-200 snap-center"
                      key={idx}
                    />
                  );
                })
            : null}
          {mediaState === "videos"
            ? videos.results
                .sort((a) => {
                  if (a.site === "YouTube") return 1;
                  else return -1;
                })
                .slice(0, 10)
                .map((video) => {
                  if (video.site === "YouTube")
                    return (
                      <iframe
                        src={"https://www.youtube.com/embed/" + video.key}
                        className="h-52 w-96 mx-2 rounded-md mb-2 snap-center"
                        allowFullScreen
                        key={video.id}
                      />
                    );
                })
            : null}
        </div>
      </div>
    </>
  );
};

export default MediaList;
