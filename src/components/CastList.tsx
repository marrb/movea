import Loading from "./utils/Loading";
import unknown_male from "../img/unknown_male.png";
import { useCastListQuery } from "../lib/axios";
import { GetCastList } from "../contracts";
import unknown_female from "../img/unknown_female.jpg";

interface CastListProps {
  path: string;
  ID: string;
}

const CastList: React.FC<CastListProps> = ({ ID, path }) => {
  const movieCast = useCastListQuery<GetCastList>(path, ID);

  if (movieCast.isLoading) {
    return (
      <div className=" mt-52 flex place-content-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="my-24">
      <h1 className="mb-5 text-2xl font-bold ">Leading Cast:</h1>
      <div className="mb-11 flex gap-5 overflow-x-auto">
        {movieCast.data?.cast.slice(0, 10).map((castMember) => {
          const image_path = castMember.profile_path
            ? import.meta.env.VITE_APP_BASE_URL_PICTURES +
              "/original/" +
              castMember.profile_path
            : castMember.gender === 1
            ? unknown_female
            : unknown_male;
          return (
            <div
              className="mb-5 w-40 rounded-xl bg-side-black text-center text-black flex flex-wrap"
              key={castMember.id}
            >
              <div
                className="h-52 w-40 shrink-0 grow-0 rounded-xl bg-cover bg-center"
                style={{ backgroundImage: "url(" + image_path + ")" }}
              />
              <div className="mx-auto ">
                <p className="mx-1 mt-1 text-lg font-bold text-white">
                  {castMember.name}
                </p>
                <p className="mx-1 mb-2 text-slate-300">
                  {castMember.character}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CastList;
