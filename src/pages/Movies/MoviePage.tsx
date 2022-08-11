import { useParams } from "react-router-dom";
import Loading from "../../components/utils/Loading";
import CastList from "../../components/CastList";
import MediaList from "../../components/MediaList";
import Container from "../../components/utils/Container";
import { GetMovieInfoResponse } from "../../contracts";
import {
  useVideoListQuery,
  useItemPictureQuery,
  useItemInfoQuery,
} from "../../lib/axios";

const MoviePage = () => {
  const { movieId } = useParams();
  const movieInfo = useItemInfoQuery<GetMovieInfoResponse>("/movie", movieId!);
  const movieImageInfo = useItemPictureQuery("/movie", movieId!);
  const videoList = useVideoListQuery("/movie", movieId!);

  if (movieInfo.isLoading || movieImageInfo.isLoading || videoList.isLoading)
    return <Loading />;

  const release_date = new Date(movieInfo.data!.release_date);
  const runtime_hours = Math.floor(movieInfo.data!.runtime / 60);
  const runtime_minutes = movieInfo.data!.runtime - runtime_hours * 60;

  return (
    <Container>
      <div className="mt-12 flex gap-x-16 flex-col-reverse lg:flex-row lg:items-center">
        {movieInfo.data?.poster_path ? (
          <img
            src={
              import.meta.env.VITE_APP_BASE_URL_PICTURES +
              "/w500/" +
              movieInfo.data?.poster_path
            }
            className="rounded-2xl shadow-md shadow-white max-w-[500px] mt-10 lg:mt-0"
          />
        ) : null}
        <div>
          <h1 className="w-fit border-b-2 font-ibarra text-5xl">
            {movieInfo.data!.title + " (" + release_date.getFullYear() + ")"}
          </h1>
          <div className="mt-2 flex justify-between w-fit gap-x-7">
            <p className="text-lg">
              {("0" + release_date.getDate()).slice(-2) +
                "/" +
                ("0" + release_date.getMonth()).slice(-2) +
                "/" +
                release_date.getFullYear()}
            </p>
            <p>{runtime_hours + "h " + runtime_minutes + "m"}</p>
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
                {movieInfo.data!.vote_average.toPrecision(2) +
                  " (" +
                  movieInfo.data?.vote_count +
                  ")"}
              </p>
            </div>
          </div>
          <h2 className="mt-20 text-2xl font-bold">Overview:</h2>
          <p className="mt-5 text-slate-400">{movieInfo.data!.overview}</p>
          <div className="flex flex-wrap">
            {movieInfo.data!.genres.map((genre) => (
              <span
                className="mt-10 mr-3 h-min rounded-xl bg-purple-500 p-1 text-center font-bold text-white"
                key={genre.id}
              >
                {genre.name}
              </span>
            ))}
          </div>
          <section>
            <h2 className="mt-20 mb-5 text-2xl font-bold">Production:</h2>
            {movieInfo.data?.production_companies.map((company) => {
              return (
                <p className="mb-1 text-lg text-slate-400" key={company.id}>
                  {company.name}
                </p>
              );
            })}
          </section>
        </div>
      </div>
      <CastList ID={movieId!} path="/movie" />

      <MediaList media={movieImageInfo.data!} videos={videoList.data!} />
    </Container>
  );
};

export default MoviePage;
