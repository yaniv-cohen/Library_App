import { InputAdornment, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import MenuBookIcon from "@mui/icons-material/MenuBook";

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
    <Paper elevation={2} sx={{ p: 2, minWidth: 275, borderRadius: 2 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
      >
        {/* Label Section */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ minWidth: 100 }}
        >
          <SearchIcon color="primary" />
          <Typography variant="h2" component="div">
            Search:
          </Typography>

          {/* Title Input */}
          <TextField
            id="titleTextInput"
            label="Search Title"
            variant="outlined"
            size="medium"
            fullWidth
            value={typedTitleSearchValue}
            onChange={(e) => setTypedTitleSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MenuBookIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Author Input */}
          <TextField
            id="authorTextInput"
            label="Search Author"
            variant="outlined"
            size="medium"
            fullWidth
            value={typedAuthorSearchValue}
            onChange={(e) => setTypedAuthorSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonSearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>
    </Paper>
  );
  return (
    <Paper sx={{ minWidth: 275 }}>
      <Stack direction={"row"}>
        <Typography>Search:</Typography>
        <Stack direction={"column"}>
          <Box className="vertical-centered">
            <label htmlFor="titleTextInput">Search Title:</label>
            <TextField
              inputMode="search"
              name="titleTextInput"
              id="titleTextInput"
              placeholder="Search Title"
              onChange={(e) => setTypedTitleSearchValue(e.target.value)}
              value={typedTitleSearchValue}
            />
          </Box>
          <Box className="vertical-centered">
            <label htmlFor="authorTextInput">Search Author:</label>
            <input
              name="authorTextInput"
              id="authorTextInput"
              placeholder="Search Author"
              onChange={(e) => setTypedAuthorSearchValue(e.target.value)}
              value={typedAuthorSearchValue}
            />
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default SearchBar;
