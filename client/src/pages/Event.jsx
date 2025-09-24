import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";

import axios from "axios";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // Update token on mount and when localStorage changes (for multi-tab support)
  useEffect(() => {
    const onStorage = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => setEvents(res.data));
  }, []);

  const handleBook = (eventId) => {
    // Replace with your book logic or navigation
    console.log("Book clicked for event:", eventId);
  };

  return (
    <Box sx={{ p: 2, maxWidth: 920, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Events
      </Typography>
      <Grid container spacing={3}>
        {events.map((ev) => (
          <Grid item xs={12} key={ev._id}>
            <Card
              sx={{
                width: 960,
                borderRadius: 3,
                boxShadow: 4,
                borderLeft: "8px solid #8e19d2ff",
                background: "linear-gradient(90deg,#fff 75%,#f4f7fa 100%)",
                height: 170,
                display: "flex",
                alignItems: "center",
              }}
            >
              <CardContent
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* Event details (left) */}
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 1, color: "#1976d2" }}
                  >
                    {ev.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, color: "#555", minHeight: 32 }}
                  >
                    {ev.description}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: "#888" }}>
                    📅 {new Date(ev.date).toLocaleDateString()} &nbsp; 🕓{" "}
                    {new Date(ev.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#888", mt: 0.5 }}
                  >
                    📍 {ev.location}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#1976d2", mt: 2 }}
                  >
                   👨‍👩‍👧‍👦 Capacity: {ev.capacity}
                  </Typography>
                </Box>
                {/* Book button (right) */}

                {token && (
                  <Button
                    variant="contained"
                    onClick={() => handleBook(ev._id)}
                    sx={{
                      borderRadius: 2,
                      fontWeight: 600,
                      minWidth: 120,
                      background: "linear-gradient(90deg, #FFD600, #FFB300)",
                      color: "black",
                      mt: 2,
                      "&:hover": {
                        background: "linear-gradient(90deg, #FFB300, #FFD600)",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Book
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
