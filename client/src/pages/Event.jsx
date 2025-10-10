import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import axios from "axios";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSuccessfull, setSuccessfull] = useState(false);
  const [isFailed, setFailed] = useState({ msg: "", state: false });
  // Update token on mount and when localStorage changes (multi-tab support)
  useEffect(() => {
    const onStorage = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Fetch events
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => {
        setEvents(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching events:", err)
        setLoading(false)
      }

      );
  }, []);

  // Booking handler
  const handleBook = async (eventId) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/bookings/${eventId}`,
        {}, // no body required
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Append new booking
      setBookings((prev) => [...prev, res.data.booking]);
      setSuccessfull(true);
      // alert(res.data.message || "Booked successfully!");
      console.log("Booking success:", res.data);
    } catch (err) {
      if (err.response) {
        // alert(err.response.data.msg || "Booking failed");
        setFailed({
          msg: err.response.data.msg || "Booking failed",
          state: true,
        });
        console.error("Booking error:", err.response.data);
      } else {
        setFailed({ msg: "Something went wrong", state: true });
        console.error(err);
      }
    }
  };

  return (
    <Box sx={{ mb: 30, p: 2, maxWidth: 1180, mx: "auto", flexGrow: 1, marginTop: 11 }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 2, fontWeight: 700 }}
      >
        Events
      </Typography>
      {isSuccessfull && (
        <>
          <Alert
            sx={{ width: 300 }}
            variant="standard"
            severity="success"
            onClose={() => {
              setSuccessfull(false);
            }}
          >
            <AlertTitle>Success</AlertTitle>
            Successfully Booked
          </Alert>
        </>
      )}
      {isFailed.state && (
        <>
          <Alert
            severity="error"
            onClose={() => {
              setFailed(false);
            }}
          >
            <AlertTitle>Error</AlertTitle>
            {isFailed.msg}
          </Alert>
        </>
      )}
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        sx={{ marginTop: 5 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {events.map((ev) => (
          <Grid item size={{ xs: 2, sm: 3, md: 4 }} key={ev._id}>
            <Card
              sx={{
                width: 360,
                borderRadius: 3,
                boxShadow: 4,
                borderLeft: "8px solid #d68a19ff",
                background: "linear-gradient(90deg,#fff 75%,#f4f7fa 100%)",
                height: 230,
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
