import { Book } from "../types";

const BookEntry = ({
  book,
  isFavorite = false,
  toggleFavorite,
  showFavoritesOnly,
}: {
  book: Book;
  isFavorite: boolean;
  toggleFavorite: (bookId: string) => void;
  showFavoritesOnly: boolean;
}) => {
if(showFavoritesOnly && !isFavorite){
  return null;
}
  return (
    <li>
      <b>{book.title} by {book.author} </b>- Rating: {book.rating} ({book.year}) Tags: {book.tags.join(", ")}
      <button onClick={()=>toggleFavorite(book.id)}>{isFavorite ? "⭐": "✰"}</button>
    </li>
  );
};

export default BookEntry;
