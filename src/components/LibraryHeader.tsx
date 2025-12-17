import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuBookIcon from "@mui/icons-material/MenuBook"; // A good icon for a library app
import { useMenu } from "../hooks/useMenu";

import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle"; // Icon for user menu
import Settings from "@mui/icons-material/Settings"; // Icon for user menu

// import "@fontsource/merriweather/400.css";
// import "@fontsource/merriweather/700.css";

import {
  Divider,
  FormControlLabel,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Paper,
  Popover,
  Stack,
  Switch,
} from "@mui/material";
import { useState } from "react";

// Assume you are using this component inside App.tsx where the AppBar should be

export const LibraryAppHeader = ({
  allowAdvancedFiltering,
  toggleAllowAdvancedFiltering,
}: {
  allowAdvancedFiltering: boolean;
  toggleAllowAdvancedFiltering: { (): void };
}) => {
  const settingsMenu = useMenu();
  const accountMenu = useMenu();

  return (
    // 1. AppBar sets the color (uses theme.palette.primary) and elevation
    <AppBar id="AppBar" position="static" color="primary">
      {/* 2. Toolbar manages horizontal layout and spacing */}
      <Toolbar>
        {/* 3. Logo/Branding Section (Left side) */}
        {/* Box with flexGrow: 1 pushes all subsequent content to the right */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* Decorative Icon */}
          <Box
            component="img"
            sx={{
              height: 120,
              width: "auto",
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="Books"
            src="./logo.png"
          ></Box>
          {/* Main App Title */}
          <Box>
            <Typography
              variant="h1"
              component="div"
              color="inherit"
              sx={{
                fontFamily: '"Luckiest Guy", cursiv',
                // fontOpticalSizing: "auto",
                fontWeight: 400,
                fontStyle: "normal",
                letterSpacing: "0.5px", // Slight spacing for readability
                flexGrow: 1, // Ensures it takes up available space if in a flex container
              }}
            >
              Digital Library Catalog
            </Typography>
            <Typography variant="body1">Smart catalog browser</Typography>
          </Box>

          {/* <Divider /> */}
        </Box>
        {/* --- Action Buttons --- */}
        <Paper>
          <Stack direction="row" spacing={1}>
            {/* 1. Settings Button */}
            <IconButton>
              <MenuBookIcon sx={{ mr: 1, fontSize: 30 }} color="secondary" />
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              onClick={settingsMenu.handleClick} // Hook handles the click
            >
              <Settings />
            </IconButton>

            {/* 1. Settings Popover (Rendered OUTSIDE the button) */}
            <Popover
              open={settingsMenu.open}
              anchorEl={settingsMenu.anchorEl}
              onClose={settingsMenu.handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box sx={{ p: 2, maxWidth: 300 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={allowAdvancedFiltering}
                      onChange={toggleAllowAdvancedFiltering}
                      color="secondary"
                    />
                  }
                  label={
                    <Typography variant="body1">
                      Allow advanced search 🔎
                    </Typography>
                  }
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Use the dots on the column titles to filter.
                </Typography>
              </Box>
            </Popover>

            {/* 2. Account Button */}
            <IconButton
              size="large"
              color="inherit"
              onClick={accountMenu.handleClick} // Hook handles the click
            >
              <AccountCircle />
            </IconButton>

            {/* 2. Account Menu (Standard Menu behavior) */}
            <Menu
              anchorEl={accountMenu.anchorEl}
              open={accountMenu.open}
              onClose={accountMenu.handleClose}
              onClick={accountMenu.handleClose} // Close when an item is clicked
            >
              <MenuItem disabled>Not Logged-in</MenuItem>
              <Divider />
              <Link href="https://en.wikipedia.org/wiki/Login" target="_blank">
                <MenuItem> Login</MenuItem>
              </Link>
            </Menu>
          </Stack>
        </Paper>
      </Toolbar>
    </AppBar>
  );
};
