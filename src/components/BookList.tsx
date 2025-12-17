import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Book, Filter, Sort } from "../types";
import { DataTable } from "./entryTable";
import { GridColDef, GridFilterModel } from "@mui/x-data-grid";
import { FavoriteButton } from "./FavoriteButton";
import {
  Box,
  CircularProgress,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

interface BooksList {
  filters: Filter;
  sortOrder: Sort[];
  titleSearchValue: string;
  authorSearchValue: string;
  showFavoritesOnly: boolean;
  filterModel: GridFilterModel;
  setFilterModel: Dispatch<SetStateAction<GridFilterModel>>;
  allowAdvancedFiltering: boolean;
}

const BookList: FC<PropsWithChildren<BooksList>> = ({
  filters,
  sortOrder,
  titleSearchValue,
  authorSearchValue,
  showFavoritesOnly,
  children,
  filterModel,
  setFilterModel,
  allowAdvancedFiltering,
}) => {
  const [entries, setEntries] = useState<Array<Book>>([]);
  const [favoriteBookIds, setFavoriteBookIds] = useState<Set<string>>(
    new Set(),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchBooks() {
    setIsLoading(true); // Start loading
    setError(null); // Clear previous errors

    try {
      let path = "/books.json";
      const response = await fetch(path);
      const wa = new Promise((resolve) => setTimeout(resolve, 1800)); //simulate loading time
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

  const visibleBooks: Array<Book & { isFavorite: boolean }> = useMemo(() => {
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
        (book) => favoriteBookIds.has(book.id),
      );
    }

    let sortedEntries: Array<Book & { isFavorite: boolean }> = [
      ...filteredEntriesByRatingAndTag,
    ].map((book) => {
      return { ...book, isFavorite: favoriteBookIds.has(book.id) };
    });

    sortedEntries = [...sortedEntries].sort((a, b) => {
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
  }, [
    entries,
    filters,
    sortOrder,
    titleSearchValue,
    authorSearchValue,
    showFavoritesOnly,
  ]);

  function toggleFavorite(bookId: string): void {
    const newFavorites = new Set(favoriteBookIds);
    if (newFavorites.has(bookId)) {
      newFavorites.delete(bookId);
    } else {
      newFavorites.add(bookId);
    }
    localStorage.setItem(
      "favoriteBookIds",
      JSON.stringify(Array.from(newFavorites)),
    );
    setFavoriteBookIds(newFavorites);
  }

  if (isLoading) {
    if (isLoading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px", // Gives it breathing room
          }}
        >
          <Stack spacing={2} alignItems="center">
            <CircularProgress color="secondary" size={40} />
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" color="text.primary">
                📚 Loading Books...
              </Typography>
              <Typography variant="caption" color="text.secondary">
                (Simulating network latency...)
              </Typography>
            </Box>
          </Stack>
        </Box>
      );
    }
  }

  if (error) {
    return (
      <Paper sx={{ padding: 10 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="caption" color="text.primary">
            (🚨 Error loading library: )
          </Typography>
        </Box>
      </Paper>
    );
  }

  if (visibleBooks.length === 0) {
    return (
      <Paper sx={{ padding: 10 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" color="text.primary">
            📚 No books found matching your criteria.
          </Typography>
        </Box>
      </Paper>
    );
  }

  const columns: GridColDef<(typeof visibleBooks)[number]>[] = [
    {
      field: "actions",
      headerName: "Favorite",
      width: 100,
      renderCell: (params) => {
        const book = params.row as Book; // Cast the row data to your Book type
        const isFavorite = favoriteBookIds.has(book.id); // Check the status

        return (
          <FavoriteButton
            showFavoritesOnly={showFavoritesOnly}
            book={book}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite} // Pass the handler
          />
        );
      },
      sortable: false,
      filterable: false,
    },
    {
      field: "title",
      headerName: "Title",
      width: 600,
      sortable: true,
      filterable: allowAdvancedFiltering,
    },

    {
      field: "author",
      headerName: "Author",
      width: 150,
      sortable: true,
      filterable: allowAdvancedFiltering,
    },
    {
      field: "year",
      headerName: "Year",
      type: "string",
      width: 120,
      filterable: allowAdvancedFiltering,
    },

    {
      field: "rating",
      headerName: "Rating",
      description: "number",
      filterable: false,
      width: 150,
      renderCell: (params) => {
        const book = params.row as Book; // Cast the row data to your Book type

        return (
          <Rating
            name="book-rating"
            value={book.rating}
            precision={0.5}
            tabIndex={-1}
            readOnly
          />
        );
      },
    },
    {
      field: "id",
      headerName: "ID",
      width: 90,
      filterable: allowAdvancedFiltering,
    },
    {
      field: "tags",
      headerName: "Tags",
      description: "Th",
      width: 220,
      filterable: allowAdvancedFiltering,
      sortable: false,
    },
  ];

  return (
    <DataTable
      rows={visibleBooks}
      columns={columns}
      filterModel={filterModel}
      setFilterModel={setFilterModel}
    ></DataTable>
  );
};

export default BookList;
