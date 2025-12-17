import { createTheme } from "@mui/material/styles";

// =========================================================================
// 1. TYPESCRIPT MODULE AUGMENTATION (Fixes the MuiDataGrid error)
// This tells TypeScript that the DataGrid component can be themed.
// =========================================================================

// Augment the components interface from MUI core to include MuiDataGrid from MUI X
declare module "@mui/material/styles" {
  interface Components {
    MuiDataGrid?: {
      styleOverrides?: {
        root?: {};
        columnHeaders?: {};
        cell?: {};
        // Add other DataGrid specific overrides here if needed
      };
    };
  }
}

// =========================================================================
// 2. THEME DEFINITION
// =========================================================================

// Define the custom color palette
const libraryPalette = {
  // Primary: A calming, deep blue for main elements (AppBar, primary buttons)
  primary: {
    main: "#1B5E20",
    light: "#4c8c4a",
    dark: "#003300",
    contrastText: "#FFFFFF",
  },
  // Secondary: A warm, soft gold/orange for actions (Favorites, secondary buttons)
  secondary: {
    main: "#FFB300", // Amber
    light: "#FFE54C",
    dark: "#C68400",
    contrastText: "#000000",
  },
  background: {
    default: "#F9F9F9",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#263238", // Softer black
    secondary: "#546E7A", // Blue-grey for less important info
  },
};

export const customTheme = createTheme({
  palette: libraryPalette,

  // 3. Typography Configuration
  typography: {
    // Merriweather/Georgia for headings gives that "Library" feel.
    // Roboto/Arial for body text keeps the UI readable.
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

    h1: {
      fontFamily: '"Merriweather", "Georgia", serif',
      fontSize: "2.5rem",
      fontWeight: 700,
      color: libraryPalette.primary.dark,
    },
    h2: {
      fontFamily: '"Merriweather", "Georgia", serif',
      fontSize: "1.8rem",
      fontWeight: 600,
      color: libraryPalette.primary.main,
    },
    // Subtitles for book metadata
    subtitle1: {
      fontFamily: '"Merriweather", "Georgia", serif',
      fontWeight: 400,
      color: libraryPalette.text.secondary,
    },
  },

  // 4. Component Overrides
  components: {
    // Style the main DataGrid component (MUI X)
    MuiDataGrid: {
      styleOverrides: {
        root: {
          // ...
        },
        // FIX APPLIED HERE
        columnHeaders: {
          // Ensure the background color is a deep, visible color (e.g., primary.dark)
          // Using primary.main or dark guarantees high contrast against light/white text
          backgroundColor: "#71fc00ff", // Using the primary.main color

          // Change the text color to white for maximum contrast with the dark background
          color: "#FFFFFF",
          fontWeight: "bold",
        },
        // ...
      },
    },
    // Style buttons (used for sorting, favorites, and tag filters)
    MuiButton: {
      defaultProps: {
        disableElevation: true, // Flat design for a cleaner look
      },
      styleOverrides: {
        root: {
          borderRadius: 4, // Slightly rounded corners
          textTransform: "none", // Keep original casing (Title, Rating)
          // Ensure contrast for secondary buttons
          "&.MuiButton-containedSecondary": {
            color: libraryPalette.secondary.contrastText,
          },
        },
      },
    },
    // Style the Paper component (used for Cards and DataTable wrapper)
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded corners for soft edges
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Subtle shadow
        },
      },
    },
    // Style the TextFields (Inputs) for better integration
    MuiTextField: {
      styleOverrides: {
        root: {
          // Consistent margin below input fields
          marginBottom: "10px",
        },
      },
    },
  },
});
