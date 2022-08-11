import { useItemListQuery } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { GetMovieListResponse } from "../../contracts";
import InfiniteCardList from "../../components/InfiniteCardList";
import { setupScrollListener } from "../../components/utils/setupScrollListener";
import Loading from "../../components/utils/Loading";

const MovieSectionPage = () => {
  const { section } = useParams();
  const movies = useItemListQuery<GetMovieListResponse>("/movie/" + section);

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

export default MovieSectionPage;
