import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Tag } from "../types";
import { GridFilterModel } from "@mui/x-data-grid";
import { DEFAULT_FILTER_MODEL } from "../defaultValues";
import {
  Stack,
  Rating,
  Box,
  Paper,
  Typography,
  Chip,
  FormControlLabel,
  Switch,
  Button,
  Divider,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Filters = ({
  selectedTags,
  ratingFilterMin,
  ratingFilterMax,
  handleToggleTagFilter,
  resetFilters,
  setMinRatingFilter,
  setMaxRatingFilter,
  setFilterModel,
  showFavoritesOnly,
  toggleShowFavoritesOnly,
}: {
  selectedTags: Set<Tag>;
  ratingFilterMin: number;
  ratingFilterMax: number;
  handleToggleTagFilter: { (tag: Tag): void };
  resetFilters: { (): void };
  setMinRatingFilter: { (num: number): void };
  setMaxRatingFilter: { (num: number): void };
  filterModel: GridFilterModel;
  setFilterModel: Dispatch<SetStateAction<GridFilterModel>>;
  showFavoritesOnly: boolean;
  toggleShowFavoritesOnly: { (): void };
}) => {
  const [tagNameOptionsToFilter, setTagNameOptionsToFilter] = useState<
    Array<Tag>
  >([]);

  useEffect(() => {
    // TODO: fix hardcoding for now (simulate fetch)
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

  function handleChangeMinRating(val: string) {
    if (val === "") {
      setMinRatingFilter(Number(0));
    } else {
      setMinRatingFilter(Number(val));
    }
    setFilterModel((prev) => {
      const newRatingModelItems = prev.items.map((it) => {
        return it.field === "rating" && it.operator === ">="
          ? { field: "rating", operator: ">=", value: val }
          : it;
      });
      return { ...prev, items: newRatingModelItems };
    });
  }
  function handleChangeMaxRating(val: string) {
    if (val === "") {
      setMaxRatingFilter(5);
    } else {
      setMaxRatingFilter(Number(val));
    }
    setFilterModel((prev) => {
      const newRatingModelItems = prev.items.map((it) => {
        return it.field === "rating" && it.operator === ">="
          ? { field: "rating", operator: "<=", value: val }
          : it;
      });
      return { ...prev, items: newRatingModelItems };
    });
  }
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", md: "block" } }}
          />
        }
      >
        {/* Section 1: Rating Range */}
        <Box sx={{ minWidth: 250 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Rating Range:
          </Typography>

          <Stack direction={"column"}>
            {/* MIN Rating */}
            <Stack direction={"row"}>
              <label>Min Rating:</label>
              <input
                type="number"
                min={0}
                max={5}
                step={0.5}
                value={ratingFilterMin !== undefined ? ratingFilterMin : ""}
                onChange={(e) => {
                  handleChangeMinRating(e.target.value);
                }}
              />
              <Box>
                <Rating
                  name="half-rating-read"
                  value={ratingFilterMin}
                  getLabelText={() => {
                    if (ratingFilterMin == null) {
                      return "";
                    }
                    return `${ratingFilterMin.toFixed(1)} stars`;
                  }}
                  onChange={(_, newValue) => {
                    setMinRatingFilter(newValue ?? 0);
                  }}
                  precision={0.5}
                  tabIndex={-1}
                />
              </Box>
            </Stack>

            <Stack direction={"row"}>
              <label>Max Rating: </label>
              <input
                type="number"
                min={0}
                max={5}
                step={0.5}
                value={ratingFilterMax !== undefined ? ratingFilterMax : ""}
                onChange={(e) => {
                  handleChangeMaxRating(e.target.value);
                }}
              />
              <Box>
                <Rating
                  name="half-rating-read"
                  value={ratingFilterMax}
                  // getLabelText={() => ratingFilterMax}
                  // getLabelText={ratingFilterMax}
                  onChange={(event, newValue) => {
                    setMaxRatingFilter(newValue ?? 5);
                  }}
                  precision={0.5}
                  tabIndex={-1}
                />
              </Box>
            </Stack>
          </Stack>
        </Box>

        {/* Section 2: Tags */}
        <Box
          sx={{
            flexGrow: 1,
            maxWidth: "400px",
            borderRadius: 2,
            padding: "4px",
            // 2. Use template literals to insert the imported path into css url()
            backgroundImage: `url(./back.jpg)`,

            // 3. Recommended properties to ensure the image looks good:
            backgroundSize: "cover", // Resizes image to fill container
            backgroundPosition: "center", // Centers the image
            backgroundRepeat: "no-repeat", // Prevents tiling
          }}
        >
          <Paper
            sx={{
              backgroundColor: "rgba(255,255,255,0.5)",
              padding: 1,
              margin: 1,
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Tags:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {tagNameOptionsToFilter.map((tag) => (
                <Chip
                  key={tag}
                  label={tag.toUpperCase()}
                  onClick={() => handleToggleTagFilter(tag)}
                  color={selectedTags.has(tag) ? "primary" : "default"}
                  variant={selectedTags.has(tag) ? "filled" : "outlined"}
                  clickable
                  sx={{
                    fontWeight: 500,
                    backgroundColor: selectedTags.has(tag)
                      ? undefined
                      : "white",
                  }}
                />
              ))}
            </Box>
          </Paper>
        </Box>

        {/* Section 3: Favorites & Reset */}
        <Stack spacing={2} justifyContent="center" sx={{ minWidth: 180 }}>
          <FormControlLabel
            control={
              <Switch
                checked={showFavoritesOnly}
                onChange={toggleShowFavoritesOnly}
                color="secondary"
              />
            }
            label={<Typography variant="h6">Favorites Only ⭐</Typography>}
          />
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            startIcon={<RestartAltIcon />}
            onClick={() => {
              resetFilters();
              setFilterModel(DEFAULT_FILTER_MODEL);
            }}
            sx={{ textTransform: "none" }}
          >
            Reset All
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Filters;
