import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import { Article } from "../models/article.interface";
import { formatDate } from "../helpers/datetime.helpers";

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("https://api.spaceflightnewsapi.net/v4/articles?limit=6")
      .then((res) => res.json())
      .then((data) => setArticles(data.results as Article[]))
      .catch((e) => console.error(e));
  }, []);

  return (
    <Box
      sx={{
        py: 6,
        background: "linear-gradient(45deg, #372772 30%, #3A2449 90%)",
        color: "#fff",
      }}
    >
      {!articles && (
        <Container
          sx={{ height: "100vh", display: "flex", justifyContent: "center" }}
        >
          <CircularProgress color="inherit" />
        </Container>
      )}
      {articles && (
        <>
          {/* Hero Section */}
          <Container maxWidth="md" sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontFamily: "Audiowide" }}
            >
              Discover the Cosmos
            </Typography>
            <Typography variant="h6" paragraph>
              Your trusted source for the latest in space exploration, missions,
              and cosmic discoveries.
            </Typography>
          </Container>
          {/* Live Articles Grid */}
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {articles.map((article) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#372772 ",
                      color: "#fff",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={article.image_url}
                      alt={article.title}
                      sx={{ height: 200, objectFit: "cover" }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography sx={{ fontSize: 14 }}>
                        {formatDate(article.published_at)}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h6"
                        sx={{ fontFamily: "Audiowide" }}
                      >
                        {article.title}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.75 }}>
                        {article.summary.slice(0, 120)}…
                      </Typography>
                    </CardContent>
                    <Button
                      size="small"
                      color="primary"
                      href={article.url}
                      target="_blank"
                      sx={{ alignSelf: "flex-start", m: 2, color: "#fff" }}
                    >
                      Read More
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      )}
    </Box>
  );
};

export default Home;
