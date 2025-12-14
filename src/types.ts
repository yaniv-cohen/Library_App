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

type TagFilter = {
  tag: Tag;
  enabled: boolean;
};

type RatingFilter = {
  min?: number;
  max?: number;
};

export interface Filter {
  selectedTags: Set<Tag>;
  ratingFilter: RatingFilter;
}
