import { useEffect, useMemo, useState } from "react";
import { Book, Filter, Sort } from "../types";
import { log } from "console";
import BookEntry from "./BookEntry";

const BookList = ({
  filters,
  sortOrder,
  titleSearchValue,
  authorSearchValue,
  showFavoritesOnly
}: {
  filters: Filter;
  sortOrder: Sort[];
  titleSearchValue: string;
  authorSearchValue: string;
  showFavoritesOnly: boolean;
}) => {
  const [entries, setEntries] = useState<Array<Book>>([]);
  const [filteredEntries, setFilteredEntries] = useState<Array<Book>>([]);
  const [favoriteBookIds, setFavoriteBookIds] = useState<Set<string>>(
    new Set()
  );

  async function fetchBooks() {
    let path = "/books.json";
    fetch(path)
      .then((response) => response.json()) // Parse the response body as JSON
      .then((data) => {
        if (titleSearchValue) {
          data.filter((book: Book) => {
            return book.title.includes(titleSearchValue);
          });
        }
        if (authorSearchValue) {
          data.filter((book: Book) => {
            return book.author.includes(authorSearchValue);
          });
        }
        console.log(data);
        setEntries(data);
        console.log(entries);
      })
      .catch((error) => console.error("Error fetching JSON:", error));
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
    try {
      fetchBooks();
    } catch (e) {
      console.error("Error fetching books:", e);
    }
    
    try {
      fetchFavoriteBooks();
    } catch (e) {
      console.error("Error favorite Books:", e);
    }
  }, []);

  const visibleBooks = useMemo(() => {
    console.log("searching: ", titleSearchValue, authorSearchValue);

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

    //using the rating filter
    let filterByMin = filters.ratingFilter.min !== undefined;
    let filterByMax = filters.ratingFilter.max !== undefined;

    //this can be done for arbitrary number of filters, but for now we have only 2
    //can use the same approach like sorting, of having an array of filter functions
    let filteredEntriesByTag = serachEntries.filter((book) => {
      //tag filter
      if (filters.selectedTags.size > 0) {
        const hasTag = Array.from(filters.selectedTags).some((tag) => {
          return book.tags.includes(tag);
        });
        if (!hasTag) {
          return false;
        }
      }

      //rating filter
      let filteredEntriesByRatingAndTag;
      if (
        filters.ratingFilter.min !== undefined &&
        filters.ratingFilter.max !== undefined
      ) {
        filteredEntriesByRatingAndTag = filteredEntriesByTag.filter((book) => {
          if (
            book.rating === undefined ||
            (filterByMin && book.rating < filters.ratingFilter.min!) ||
            (filterByMax && book.rating > filters.ratingFilter.max!)
          ) {
            return false;
          }
        });
      } else {
      }
      return true;
    });

    let sortedEntries = [...filteredEntriesByTag].sort((a, b) => {
      let out = 0;
      //TODO: check further optimization here
      for (let i = 0; i <= sortOrder.length - 1; i++) {
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
  }, [entries, filters, sortOrder, titleSearchValue, authorSearchValue]);

  function toggleFavorite(bookId: string): boolean {
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
    return true;
  }
  if (visibleBooks.length === 0) {
    return <h2>No books found matching your criteria.</h2>;
  }
  return (
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
  );
};

export default BookList;
