import { useState } from "react";
import "./App.css";
import BookList from "./components/BookList";
import { Tag } from "./types";
import OptionsCard from "./components/OptionsCard";
import {
  DEFAULT_FILTER,
  DEFAULT_FILTER_MODEL,
  DEFAULT_TAG_FILTER,
} from "./defaultValues";
import { GridFilterModel } from "@mui/x-data-grid";
import { LibraryAppHeader } from "./components/LibraryHeader";
import { Footer } from "./components/Footer";

function App() {
  // const [sortOrder, setSortOrder] = useState(DEFAULT_SORT);
  const [filters, setFilters] = useState(DEFAULT_FILTER);
  const [titleSearchValue, setTitleSearchValue] = useState("");
  const [authorSearchValue, setAuthorSearchValue] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [allowAdvancedFiltering, setAllowAdvancedFiltering] = useState(false);
  const [filterModel, setFilterModel] =
    useState<GridFilterModel>(DEFAULT_FILTER_MODEL);

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
