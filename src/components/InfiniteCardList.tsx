import NTL from "./utils/NTL";
import Loading from "./utils/Loading";
import Card from "./Card/Card";
import { isTouchDevice } from "./utils/isTouchDevice";
import Container from "./utils/Container";

interface CardListProps {
  query: {
    isFetched: boolean;
    isSuccess: boolean;
    isFetching: boolean;
    isFetchingNextPage: boolean;
    hasNextPage?: boolean;
  };
  total_pages?: number;
  data: {
    id: number;
    path: string;
    genre_ids: number[];
    title: string;
    vote_average: number;
    release_date: string;
  }[];
}

const InfiniteCardList: React.FC<CardListProps> = ({
  query,
  data,
  total_pages,
}) => {
  const touchActive = isTouchDevice();

  return (
    <Container>
      <div
        className={
          "flex w-full overflow-x-auto snap-x gap-x-8 flex-wrap place-content-center"
        }
      >
        {query.isFetched &&
          query.isSuccess &&
          data.map((item, idx) => {
            return (
              <Card
                key={idx}
                id={item.id.toString()}
                isTouchDevice={touchActive}
                path={item.path}
                genre_ids={item.genre_ids}
                title={item.title}
                vote_average={item.vote_average}
                release_date={item.release_date}
              />
            );
          })}
      </div>
      {(query.isFetching || query.isFetchingNextPage) && query.hasNextPage && (
        <Loading />
      )}
      {total_pages === 0 && <NTL />}
    </Container>
  );
};

export default InfiniteCardList;
