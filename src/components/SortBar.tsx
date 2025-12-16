import { ASC, Sort, SORTBY_RATING, SORTBY_TITLE } from "../types";

const SortBar = ({
  toggleTitleDir,
  toggleRatingDir,
  sortOrder,
}: {
  toggleTitleDir: { (): void };
  toggleRatingDir: { (): void };
  titleSearchValue: string;
  setTitleSearchValue: { (text: string): void };
  authorSearchValue: string;
  setAuthorSearchValue: { (text: string): void };
  sortOrder: Array<Sort>;
}) => {
  return (
    <div className="horizontal-centered">
      <h2>Sort:</h2>
      <ul>
        <li>
          <button
            onClick={() => {
              toggleTitleDir();
            }}
          >
            {"A-z: "}
            {sortOrder.find((s) => s.method === SORTBY_TITLE)?.direction ===
            "asc"
              ? "asc. ▲"
              : "des. ▼"}
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              toggleRatingDir();
            }}
          >
            {"Rating: "}
            {sortOrder.find((s) => s.method === SORTBY_RATING)?.direction ===
            "asc"
              ? "asc. ▲"
              : "des. ▼"}
          </button>
        </li>
      </ul>
      <div>
        <h4>{"Sort order: "}</h4>

        {sortOrder.map((sort, idx) => {
          return (
            <p className="sortBox capitalized" key={sort.method}>
              {idx +
                1 +
                ". " +
                (sort.method ) +
                "-" +
                (sort.direction == ASC ? "asc. ▲" : " des. ▼")}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default SortBar;
