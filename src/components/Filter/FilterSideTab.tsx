import { useState } from "react";
import { ArrowSmRightIcon } from "@heroicons/react/solid";
import CustomSelect from "./CustomSelect";
import GenrePicker from "./GenrePicker";
import { useGenreListQuery } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import * as Yup from 'yup';

const FilterSideTab = () => {
  const [filterState, setFilterState] = useState(false);
  const selectOptions = ["Movies", "TV Shows"];
  const [selectState, setSelectState] = useState(selectOptions[0]);
  const [chosenGenres, setChosenGenres] = useState(Array<{name: string, id: number}>);

  const navigate = useNavigate()

  const movie_genres = useGenreListQuery("/movie");
  const tv_genres = useGenreListQuery("/tv");

  const SubmitHandler = (values: {
    year: string;
    min_rating: string;
  }) => {
    const year = values.year
    const rating = values.min_rating
    const path = selectState === "Movies" ? "/movies" : "/tvs"
    const genre_ids = chosenGenres.map(genre => genre.id).toString()

    navigate(path + "/filtered", {
      state: {year: year, genre_ids: genre_ids, rating: rating}, replace: true
    })
  }

  const validation_schema = Yup.object().shape({
    year: Yup.number()
      .positive("Year must be a positive value!")
      .min(1000, "Invalid year format!")
      .max(new Date().getFullYear() + 100, "Invalid year format!"),
    min_rating: Yup.number()
      .positive("Rating must be a positive value!")
      .min(0, "Rating value cannot be negative!")
      .max(10, "Rating value is too big!")
      .test('max_digits', "Invalid rating format!" , (min_rating) => min_rating ? /^\d(.\d)*$/.test(min_rating!.toString()) : true),
  })

  if (movie_genres.isLoading || tv_genres.isLoading) return <div />;

  return (
    <div
      className={
        "bg-side-black fixed left-0 z-20 rounded-r-xl duration-500 w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 " +
        (filterState ? "max-w-6xl py-6" : "max-w-0")
      }
    >
      <ArrowSmRightIcon
        className={
          "w-8 h-8 absolute top-3 transition-[right,transform] duration-500 text-black bg-purple-500 rounded-full cursor-pointer " +
          (filterState ? "rotate-180 -right-3" : "-right-8")
        }
        onClick={() => setFilterState(!filterState)}
      />
      <div className=" overflow-hidden whitespace-nowrap">
        <h1 className="text-xl font-bold mb-5 mx-4 ">Filter</h1>
        <div className="max-h-[70vh] overflow-y-auto overflow-x-hidden">
          <Formik initialValues={{year: "", min_rating: ""}} onSubmit={(values) =>  {SubmitHandler(values)}} validationSchema={validation_schema}>
            {({errors, touched}) => (
            <Form className="flex flex-col gap-y-4 mx-4 overflow-x-hidden">
              <div>
                <h1 className="mb-1 font-bold text-slate-400">*Searching for:</h1>
                <CustomSelect
                  selectState={selectState}
                  selectOptions={selectOptions}
                  setSelectState={setSelectState}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="year" className="font-bold text-slate-400 mb-1">
                  Minimum release date year:
                </label>
                <Field
                  type="number"
                  name="year"
                  className={"bg-deep-black pl-2 py-1 rounded-lg w-full outline-none caret-white " + (errors.year && touched.year ? "border-red-500 border-2" : "")}
                  placeholder="YYYY"
                />
                {errors.year && touched.year ? (
                  <div className="text-red-500">{errors.year}</div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label htmlFor="min_rating" className="font-bold text-slate-400 mb-1">
                  Minimum rating:
                </label>
                <Field
                  type="number"
                  name="min_rating"
                  className={"bg-deep-black pl-2 py-1 rounded-lg w-full outline-none caret-white " + (errors.min_rating && touched.min_rating ? "border-red-500 border-2" : "")}
                  placeholder="eg. 8.5, 8"
                />
                {errors.min_rating && touched.min_rating ? (
                  <div className="text-red-500">{errors.min_rating}</div>
                ) : null}
              </div>
              <div className="overflow-y-auto overflow-x-hidden">
                <h1 className="mb-1 font-bold text-slate-400">Genres:</h1>
                <GenrePicker
                  genres={
                    selectState === "Movies"
                      ? movie_genres.data!
                      : tv_genres.data!
                  }
                  selectState={selectState}
                  setChosenGenres={setChosenGenres}
                  chosenGenres={chosenGenres}
                />
              </div>
              <button className="bg-green-700 w-fit mx-auto rounded-lg p-1 font-bold hover:bg-green-500 duration-200 text-black" type="submit">
                Apply Filter
              </button>
            </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default FilterSideTab;
