function SearchBar({
  typedTitleSearchValue,
  setTypedTitleSearchValue,
  typedAuthorSearchValue,
  setTypedAuthorSearchValue,
}: {
  typedTitleSearchValue: string;
  setTypedTitleSearchValue: (arg0: string) => void;
  typedAuthorSearchValue: string;
  setTypedAuthorSearchValue: (arg0: string) => void;
}) {
  return (
    <>
      <li>
        <label htmlFor="titleTextInput">Search Title</label>
        <input
          name="titleTextInput"
          id="titleTextInput"
          placeholder="Search Title"
          onChange={(e) => setTypedTitleSearchValue(e.target.value)}
          value={typedTitleSearchValue}
        />
      </li>
      <li>
        <label htmlFor="authorTextInput">Search Author</label>
        <input
          name="authorTextInput"
          id="authorTextInput"
          placeholder="Search Author"
          onChange={(e) => setTypedAuthorSearchValue(e.target.value)}
          value={typedAuthorSearchValue}
        />
        {/* <button onClick={()=>{setAuthorSearchValue()}}>Search Author</button> */}
      </li>
    </>
  );
}

export default SearchBar;
