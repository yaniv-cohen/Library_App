import { Box, Typography, Link, Container } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto", // This is crucial for the sticky behavior
        backgroundColor: (theme) => theme.palette.primary.main,
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="body1"
              sx={{ fontFamily: '"Merriweather", serif' }}
            >
              {new Date().getFullYear()} Digital Library Catalog
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontFamily: '"Merriweather", serif' }}
            >
              by Yaniv Cohen
            </Typography>
          </Box>

          <Link
            href="https://github.com/yaniv-cohen/Library_App"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            <GitHubIcon fontSize="small" />
            <Typography variant="body2">View on GitHub</Typography>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};
