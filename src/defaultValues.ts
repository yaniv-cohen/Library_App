import {
  ASC,
  Book,
  Filter,
  RatingFilter,
  Sort,
  SORTBY_RATING,
  SORTBY_TITLE,
  Tag,
  TagFilter,
} from "./types";

export const SEARCH_DELAY = 400;

export function sortByTitle(a: Book, b: Book, direction: string): number {
  let dir = direction === ASC ? -1 : 1;
  if (a.title < b.title) return dir;
  if (a.title > b.title) return -dir;
  return 0;
}

export function sortByRating(a: Book, b: Book, direction: string): number {
  let dir = direction === ASC ? 1 : -1;
  if (a.rating < b.rating) return -dir;
  if (a.rating > b.rating) return dir;
  return 0;
}

export const DEFAULT_SORT: Array<Sort> = [
  { method: SORTBY_TITLE, direction: ASC, fnc: sortByTitle },
  { method: SORTBY_RATING, direction: ASC, fnc: sortByRating },
];

export const DEFAULT_RATING_FILTER: RatingFilter = {
  min: 0,
  max: 5,
  fnc: (num: number, { min, max }) => {
    // console.log(" filtering rating:", num, "min:", min, " max:", max);
    if (min !== undefined && num < min) return false;
    if (max !== undefined && num > max) return false;
    return true;
  },
};
export const DEFAULT_TAG_FILTER: TagFilter = {
  selectedTags: new Set<Tag>([
    "tech",
    "non-fiction",
    "fiction",
    "fantasy",
    "history",
    "self-help",
    "science",
  ]),
  fnc: (tag: Tag[], selectedTags: Set<Tag>) => {
    if (selectedTags.size === 0) {
      return true;
    }
    for (let t of tag) {
      if (selectedTags.has(t)) {
        return true;
      }
    }
    return false;
  },
};

export const DEFAULT_FILTER: Filter = {
  tagFilter: DEFAULT_TAG_FILTER,
  ratingFilter: DEFAULT_RATING_FILTER,
};
