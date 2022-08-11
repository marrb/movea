import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import { lazy, Suspense } from "react";

const MovieMainPage = lazy(() => import("./pages/Movies/MoviesMainPage"));
const TVShowsMainPage = lazy(() => import("./pages/TVShows/TvShowsMainPage"));
const MoviePage = lazy(() => import("./pages/Movies/MoviePage"));
const TVShowPage = lazy(() => import("./pages/TVShows/TVShowPage"));
const MovieSectionPage = lazy(() => import("./pages/Movies/MovieSectionPage"));
const TVShowSectionPage = lazy(
  () => import("./pages/TVShows/TVShowSectionPage")
);
const MoviesSearchPage = lazy(() => import("./pages/Movies/MoviesSearchPage"));
const TVShowsSearchPage = lazy(
  () => import("./pages/TVShows/TVShowsSearchPage")
);
const MovieFilteredPage = lazy(
  () => import("./pages/Movies/MovieFilteredPage")
);
const TVShowFilteredPage = lazy(
  () => import("./pages/TVShows/TVShowFilteredPage")
);

const App = () => {
  return (
    <Layout>
      <Suspense>
        <Routes>
          <Route path="/" element={<MovieMainPage />} />
          <Route path="/tv" element={<TVShowsMainPage />} />
          <Route path={"/movie/:movieId"} element={<MoviePage />} />
          <Route path="/tv/:tvShowId" element={<TVShowPage />} />
          <Route path="/movies/:section" element={<MovieSectionPage />} />
          <Route path="/tvs/:section" element={<TVShowSectionPage />} />
          <Route path="/movies/filtered" element={<MovieFilteredPage />} />
          <Route path="/tvs/filtered" element={<TVShowFilteredPage />} />
          <Route
            path="/search/movies/:searchQuery"
            element={<MoviesSearchPage />}
          />
          <Route
            path="/search/tvs/:searchQuery"
            element={<TVShowsSearchPage />}
          />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
