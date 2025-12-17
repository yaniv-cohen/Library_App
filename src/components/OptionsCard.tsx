import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import { Filter, Tag } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import { SEARCH_DELAY } from "../defaultValues";
import { GridFilterModel } from "@mui/x-data-grid";
import Toolbar from "@mui/material/Toolbar";

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
  filterModel,
  setFilterModel,
}: {
  filters: Filter;
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
  filterModel: GridFilterModel;
  setFilterModel: Dispatch<SetStateAction<GridFilterModel>>;
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
    <Toolbar id="optionsHeader">
      <SearchBar
        typedTitleSearchValue={typedTitleSearchValue}
        setTypedTitleSearchValue={setTypedTitleSearchValue}
        typedAuthorSearchValue={typedAuthorSearchValue}
        setTypedAuthorSearchValue={setTypedAuthorSearchValue}
      />
      <Filters
        selectedTags={filters.tagFilter.selectedTags}
        ratingFilterMax={filters.ratingFilter.max}
        ratingFilterMin={filters.ratingFilter.min}
        handleToggleTagFilter={handleToggleTagFilter}
        resetFilters={resetFilters}
        setMinRatingFilter={setMinRatingFilter}
        setMaxRatingFilter={setMaxRatingFilter}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        showFavoritesOnly={showFavoritesOnly}
        toggleShowFavoritesOnly={toggleShowFavoritesOnly}
      />
    </Toolbar>
  );
};

export default OptionsCard;
