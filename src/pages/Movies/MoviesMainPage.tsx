import Loading from "../../components/utils/Loading";
import Container from "../../components/utils/Container";
import { useItemListQuery } from "../../lib/axios";
import { GetMovieListResponse } from "../../contracts";
import Section from "../../components/Section";

const MoviesPage = () => {
  const popularMoviesQuery =
    useItemListQuery<GetMovieListResponse>("/movie/popular");

  const newMoviesQuery =
    useItemListQuery<GetMovieListResponse>("/movie/now_playing");

  const upcomingMoviesQuery =
    useItemListQuery<GetMovieListResponse>("/movie/top_rated");

  if (
    popularMoviesQuery.isLoading ||
    newMoviesQuery.isLoading ||
    upcomingMoviesQuery.isLoading
  ) {
    return <Loading />;
  }

  return (
    <Container>
      <Section
        Section_Title="Popular Movies"
        data={popularMoviesQuery.data!.pages[0].results.map((item) => {
          return {
            id: item.id.toString(),
            genre_ids: item.genre_ids,
            title: item.title,
            vote_average: item.vote_average,
            release_date: item.release_date,
          };
        })}
        fetch_title="popular"
        path="/movie"
      />
      <Section
        Section_Title="New Releases"
        data={newMoviesQuery.data!.pages[0].results.map((item) => {
          return {
            id: item.id.toString(),
            genre_ids: item.genre_ids,
            title: item.title,
            vote_average: item.vote_average,
            release_date: item.release_date,
          };
        })}
        fetch_title="now_playing"
        path="/movie"
      />
      <Section
        Section_Title="Top Rated Movies"
        data={upcomingMoviesQuery.data!.pages[0].results.map((item) => {
          return {
            id: item.id.toString(),
            genre_ids: item.genre_ids,
            title: item.title,
            vote_average: item.vote_average,
            release_date: item.release_date,
          };
        })}
        fetch_title="top_rated"
        path="/movie"
      />
    </Container>
  );
};

export default MoviesPage;
