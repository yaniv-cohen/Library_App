import { useState } from "react";
// import logo from './logo.svg';
import "./App.css";
import BookList from "./components/BookList";
import { ASC, DESC, Sort, SORTBY_RATING, SORTBY_TITLE, Tag } from "./types";
import OptionsCard from "./components/OptionsCard";
import {
  DEFAULT_FILTER,
  DEFAULT_FILTER_MODEL,
  DEFAULT_SORT,
  DEFAULT_TAG_FILTER,
} from "./defaultValues";
import { GridFilterModel } from "@mui/x-data-grid";
import { LibraryAppHeader } from "./components/LibraryHeader";
import { BottomNavigation, Box } from "@mui/material";
import { Footer } from "./components/Footer";

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
  const [allowAdvancedFiltering, setAllowAdvancedFiltering] = useState(false);
  const [filterModel, setFilterModel] =
    useState<GridFilterModel>(DEFAULT_FILTER_MODEL);
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
      // 1. Create a COPY of the Filter
      const currentSelectedTags = prevFilters.tagFilter.selectedTags;
      const newTags = new Set(currentSelectedTags);

      if (newTags.size == 1 && newTags.has(tag)) {
        //if no tags selected, select all first
        return {
          ...prevFilters, // Copy other filter properties (like ratingFilter)
          tagFilter: {
            ...prevFilters.tagFilter,
            selectedTags: new Set(DEFAULT_TAG_FILTER.selectedTags),
          },
        };
      }
      if (newTags.has(tag)) {
        // 2. Modify the copy
        newTags.delete(tag);
      } else {
        newTags.add(tag);
      }

      return {
        ...prevFilters,
        tagFilter: {
          ...prevFilters.tagFilter,
          selectedTags: newTags, // Return the new Set
        },
      };
    });
  }
  function handleSetMinRating(num: number) {
    let newMin = num;
    let newMax = filters.ratingFilter.max;
    if (num > filters.ratingFilter.max) {
      return;
      //either switch or ignore
      newMin = filters.ratingFilter.max;
      newMax = num;
    }
    setFilters((prevFilters) => {
      // Create a COPY of the Set
      const newRatingFilter = {
        ...prevFilters.ratingFilter,
        min: newMin,
        max: newMax,
      };

      // Return a NEW object containing the new Set
      return {
        ...prevFilters, // Copy other filter properties (like ratingFilter)
        ratingFilter: newRatingFilter,
      };
    });
  }
  function handleSetMaxRating(num: number) {
    let newMin = filters.ratingFilter.min;
    let newMax = num;
    if (num && filters.ratingFilter.min && num < filters.ratingFilter.min) {
      return;
      newMin = num;
      newMax = filters.ratingFilter.min;
    }
    setFilters((prevFilters) => {
      // Create a COPY of the Set
      const newRatingFilter = {
        ...prevFilters.ratingFilter,
        min: newMin,
        max: newMax,
      };
      // Return a NEW object containing the new Set
      return {
        ...prevFilters, // Copy other filter properties (like ratingFilter)
        ratingFilter: newRatingFilter,
      };
    });
  }
  function toggleShowFavoritesOnly() {
    setShowFavoritesOnly((prev) => !prev);
  }
  function resetFilters() {
    setFilters(DEFAULT_FILTER);
  }

  return (
    <div className="App">
      <LibraryAppHeader
        allowAdvancedFiltering={allowAdvancedFiltering}
        toggleAllowAdvancedFiltering={() => {
          setAllowAdvancedFiltering(!allowAdvancedFiltering);
        }}
      ></LibraryAppHeader>
      <OptionsCard
        filters={filters}
        toggleTitleDir={handleToggleTitleDirection}
        toggleRatingDir={handleToggleRatingDirection}
        handleToggleTagFilter={handleToggleTagFilter}
        // resetTagFilters={resetTagFilters}
        resetFilters={resetFilters}
        titleSearchValue={titleSearchValue}
        setTitleSearchValue={setTitleSearchValue}
        authorSearchValue={authorSearchValue}
        setAuthorSearchValue={setAuthorSearchValue}
        showFavoritesOnly={showFavoritesOnly}
        toggleShowFavoritesOnly={toggleShowFavoritesOnly}
        //TODO: Addmin max rating filter controls
        setMinRatingFilter={handleSetMinRating}
        setMaxRatingFilter={handleSetMaxRating}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
      />
      <main>
        <BookList
          filters={filters}
          sortOrder={sortOrder}
          titleSearchValue={titleSearchValue}
          authorSearchValue={authorSearchValue}
          showFavoritesOnly={showFavoritesOnly}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          allowAdvancedFiltering={allowAdvancedFiltering}
        >
          {/* <SortBar
            toggleTitleDir={handleToggleTitleDirection}
            toggleRatingDir={handleToggleRatingDirection}
            authorSearchValue={authorSearchValue}
            setAuthorSearchValue={setAuthorSearchValue}
            titleSearchValue={titleSearchValue}
            setTitleSearchValue={setTitleSearchValue}
            sortOrder={sortOrder}
          /> */}
        </BookList>
      </main>
      <Footer />
    </div>
  );
}

export default App;
