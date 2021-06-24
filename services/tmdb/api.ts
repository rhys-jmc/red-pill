import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  Movie,
  MovieCredits,
  Person,
  ProviderData,
  MovieListData,
  SearchMultiData,
} from "./types";

const API_KEY_PARAM = "api_key=93207ffdf071b0847af9ba79c55bdd29";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    discoverMovies: builder.query<MovieListData, undefined>({
      query: () => `discover/movie?${API_KEY_PARAM}`,
    }),
    getMovie: builder.query<Movie, number>({
      query: (movieId) => `movie/${movieId}?${API_KEY_PARAM}`,
    }),

    getMovieProviders: builder.query<ProviderData, number>({
      query: (movieId) => `movie/${movieId}/watch/providers?${API_KEY_PARAM}`,
    }),

    getPerson: builder.query<Person, number>({
      query: (personId) => `person/${personId}?${API_KEY_PARAM}`,
    }),

    getPersonMovieCredits: builder.query<MovieCredits, number>({
      query: (personId) => `person/${personId}/movie_credits?${API_KEY_PARAM}`,
    }),

    searchMovies: builder.query<MovieListData, string>({
      query: (query) =>
        `search/movie?query=${encodeURIComponent(query)}&${API_KEY_PARAM}`,
    }),

    searchMulti: builder.query<SearchMultiData, string>({
      query: (query) =>
        `search/multi?query=${encodeURIComponent(query)}&${API_KEY_PARAM}`,
    }),
  }),
});

const { endpoints } = tmdbApi;

export const useDiscoverMovies = endpoints.discoverMovies.useQuery;
export const useGetMovie = endpoints.getMovie.useQuery;
export const useGetMovieProviders = endpoints.getMovieProviders.useQuery;
export const useGetPerson = endpoints.getPerson.useQuery;
export const useGetPersonMovieCredits =
  endpoints.getPersonMovieCredits.useQuery;
export const useSearchMovies = endpoints.searchMovies.useQuery;
export const useSearchMulti = endpoints.searchMulti.useQuery;
