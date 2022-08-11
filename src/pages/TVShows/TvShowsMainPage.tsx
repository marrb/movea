import { useItemListQuery } from "../../lib/axios";
import Section from "../../components/Section";
import { GetTVShowListResponse } from "../../contracts";
import Container from "../../components/utils/Container";
import Loading from "../../components/utils/Loading";

const TvShowsMainPage = () => {
  const popular_TVshows =
    useItemListQuery<GetTVShowListResponse>("/tv/popular");
  const airing_TVshows =
    useItemListQuery<GetTVShowListResponse>("/tv/on_the_air");
  const topRated_TVshows =
    useItemListQuery<GetTVShowListResponse>("/tv/top_rated");

  if (
    popular_TVshows.isLoading ||
    airing_TVshows.isLoading ||
    topRated_TVshows.isLoading
  )
    return <Loading />;

  return (
    <Container>
      <Section
        Section_Title="Popular TV Shows"
        data={popular_TVshows.data!.pages[0].results.map((item) => {
          return {
            id: item.id.toString(),
            genre_ids: item.genre_ids,
            title: item.name,
            vote_average: item.vote_average,
            release_date: item.first_air_date,
          };
        })}
        fetch_title="popular"
        path="/tv"
      />
      <Section
        Section_Title="Airing TV Shows"
        data={airing_TVshows.data!.pages[0].results.map((item) => {
          return {
            id: item.id.toString(),
            genre_ids: item.genre_ids,
            title: item.name,
            vote_average: item.vote_average,
            release_date: item.first_air_date,
          };
        })}
        fetch_title="on_the_air"
        path="/tv"
      />
      <Section
        Section_Title="Top Rated TV Shows"
        data={topRated_TVshows.data!.pages[0].results.map((item) => {
          return {
            id: item.id.toString(),
            genre_ids: item.genre_ids,
            title: item.name,
            vote_average: item.vote_average,
            release_date: item.first_air_date,
          };
        })}
        fetch_title="top_rated"
        path="/tv"
      />
    </Container>
  );
};

export default TvShowsMainPage;
