import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { ASC, Book, Filter, Sort } from "../types";
import BookEntry from "./BookEntry";

interface BooksList {
  filters: Filter;
  sortOrder: Sort[];
  titleSearchValue: string;
  authorSearchValue: string;
  showFavoritesOnly: boolean;
}

const BookList: FC<PropsWithChildren<BooksList>> = ({
  filters,
  sortOrder,
  titleSearchValue,
  authorSearchValue,
  showFavoritesOnly,
  children,
}) => {
  const [entries, setEntries] = useState<Array<Book>>([]);
  const [favoriteBookIds, setFavoriteBookIds] = useState<Set<string>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchBooks() {
    setIsLoading(true); // Start loading
    setError(null); // Clear previous errors

    try {
      let path = "/books.json";
      const response = await fetch(path);
      const wa = new Promise((resolve) => setTimeout(resolve, 1500)); //simulate loading time
      await wa;
      if (!response.ok) {
        throw new Error(`error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEntries(data);
    } catch (err) {
      setError(`Failed to load books. Details: ${(err as Error).message}`);
    } finally {
      setIsLoading(false); // Stop loading regardless of success/failure
    }
  }

  async function fetchFavoriteBooks() {
    let out = localStorage.getItem("favoriteBookIds");
    if (out) {
      let favIds: Array<string> = JSON.parse(out);
      setFavoriteBookIds(new Set(favIds));
    } else {
      setFavoriteBookIds(new Set());
    }
  }

  //TODO: handle errors properly and loading state
  useEffect(() => {
    fetchBooks();
    fetchFavoriteBooks();
  }, []);

  const visibleBooks = useMemo(() => {
    let serachEntries = [...entries];
    if (titleSearchValue) {
      serachEntries = serachEntries.filter((book: Book) => {
        return book.title
          .toLocaleLowerCase()
          .includes(titleSearchValue.toLocaleLowerCase());
      });
    }
    if (authorSearchValue) {
      serachEntries = serachEntries.filter((book: Book) => {
        return book.author
          .toLocaleLowerCase()
          .includes(authorSearchValue.toLocaleLowerCase());
      });
    }

    //this can be done for arbitrary number of filters, but for now we have only 2
    //can use the same approach like sorting, of having an array of filter functions
    let filteredEntriesByTag = serachEntries.filter((book) => {
      //tag filter
      return filters.tagFilter.fnc(book.tags, filters.tagFilter.selectedTags);
    });

    //rating filter
    let filteredEntriesByRatingAndTag;
    if (filters.ratingFilter.min !== 0 || filters.ratingFilter.max !== 5) {
      filteredEntriesByRatingAndTag = filteredEntriesByTag.filter((book) => {
        return filters.ratingFilter.fnc(book.rating, {
          min: filters.ratingFilter.min,
          max: filters.ratingFilter.max,
        });
      });
    } else {
      filteredEntriesByRatingAndTag = filteredEntriesByTag;
    }

    //favorites filter
    if (showFavoritesOnly) {
      filteredEntriesByRatingAndTag = filteredEntriesByRatingAndTag.filter(
        (book) => favoriteBookIds.has(book.id)
      );
    }
    let sortedEntries = [...filteredEntriesByRatingAndTag].sort((a, b) => {
      let out = 0;
      //TODO: check further optimization here
      for (let i = 0; i < sortOrder.length; i++) {
        //starting from most to least significant
        let sortOption = sortOrder[i];
        out = sortOption.fnc(a, b, sortOption.direction);
        if (out !== 0) {
          return out;
        }
      }
      return 0;
    });

    return sortedEntries;
    //  return filteredEntriesByRatingAndTag;
  }, [entries, filters, sortOrder, titleSearchValue, authorSearchValue, showFavoritesOnly]);

  function toggleFavorite(bookId: string): void {
    const newFavorites = new Set(favoriteBookIds);
    if (newFavorites.has(bookId)) {
      newFavorites.delete(bookId);
    } else {
      newFavorites.add(bookId);
    }
    localStorage.setItem(
      "favoriteBookIds",
      JSON.stringify(Array.from(newFavorites))
    );
    setFavoriteBookIds(newFavorites);
  }

  if (isLoading) {
    return <h2>📚 Loading book data...</h2>;
  }

  if (error) {
    return <h2 style={{ color: "red" }}>🚨 Error loading library: {error}</h2>;
  }

  if (visibleBooks.length === 0) {
    return <h2>No books found matching your criteria.</h2>;
  }

  return (
    <div>
      <div className="horizontal-spaced">
        <h2>{"Found " + visibleBooks.length + " books"}</h2>
        {children}
      </div>
      <ul>
        {visibleBooks.map((book) => (
          <BookEntry
            key={book.id}
            book={book}
            isFavorite={favoriteBookIds.has(book.id)}
            toggleFavorite={toggleFavorite}
            showFavoritesOnly={showFavoritesOnly}
          />
        ))}
      </ul>
    </div>
  );
};

export default BookList;
