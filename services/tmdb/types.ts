type BaseMovie = {
  readonly adult: boolean;
  readonly backdrop_path: string | null;
  readonly id: number;
  readonly original_language: string;
  readonly original_title: string;
  readonly overview: string;
  readonly popularity: number;
  readonly poster_path: string | null;
  readonly release_date: string | undefined;
  readonly title: string;
  readonly video: boolean;
  readonly vote_average: number;
  readonly vote_count: number;
};

export type SearchMovieResult = BaseMovie & {
  readonly genre_ids: readonly number[];
};

type ResultsData<T> = {
  readonly page: number;
  readonly results: readonly T[];
  readonly total_results: number;
  readonly total_pages: number;
};

export type Movie = BaseMovie & {
  readonly belongs_to_collection: Record<string, unknown> | null;
  readonly budget: number;
  readonly genres: readonly { readonly id: number; readonly name: string }[];
  readonly homepage: string | null;
  readonly imdb_id: string | null;
  readonly production_companies: readonly {
    readonly name: string;
    readonly id: number;
    readonly logo_path: string | null;
    readonly origin_country: string;
  }[];
  readonly production_countries: readonly {
    readonly iso_3166_1: string;
    readonly name: string;
  }[];
  readonly revenue: number;
  readonly runtime: number | null;
  readonly spoken_languages: readonly { readonly name: string }[];
  readonly status:
    | "Rumoured"
    | "Planned"
    | "In Production"
    | "Post Production"
    | "Released"
    | "Cancelled";
  readonly tagline: string | null;
};

export type SearchMultiMovieResult = SearchMovieResult & {
  readonly media_type: "movie";
};

type SearchMultiTvResult = Pick<
  SearchMovieResult,
  | "poster_path"
  | "popularity"
  | "id"
  | "overview"
  | "backdrop_path"
  | "vote_average"
  | "genre_ids"
  | "original_language"
  | "vote_count"
> & {
  readonly media_type: "tv";
  readonly first_air_date: string;
  readonly origin_country: readonly string[];
  readonly name: string;
  readonly original_name: string;
};

export type SearchMultiPersonResult = {
  readonly profile_path: string | null;
  readonly adult: boolean;
  readonly id: number;
  readonly media_type: "person";
  readonly name: string;
  readonly popularity: string;
  readonly known_for: readonly (SearchMultiMovieResult | SearchMultiTvResult)[];
};

export type SearchMultiResult =
  | SearchMultiMovieResult
  | SearchMultiTvResult
  | SearchMultiPersonResult;

export type SearchMovieData = ResultsData<SearchMovieResult>;
export type SearchMultiData = ResultsData<SearchMultiResult>;

type Cast = SearchMovieResult & {
  readonly character: string;
  readonly credit_id: string;
};

type Crew = SearchMovieResult & {
  readonly department: string;
  readonly job: string;
  readonly credit_id: string;
};

export type MovieCredits = {
  readonly id: number;
  readonly cast: readonly Cast[];
  readonly crew: readonly Crew[];
};

export type Person = {
  readonly birthday: string | null;
  readonly known_for_department: string;
  readonly deathday: string | null;
  readonly id: number;
  readonly name: string;
  readonly also_known_as: readonly string[];
  readonly gender: 0 | 1 | 2 | 3;
  readonly biography: string;
  readonly popularity: number;
  readonly place_of_birth: string | null;
  readonly profile_path: string;
  readonly adult: boolean;
  readonly imdb_id: string;
  readonly homepage: string | null;
};
