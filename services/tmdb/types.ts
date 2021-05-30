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

export type SearchMovieData = {
  readonly page: number;
  readonly results: readonly SearchMovieResult[];
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
