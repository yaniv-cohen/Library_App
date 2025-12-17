import Button from "@mui/material/Button";
import { Book } from "../types";

export const FavoriteButton = ({
  book,
  isFavorite = false,
  toggleFavorite,
  showFavoritesOnly,
}: {
  book: Book;
  isFavorite: boolean;
  toggleFavorite: (bookId: string) => void;
  showFavoritesOnly: boolean;
}) => (
  <Button
    onClick={() => toggleFavorite(book.id)}
    variant="outlined"
    size="small"
    color="secondary"
  >
    {isFavorite ? "⭐" : "✰"}
  </Button>
);
