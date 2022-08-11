export interface TVShow {
  poster_path: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

export interface GetTVShowListResponse {
  page: number;
  results: TVShow[];
  total_results: number;
  total_pages: number;
}

export interface TVShowCreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface TVShowGenres {
  id: number;
  name: string;
}

export interface TVShowLastAiredEpisode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface TVShowNetwork {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}

export interface TVShowProdCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface TVShowProdCountry {
  iso_3166_1: string;
  name: string;
}

export interface TVShowSeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface TVShowSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface GetTVShowDetailsResponse {
  backdrop_path: string;
  created_by: TVShowCreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: TVShowGenres[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: TVShowLastAiredEpisode;
  name: string;
  next_episode_to_air: null;
  networks: TVShowNetwork[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TVShowProdCompany[];
  production_countries: TVShowProdCountry[];
  seasons: TVShowSeason[];
  spoken_languages: TVShowSpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}
