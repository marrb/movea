import { useParams } from "react-router-dom";
import { useItemListQuery } from "../../lib/axios";
import { GetTVShowListResponse } from "../../contracts";
import { setupScrollListener } from "../../components/utils/setupScrollListener";
import Loading from "../../components/utils/Loading";
import InfiniteCardList from "../../components/InfiniteCardList";

const TVShowSectionPage = () => {
  const { section } = useParams();
  const tvshows = useItemListQuery<GetTVShowListResponse>("/tv/" + section);

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

export default TVShowSectionPage;
