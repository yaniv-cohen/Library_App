import { useEffect, useState } from "react";
import { Tag } from "../types";

const Filters = ({
  selectedTags,
  handleToggleTagFilter,
  resetTagFilters,
  setMinRatingFilter,
  setMaxRatingFilter,
}: {
  selectedTags: Set<Tag>;
  handleToggleTagFilter: { (tag: Tag): void };
  resetTagFilters: { (): void };
  setMinRatingFilter: { (num: number | undefined): void };
  setMaxRatingFilter: { (num: number | undefined): void };
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
    setTagNameOptionsToFilter([
      "tech",
      "non-fiction",
      "fiction",
      "fantasy",
      "history",
      "self-help",
      "science",
    ]);
  }, []);

  return (
    <ul>
      {tagNameOptionsToFilter.map((tag) => {
        //capitalize tag for display
        const myTag: Tag = tag;
        const upper = myTag.toUpperCase();
        return (
          <li key={tag}>
            <button
              onClick={() => handleToggleTagFilter(tag)}
              className={selectedTags.has(tag) ? "on" : "off"}
            >
              {upper}
            </button>
          </li>
        );
      })}
      <button onClick={() => resetTagFilters()}>Reset Tag Filters</button>
      <div>
        <label>Min Rating:</label>
        <input
          type="number"
          min={0}
          max={5}
          step={0.5}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "") {
              setMinRatingFilter(undefined);
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
          onChange={(e) => {
            const val = e.target.value;
            if (val === "") {
              setMinRatingFilter(undefined);
            } else {
              setMinRatingFilter(Number(val));
            }
          }}
        />
      </div>
    </ul>
  );
};

export default Filters;
