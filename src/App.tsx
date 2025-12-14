import React, { useState } from "react";
// import logo from './logo.svg';
import "./App.css";
import BookList from "./components/BookList";
import {
  ASC,
  Book,
  DESC,
  Filter,
  Sort,
  SORTBY_RATING,
  SORTBY_TITLE,
  Tag,
} from "./types";
import OptionsCard from "./components/OptionsCard";

function sortByTitle(a: Book, b: Book, direction: string): number {
  let dir = direction === ASC ? 1 : -1;
  if (a.title < b.title) return dir;
  if (a.title > b.title) return -dir;
  return 0;
}

function sortByRating(a: Book, b: Book, direction: string): number {
  let dir = direction === ASC ? 1 : -1;
  if (a.rating < b.rating) return dir;
  if (a.rating > b.rating) return -dir;
  return 0;
}

const DEFAULT_SORT: Array<Sort> = [
  { method: SORTBY_TITLE, direction: ASC, fnc: sortByTitle },
  { method: SORTBY_RATING, direction: ASC, fnc: sortByRating },
];

const DEFAULT_FILTER: Filter = {
  selectedTags: new Set<Tag>([
    "tech",
    "non-fiction",
    "fiction",
    "fantasy",
    "history",
    "self-help",
    "science",
  ]),
  ratingFilter: {},
};

//Should be any, but specific requirments prevent it
function moveSortToFrontByMethod(arr: Array<Sort>, value: string) {
  // 1. Find the index of the item
  // Use indexOf() for primitive types (strings, numbers)
  // Use findIndex() for objects or complex criteria
  const index = arr.findIndex((it) => it.method === value);

  // If the item is found (index is not -1)
  if (index !== -1) {
    // 2. Remove the item from its current position
    // splice(startIndex, deleteCount) removes elements and returns them in a new array
    const [removedItem] = arr.splice(index, 1);

    // 3. Add the removed item to the beginning of the array
    arr.unshift(removedItem);
  }
}

function App() {
  const [sortOrder, setSortOrder] = useState(DEFAULT_SORT);
  const [filters, setFilters] = useState(DEFAULT_FILTER);
  const [titleSearchValue, setTitleSearchValue] = useState("");
  const [authorSearchValue, setAuthorSearchValue] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  //a bit of code duplication here, can be optimized later
  function handleToggleTitleDirection() {
    let newSortOrder = [...sortOrder];
    moveSortToFrontByMethod(newSortOrder, SORTBY_TITLE);
    console.log(newSortOrder[0]);

    newSortOrder[0] = {
      ...newSortOrder[0],
      direction: newSortOrder[0].direction === ASC ? DESC : ASC,
    };
    setSortOrder(newSortOrder);
  }

  function handleToggleRatingDirection() {
    let newSortOrder = [...sortOrder];

    moveSortToFrontByMethod(newSortOrder, SORTBY_RATING);
    console.log(newSortOrder[0]);

    newSortOrder[0] = {
      ...newSortOrder[0],
      direction: newSortOrder[0].direction === ASC ? DESC : ASC,
    };
    setSortOrder(newSortOrder);
  }

  function handleToggleTagFilter(tag: Tag) {
    setFilters((prevFilters) => {
      // 1. Create a COPY of the Set
      const newTags = new Set(prevFilters.selectedTags);

      // 2. Modify the copy
      if (newTags.has(tag)) {
        newTags.delete(tag);
      } else {
        newTags.add(tag);
      }

      // 3. Return a NEW object containing the new Set
      return {
        ...prevFilters, // Copy other filter properties (like ratingFilter)
        selectedTags: newTags,
      };
    });
  }
  function handleSetMinRating(num: number | undefined) {
    if (num && filters.ratingFilter.max && num > filters.ratingFilter.max!) {
      num = undefined;
    }
    setFilters((prevFilters) => {
      // 1. Create a COPY of the Set
      const newRatingFilter = { ...prevFilters.ratingFilter };

      // 2. Modify the copy
      newRatingFilter.min = num;
      // 3. Return a NEW object containing the new Set
      return {
        ...prevFilters, // Copy other filter properties (like ratingFilter)
        ratingFilter: newRatingFilter,
      };
    });
  }
  function handleSetMaxRating(num: number | undefined) {
    if (num && filters.ratingFilter.max && num > filters.ratingFilter.min!) {
      num = undefined;
    }
    setFilters((prevFilters) => {
      // 1. Create a COPY of the Set
      const newRatingFilter = { ...prevFilters.ratingFilter };

      // 2. Modify the copy
      newRatingFilter.max = num;
      // 3. Return a NEW object containing the new Set
      return {
        ...prevFilters, // Copy other filter properties (like ratingFilter)
        ratingFilter: newRatingFilter,
      };
    });
  }
  function toggleShowFavoritesOnly() {
    setShowFavoritesOnly((prev) => !prev);
  }
  function resetTagFilters() {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        selectedTags: new Set<Tag>(DEFAULT_FILTER.selectedTags),
      };
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Library:</h1>

        <OptionsCard
          filters={filters}
          toggleTitleDir={handleToggleTitleDirection}
          toggleRatingDir={handleToggleRatingDirection}
          handleToggleTagFilter={handleToggleTagFilter}
          resetTagFilters={resetTagFilters}
          titleSearchValue={titleSearchValue}
          setTitleSearchValue={setTitleSearchValue}
          authorSearchValue={authorSearchValue}
          setAuthorSearchValue={setAuthorSearchValue}
          showFavoritesOnly={showFavoritesOnly}
          toggleShowFavoritesOnly={toggleShowFavoritesOnly}
          //TODO: Addmin max rating filter controls
          setMinRatingFilter={handleSetMinRating}
          setMaxRatingFilter={handleSetMaxRating}
        />

        <BookList
          filters={filters}
          sortOrder={sortOrder}
          titleSearchValue={titleSearchValue}
          authorSearchValue={authorSearchValue}
          showFavoritesOnly={showFavoritesOnly}
        />
      </header>

      <footer>
        <p>
          {JSON.stringify(sortOrder, (key, value) =>
            // If the value is a Set, convert it to an Array just for printing
            value instanceof Set ? "" : value
          )}
        </p>

        <div>
          {Array.from(filters.selectedTags).map((tag) => (
            <p key={tag}>{tag}</p> // Don't forget the 'key' prop!
          ))}
        </div>
      </footer>
    </div>
  );
}

export default App;
