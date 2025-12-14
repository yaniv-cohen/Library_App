import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import SortBar from "./SortBar";
import { Filter, Tag } from "../types";

const OptionsCard = ({
  filters,
  toggleTitleDir,
  toggleRatingDir,
  handleToggleTagFilter,
  resetTagFilters,
  titleSearchValue,
  setTitleSearchValue,
  authorSearchValue,
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
  resetTagFilters: { (): void };
  titleSearchValue: string;
  setTitleSearchValue: { (text: string): void };
  authorSearchValue: string;
  setAuthorSearchValue: { (text: string): void };
  showFavoritesOnly: boolean;
  toggleShowFavoritesOnly: { (): void };
  setMinRatingFilter: { (num: number | undefined): void };
  setMaxRatingFilter: { (num: number | undefined): void };
}) => {
  const [typedTitleSearchValue, setTypedTitleSearchValue] =
    useState<string>("");
  const [typedAuthorSearchValue, setTypedAuthorSearchValue] =
    useState<string>("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setTitleSearchValue(typedTitleSearchValue);
    }, 400);
    console.log("change", typedTitleSearchValue);
    return () => clearTimeout(delayDebounceFn);
  }, [typedTitleSearchValue]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setAuthorSearchValue(typedAuthorSearchValue);
    }, 400);
    console.log("change", typedAuthorSearchValue);
    return () => clearTimeout(delayDebounceFn);
  }, [typedAuthorSearchValue]);

  return (
    <div>
      <SearchBar
        typedTitleSearchValue={typedTitleSearchValue}
        setTypedTitleSearchValue={setTypedTitleSearchValue}
        typedAuthorSearchValue={typedAuthorSearchValue}
        setTypedAuthorSearchValue={setTypedAuthorSearchValue}
      />
      <Filters
        selectedTags={filters.selectedTags}
        handleToggleTagFilter={handleToggleTagFilter}
        resetTagFilters={resetTagFilters}
        setMinRatingFilter={setMinRatingFilter}
        setMaxRatingFilter={setMaxRatingFilter}
      />
      <SortBar
        toggleTitleDir={toggleTitleDir}
        toggleRatingDir={toggleRatingDir}
        authorSearchValue={authorSearchValue}
        setAuthorSearchValue={setAuthorSearchValue}
        titleSearchValue={titleSearchValue}
        setTitleSearchValue={setTitleSearchValue}
      />
      <button onClick={toggleShowFavoritesOnly}>
        {showFavoritesOnly ? "Browsing Favorites Only" : "Browsing All Items"}
      </button>
    </div>
  );
};

export default OptionsCard;
