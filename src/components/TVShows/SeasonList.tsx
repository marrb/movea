import { TVShowSeason } from "../../contracts";
import unknown_poster from "../../img/unknown_poster.jpg";

interface SeasonListProps {
  seasons: TVShowSeason[];
}

const SeasonList: React.FC<SeasonListProps> = ({ seasons }) => {
  return (
    <>
      <h1 className="mt-20 mb-5 text-2xl font-bold">Seasons:</h1>
      <div className="flex flex-wrap h-auto">
        {seasons
          .sort((a, b) => (a.air_date > b.air_date ? 1 : -1))
          .map((season) => {
            const poster_path = season.poster_path
              ? import.meta.env.VITE_APP_BASE_URL_PICTURES +
                "/w500/" +
                season.poster_path
              : unknown_poster;

            if (season.episode_count > 0)
              return (
                <div
                  className="w-full rounded-xl bg-side-black mb-5 flex p-4 gap-10 items-center"
                  key={season.id}
                >
                  <img
                    src={poster_path}
                    className="h-auto w-28 rounded-xl max-h-[168px]"
                  />
                  <div className="flex flex-col justify-between h-full">
                    <h1 className="text-xl font-bold mr-3">
                      {season.name}
                      <p className=" text-sm text-slate-400">
                        {season.episode_count} Episodes
                      </p>
                    </h1>
                    <p className="text-slate-300 my-2">{season.overview}</p>
                    <p>{season.air_date}</p>
                  </div>
                </div>
              );
          })}
      </div>
    </>
  );
};

export default SeasonList;
