import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import { IssData, IssState } from "../models/iss.interface";

const IssPositionPage: React.FC = () => {
  const [state, setState] = useState<IssState>({
    position: null,
    timestamp: null,
    loading: true,
    error: null,
  });

  const fetchISS = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const res = await fetch("http://api.open-notify.org/iss-now.json");
      if (!res.ok)
        throw new Error(`Network response not ok: ${res.statusText}`);

      const data: IssData = await res.json();

      setState({
        position: {
          latitude: parseFloat(data.iss_position.latitude.toString()),
          longitude: parseFloat(data.iss_position.longitude.toString()),
        },
        timestamp: data.timestamp,
        loading: false,
        error: null,
      });
    } catch (error: unknown) {
      setState({
        position: null,
        timestamp: null,
        loading: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  useEffect(() => {
    fetchISS();
    const interval = setInterval(fetchISS, 5000);
    return () => clearInterval(interval);
  }, []);

  const getDotPosition = (): { left: string; top: string } => {
    if (!state.position) return { left: "50%", top: "50%" };
    const { latitude, longitude } = state.position;
    const left = ((longitude + 180) / 360) * 100;
    const top = ((90 - latitude) / 180) * 100;
    return { left: `${left}%`, top: `${top}%` };
  };

  return (
    <Box
      sx={{
        py: 6,
        background: "linear-gradient(45deg, #372772 30%, #3A2449 90%)",
        color: "#fff",
      }}
    >
      <Container sx={{ mb: 4, height: !state.position ? "100vh" : "auto" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontFamily: "Audiowide" }}
        >
          Live ISS Tracker
        </Typography>
        <Typography align="center" gutterBottom>
          Data refreshes automatically every 5 seconds
        </Typography>
      </Container>

      {state.error && (
        <Typography color="error" align="center" sx={{ my: 4 }}>
          Error: {state.error}
        </Typography>
      )}

      {state.position && (
        <>
          <Paper
            elevation={4}
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: 3,
              mb: 4,
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg"
              alt="World Map"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.6)",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                width: 24,
                height: 24,
                bgcolor: "#ffeb3b",
                borderRadius: "50%",
                border: "2px solid #fbc02d",
                boxShadow: "0 0 8px 3px #fbc02d",
                cursor: "default",
                transition: "left 1s ease, top 1s ease",
                ...getDotPosition(),
                transform: "translate(-50%, -50%)",
              }}
              title={`ISS Location\nLat: ${state.position.latitude.toFixed(
                2
              )}, Lon: ${state.position.longitude.toFixed(2)}`}
            />
          </Paper>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Latitude: {state.position.latitude.toFixed(4)}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Longitude: {state.position.longitude.toFixed(4)}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.75 }}>
              Last updated:{" "}
              {state.timestamp
                ? new Date(state.timestamp * 1000).toLocaleTimeString("lv-LV")
                : "-"}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default IssPositionPage;
