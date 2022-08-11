import { useLocation } from "react-router-dom";
import { useFilteredResultsQuery } from "../../lib/axios";
import { GetMovieListResponse } from "../../contracts";
import { setupScrollListener } from "../../components/utils/setupScrollListener";
import Loading from "../../components/utils/Loading";
import InfiniteCardList from "../../components/InfiniteCardList";

interface LocationState {
  state: {
    year: string;
    genre_ids: string;
    rating: string;
  };
}

const MovieFilteredPage = () => {
  const location = useLocation();
  const { state } = location as LocationState;
  const movies = useFilteredResultsQuery<GetMovieListResponse>(
    state.year,
    state.genre_ids,
    state.rating,
    "/movie"
  );

  setupScrollListener(movies.fetchNextPage);

  if (movies.isLoading) return <Loading />;

  return (
    <InfiniteCardList
      data={movies
        .data!.pages.map((page) =>
          page.results.map((item) => {
            return {
              id: item.id,
              genre_ids: item.genre_ids,
              title: item.title,
              path: "/movie",
              vote_average: item.vote_average,
              release_date: item.release_date,
            };
          })
        )
        .flat()}
      query={{
        isFetched: movies.isFetched,
        isFetching: movies.isFetching,
        isSuccess: movies.isSuccess,
        isFetchingNextPage: movies.isFetchingNextPage,
        hasNextPage: movies.hasNextPage,
      }}
      total_pages={movies.data?.pages[0].total_pages}
    />
  );
};

export default MovieFilteredPage;
