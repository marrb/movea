import { useLocation } from "react-router-dom";
import { useFilteredResultsQuery } from "../../lib/axios";
import { GetTVShowListResponse } from "../../contracts";
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

const TVShowFilteredPage = () => {
  const location = useLocation();
  const { state } = location as LocationState;

  const tvshows = useFilteredResultsQuery<GetTVShowListResponse>(
    state.year,
    state.genre_ids,
    state.rating,
    "/tv"
  );

  setupScrollListener(tvshows.fetchNextPage);

  if (tvshows.isLoading) return <Loading />;

  return (
    <InfiniteCardList
      data={tvshows
        .data!.pages.map((page) =>
          page.results.map((item) => {
            return {
              id: item.id,
              genre_ids: item.genre_ids,
              title: item.name,
              path: "/tv",
              vote_average: item.vote_average,
              release_date: item.first_air_date,
            };
          })
        )
        .flat()}
      query={{
        isFetched: tvshows.isFetched,
        isFetching: tvshows.isFetching,
        isSuccess: tvshows.isSuccess,
        isFetchingNextPage: tvshows.isFetchingNextPage,
        hasNextPage: tvshows.hasNextPage,
      }}
      total_pages={tvshows.data?.pages[0].total_pages}
    />
  );
};

export default TVShowFilteredPage;
