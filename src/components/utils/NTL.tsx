import { InformationCircleIcon } from "@heroicons/react/solid";

const NTL = () => {
  return (
    <div className="w-full flex place-content-center items-center text-slate-400 text-2xl mt-52">
      <InformationCircleIcon className="h-8 w-8" />
      <p>Nothing to Load!</p>
    </div>
  );
};

export default NTL;
