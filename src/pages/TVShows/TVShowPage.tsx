import { useParams } from "react-router-dom";
import CastList from "../../components/CastList";
import Loading from "../../components/utils/Loading";
import Container from "../../components/utils/Container";
import SeasonList from "../../components/TVShows/SeasonList";
import MediaList from "../../components/MediaList";
import { GetTVShowDetailsResponse } from "../../contracts";
import {
  useVideoListQuery,
  useItemInfoQuery,
  useItemPictureQuery,
} from "../../lib/axios";

const TVShowPage = () => {
  const { tvShowId } = useParams();
  const tvShowDetails = useItemInfoQuery<GetTVShowDetailsResponse>(
    "/tv",
    tvShowId!
  );
  const TVShowImagesInfo = useItemPictureQuery("/tv", tvShowId!);
  const videoList = useVideoListQuery("/tv", tvShowId!);

  if (
    tvShowDetails.isLoading ||
    TVShowImagesInfo.isLoading ||
    videoList.isLoading
  )
    return <Loading />;

  return (
    <Container>
      <div className="mt-12 flex gap-x-16 flex-col-reverse lg:flex-row lg:items-center">
        {tvShowDetails.data?.poster_path ? (
          <img
            src={
              import.meta.env.VITE_APP_BASE_URL_PICTURES +
              "/w500/" +
              tvShowDetails.data?.poster_path
            }
            className="rounded-2xl shadow-md shadow-white max-w-[500px] mt-10 lg:mt-0"
          />
        ) : null}
        <div>
          <h1 className="w-fit border-b-2 font-ibarra text-5xl">
            {tvShowDetails.data!.name +
              " (" +
              tvShowDetails.data?.first_air_date.slice(0, 4) +
              ")"}
          </h1>
          <div className="mt-2 flex justify-between w-fit gap-x-7">
            <p className="text-slate-300">
              {tvShowDetails.data?.number_of_seasons} Season(s)
              {tvShowDetails.data?.in_production ? " (ongoing)" : " (finished)"}
            </p>
            <p>{tvShowDetails.data?.episode_run_time}m</p>
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="yellow"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <p>
                {tvShowDetails.data!.vote_average.toPrecision(2) +
                  " (" +
                  tvShowDetails.data?.vote_count +
                  ")"}
              </p>
            </div>
          </div>
          <h1 className="mt-20 text-2xl font-bold">Overview:</h1>
          <p className="mt-5 text-slate-400">{tvShowDetails.data!.overview}</p>
          <div className="flex flex-wrap">
            {tvShowDetails.data!.genres.map((genre) => (
              <span
                className="mt-10 mr-3 h-min rounded-xl bg-purple-500 p-1 text-center font-bold text-white"
                key={genre.id}
              >
                {genre.name}
              </span>
            ))}
          </div>
          <div>
            <h1 className="mt-20 mb-5 text-2xl font-bold">Production:</h1>
            {tvShowDetails.data?.production_companies
              .slice(0, 3)
              .map((company) => {
                return (
                  <p className="mb-1 text-lg text-slate-400" key={company.id}>
                    {company.name}
                  </p>
                );
              })}
          </div>
        </div>
      </div>
      <CastList ID={tvShowId!} path="/tv" />
      <MediaList media={TVShowImagesInfo.data!} videos={videoList.data!} />
      <SeasonList seasons={tvShowDetails.data!.seasons} />
    </Container>
  );
};

export default TVShowPage;
