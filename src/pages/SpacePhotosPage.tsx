import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  CircularProgress,
  Paper,
  Link,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enGB } from "date-fns/locale";

interface ApodData {
  date: string;
  explanation: string;
  media_type: "image" | "video";
  title: string;
  url: string;
  hdurl?: string;
  copyright?: string;
}

const NASA_API_KEY = "DEMO_KEY";

const SpacePhotosPage: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [data, setData] = useState<ApodData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAPOD = async (dateStr: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${dateStr}`
      );
      if (!res.ok) {
        if (res.status === 429) {
          throw new Error(
            `Error fetching APOD: daily request limit has been reached`
          );
        }
        throw new Error(`Error fetching APOD: ${res.statusText}`);
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (date) {
      const formattedDate = date.toISOString().slice(0, 10);
      fetchAPOD(formattedDate);
    }
  }, [date]);

  return (
    <Box
      sx={{
        py: 6,
        background: "linear-gradient(45deg, #372772 30%, #3A2449 90%)",
        color: "#fff",
      }}
    >
      {loading && (
        <Container
          sx={{ height: "100vh", display: "flex", justifyContent: "center" }}
        >
          <CircularProgress color="inherit" />
        </Container>
      )}
      {!loading && (
        <Container maxWidth="md">
          <Container sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontFamily: "Audiowide", mb: 2 }}
            >
              NASA Astronomy Picture of the Day
            </Typography>
            <Typography align="center" gutterBottom>
              Check what was the picture of the day on your birthday!
            </Typography>
            <Typography align="center" gutterBottom>
              But keep in mind - first picture of the day was released on June
              16, 1995. :)
            </Typography>
          </Container>

          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DatePicker
              label="Select Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
              enableAccessibleFieldDOMStructure={false}
              format="dd/MM/yyyy"
              maxDate={new Date()}
              slots={{ textField: TextField }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: {
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                      "& .MuiInputAdornment-root": {
                        color: "white",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "white",
                      },
                      "& .MuiIconButton-root": {
                        color: "white",
                      },
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>

          {error && (
            <Typography
              color="error"
              align="center"
              sx={{ my: 4, height: "100vh" }}
            >
              {error}
            </Typography>
          )}

          {data && (
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                mt: 1,
                backgroundColor: "#372772 ",
                color: "#fff",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                {data.title}
              </Typography>

              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ opacity: 0.7 }}
              >
                {data.copyright && ` - © ${data.copyright}`}
              </Typography>

              {data.media_type === "image" ? (
                <Box
                  component="img"
                  src={data.hdurl || data.url}
                  alt={data.title}
                  sx={{
                    width: "100%",
                    maxHeight: 500,
                    objectFit: "contain",
                    borderRadius: 2,
                    mb: 2,
                  }}
                />
              ) : data.media_type === "video" ? (
                <Box
                  sx={{
                    position: "relative",
                    paddingTop: "56.25%", // 16:9 aspect ratio
                    mb: 2,
                  }}
                >
                  <iframe
                    src={data.url}
                    title={data.title}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                      borderRadius: 8,
                    }}
                    allowFullScreen
                  />
                </Box>
              ) : null}

              <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.6 }}>
                {data.explanation}
              </Typography>

              {data.url && (
                <Box mt={2}>
                  <Link
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View full resolution
                  </Link>
                </Box>
              )}
            </Paper>
          )}
        </Container>
      )}
    </Box>
  );
};

export default SpacePhotosPage;
