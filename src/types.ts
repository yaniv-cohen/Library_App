export type Tag =
  | "tech"
  | "non-fiction"
  | "fiction"
  | "fantasy"
  | "history"
  | "self-help"
  | "science";

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  rating: number; // 0–5
  tags: Tag[];
  description: string;
}

//CONSTANTS
export const ASC = "asc";
export const DESC = "desc";
export type Directions = typeof ASC | typeof DESC;

export const SORTBY_TITLE = "title";
export const SORTBY_RATING = "rating";
export type SortMethod = typeof SORTBY_TITLE | typeof SORTBY_RATING;

export type SortOption =
  | "title-asc"
  | "title-desc"
  | "rating-asc"
  | "rating-desc";

export interface Sort {
  method: SortMethod;
  direction: Directions;
  fnc: (a: Book, b: Book, direction: string) => number;
}

export interface RatingFilter {
  min: number;
  max: number;
  fnc: (
    num: number,
    minMax: { min: number | undefined; max: number | undefined },
  ) => boolean;
}

export interface TagFilter {
  selectedTags: Set<Tag>;
  fnc: (tag: Tag[], selectedTags: Set<Tag>) => boolean;
}

export interface Filter {
  tagFilter: TagFilter;
  ratingFilter: RatingFilter;
}

export type PageState = {
  currentPage: number;
  itemsPerPage: number;
};
