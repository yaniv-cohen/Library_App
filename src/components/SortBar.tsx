import React from "react";
import SearchBar from "./SearchBar";

const SortBar = ({
  toggleTitleDir,
  toggleRatingDir,
  titleSearchValue,
  setTitleSearchValue,
  authorSearchValue,
  setAuthorSearchValue,
}: {
  toggleTitleDir: { (): void };
  toggleRatingDir: { (): void };
  titleSearchValue: string;
  setTitleSearchValue: { (text: string): void };
  authorSearchValue: string;
  setAuthorSearchValue: { (text: string): void };
}) => {
  return (
    <ul>
      <li>
        <button
          onClick={() => {
            toggleTitleDir();
          }}
        >
          A-z
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            toggleRatingDir();
          }}
        >
          Rating
        </button>
      </li>
    </ul>
  );
};

export default SortBar;
