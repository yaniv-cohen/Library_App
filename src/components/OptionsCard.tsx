import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import SortBar from "./SortBar";
import { Filter, Sort, Tag } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import { SEARCH_DELAY } from "../defaultValues";

const OptionsCard = ({
  filters,
  handleToggleTagFilter,
  resetFilters,
  setTitleSearchValue,
  setAuthorSearchValue,
  showFavoritesOnly,
  toggleShowFavoritesOnly,
  setMinRatingFilter,
  setMaxRatingFilter,
}: {
  filters: Filter;
  toggleTitleDir: { (): void };
  toggleRatingDir: { (): void };
  handleToggleTagFilter: { (tag: Tag): void };
  resetFilters: { (): void };
  titleSearchValue: string;
  setTitleSearchValue: { (text: string): void };
  authorSearchValue: string;
  setAuthorSearchValue: { (text: string): void };
  showFavoritesOnly: boolean;
  toggleShowFavoritesOnly: { (): void };
  setMinRatingFilter: { (num: number): void };
  setMaxRatingFilter: { (num: number): void };
}) => {
  const [typedTitleSearchValue, setTypedTitleSearchValue] =
    useState<string>("");
  const [typedAuthorSearchValue, setTypedAuthorSearchValue] =
    useState<string>("");

  const debouncedTitle = useDebounce(typedTitleSearchValue, SEARCH_DELAY);
  const debouncedAuthor = useDebounce(typedAuthorSearchValue, SEARCH_DELAY);

  useEffect(() => {
    setTitleSearchValue(debouncedTitle);
  }, [debouncedTitle, setTitleSearchValue]);

  useEffect(() => {
    setAuthorSearchValue(debouncedAuthor);
  }, [debouncedAuthor, setAuthorSearchValue]);

  return (
    <header id="optionsHeader">
      <div className="card">
        <SearchBar
          typedTitleSearchValue={typedTitleSearchValue}
          setTypedTitleSearchValue={setTypedTitleSearchValue}
          typedAuthorSearchValue={typedAuthorSearchValue}
          setTypedAuthorSearchValue={setTypedAuthorSearchValue}
        />
      </div>
      <Filters
        selectedTags={filters.tagFilter.selectedTags}
        ratingFilterMax={filters.ratingFilter.max}
        ratingFilterMin={filters.ratingFilter.min}
        handleToggleTagFilter={handleToggleTagFilter}
        resetFilters={resetFilters}
        setMinRatingFilter={setMinRatingFilter}
        setMaxRatingFilter={setMaxRatingFilter}
      />

      <input
        name="favoritesOnlyToggle"
        type="checkbox"
        className="checkbox"
        id="favoritesOnlyToggle"
        checked={showFavoritesOnly}
        onChange={toggleShowFavoritesOnly}
      />
      <label htmlFor="favoritesOnlyToggle">
        Show favorites only:
        {showFavoritesOnly ? " Yes" : " No"}
      </label>
    </header>
  );
};

export default OptionsCard;
