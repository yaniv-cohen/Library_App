import { useEffect, useState } from "react";
import { Tag } from "../types";

const Filters = ({
  selectedTags,
  ratingFilterMin,
  ratingFilterMax,
  handleToggleTagFilter,
  resetFilters,
  setMinRatingFilter,
  setMaxRatingFilter,
}: {
  selectedTags: Set<Tag>;
  ratingFilterMin: number;
  ratingFilterMax: number;
  handleToggleTagFilter: { (tag: Tag): void };
  resetFilters: { (): void };
  setMinRatingFilter: { (num: number): void };
  setMaxRatingFilter: { (num: number): void };
}) => {
  const [tagNameOptionsToFilter, setTagNameOptionsToFilter] = useState<
    Array<Tag>
  >([]);

  useEffect(() => {
    //probably better
    // fetch("/tag-names.json")
    //   .then((response) => response.json()) // Parse the response body as JSON
    //   .then((data) => {
    //     console.log(data);
    //   }
    // )

    // TODO: fix hardcoding for now
    setTagNameOptionsToFilter(
      // DEFAULT_TAG_FILTER.selectedTags as Array<Tag>

      [
        "tech",
        "non-fiction",
        "fiction",
        "fantasy",
        "history",
        "self-help",
        "science",
      ]
    );
  }, []);

  return (
    <div>
      <div className="horizontal-centered">
        <h2>Filter:</h2>
        <ul className="vertical-centered">
          <div>
            <label>Min Rating:</label>
            <input
              type="number"
              min={0}
              max={5}
              step={0.5}
              value={ratingFilterMin !== undefined ? ratingFilterMin : ""}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "") {
                  setMinRatingFilter(Number(0));
                } else {
                  setMinRatingFilter(Number(val));
                }
              }}
            />
          </div>
          <div>
            <label>Max Rating:</label>
            <input
              type="number"
              min={0}
              max={5}
              step={0.5}
              value={ratingFilterMax !== undefined ? ratingFilterMax : ""}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "") {
                  setMaxRatingFilter(5);
                } else {
                  setMaxRatingFilter(Number(val));
                }
              }}
            />
          </div>
        </ul>

        <ul>
          {tagNameOptionsToFilter.map((tag) => {
            //capitalize tag for display
            const myTag: Tag = tag;
            const upper = myTag.toUpperCase();
            return (
              <li key={tag}>
                <button
                  onClick={() => {
                    console.log(tag, selectedTags);
                    handleToggleTagFilter(tag);
                  }}
                  className={selectedTags.has(tag) ? "on" : "off"}
                >
                  {upper}
                </button>
              </li>
            );
          })}
        </ul>
        <button onClick={() => resetFilters()}>Reset Filters</button>
      </div>
    </div>
  );
};

export default Filters;
