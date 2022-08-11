import { axiosInstance } from "../services/axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  GetPicturesResponse,
  genre,
  GetVideoListResponse,
  GetTVShowListResponse,
} from "../contracts";
import { List } from "lodash";

const getItemListInf = async <ListType>(
  path: string,
  pageParam: number = 1
): Promise<ListType> => {
  const resp = await axiosInstance.get(path, {
    params: {
      page: pageParam,
    },
  });

  const data = resp.data;
  return data;
};

const getItemPictures = async (
  path: string,
  id: string
): Promise<GetPicturesResponse> => {
  const resp = await axiosInstance.get(path + "/" + id + "/images");

  const data = resp.data;
  return data;
};

const getGenreList = async (path: string): Promise<genre[]> => {
  const resp = await axiosInstance.get("/genre" + path + "/list");
  const data = resp.data.genres;

  return data;
};

const getVideoList = async (
  path: string,
  id: string
): Promise<GetVideoListResponse> => {
  const resp = await axiosInstance.get(path + "/" + id + "/videos", {
    params: {
      language: "en-US",
    },
  });

  const data = resp.data;

  return data;
};

const getItemInfo = async <ItemType>(
  path: string,
  movieId: string
): Promise<ItemType> => {
  const resp = await axiosInstance.get(path + "/" + movieId);
  const data = resp.data;

  return data;
};

const getCastList = async <CastType>(
  path: string,
  id: string
): Promise<CastType> => {
  const resp = await axiosInstance.get(path + "/" + id + "/credits");
  const data = resp.data;

  return data;
};

const getSearchResults = async <ListType>(
  pageParam: number = 1,
  query: string,
  path: string
): Promise<ListType> => {
  const resp = await axiosInstance.get("/search" + path, {
    params: {
      query: query,
      page: pageParam,
    },
  });

  const data = resp.data;
  return data;
};

const getFilteredResults = async <ListType>(
  year: string = "",
  genre_ids: string,
  rating: string,
  path: string,
  pageParam: number = 1
): Promise<ListType> => {
  const minimum_date = year === "" ? "" : year + "-01-01";

  const resp = await axiosInstance.get("/discover" + path, {
    params: {
      "primary_release_date.gte": minimum_date,
      with_genres: genre_ids,
      "vote_average.gte": rating,
      page: pageParam,
    },
  });

  const data = resp.data;
  return data;
};

export const useItemListQuery = <
  ListType extends { page: number; total_pages: number }
>(
  path: string
) =>
  useInfiniteQuery(
    [path],
    ({ pageParam = 1 }) => getItemListInf<ListType>(path, pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
        return false;
      },
    }
  );

export const useItemPictureQuery = (path: string, id: string) =>
  useQuery([path + "/pictures/" + id], () => getItemPictures(path, id));

export const useGenreListQuery = (path: string) =>
  useQuery([path + "/genres"], () => getGenreList(path), {
    cacheTime: Infinity,
  });

export const useVideoListQuery = (path: string, id: string) =>
  useQuery(["video_list" + path + "/" + id], () => getVideoList(path, id));

export const useItemInfoQuery = <ListType>(path: string, id: string) =>
  useQuery(["info" + path + "/" + id], () => getItemInfo<ListType>(path, id));

export const useCastListQuery = <CastType>(path: string, id: string) =>
  useQuery(["cast_list" + path + "/" + id], () =>
    getCastList<CastType>(path, id)
  );

export const useSearchResultsQuery = <
  ListType extends { page: number; total_pages: number }
>(
  query: string,
  path: string
) =>
  useInfiniteQuery(
    [path + "/" + query],
    ({ pageParam = 1 }) => getSearchResults<ListType>(pageParam, query, path),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
        return false;
      },
    }
  );

export const useFilteredResultsQuery = <
  ListType extends { page: number; total_pages: number }
>(
  year: string = "",
  genre_ids: string,
  rating: string,
  path: string
) =>
  useInfiniteQuery(
    [path + "&filter&" + year + "&" + genre_ids + "&" + rating],
    ({ pageParam = 1 }) =>
      getFilteredResults<ListType>(year, genre_ids, rating, path, pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
        return false;
      },
    }
  );
