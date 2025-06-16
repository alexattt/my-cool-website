import {
  Box,
  Container,
  Typography,
  IconButton,
  Link,
  Stack,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "#372772", color: "#fff", py: 4, mt: "auto" }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          {/* Navigation Links */}
          <Stack direction="row" spacing={3}>
            <Link
              component={RouterLink}
              to="/"
              color="inherit"
              underline="hover"
            >
              Home
            </Link>
            <Link
              component={RouterLink}
              to="/iss-location"
              color="inherit"
              underline="hover"
            >
              Where is ISS?
            </Link>
            <Link
              component={RouterLink}
              to="/space-photos"
              color="inherit"
              underline="hover"
            >
              Daily space photo
            </Link>
          </Stack>

          {/* Social Media Icons */}
          <Stack direction="row" spacing={1}>
            <IconButton
              color="inherit"
              href="https://x.com/esa"
              target="_blank"
            >
              <XIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://github.com/ESA"
              target="_blank"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://instagram.com/europeanspaceagency/"
              target="_blank"
            >
              <InstagramIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, opacity: 0.75 }}
        >
          © {new Date().getFullYear()} Space news. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
