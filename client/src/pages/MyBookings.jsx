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

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [isCancel, SetCancel] = useState(false);
  const [isFailed, setFailed] = useState({ msg: "", state: false });

  // keep token updated if user logs in/out on other tabs
  useEffect(() => {
    const onStorage = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // fetch user bookings
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/bookings/my", {
        headers: { Authorization: `Bearer ${token} ` },
      })
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, [token]);

  const handleCancel = async (bookingId) => {
    alert(bookingId);
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
        headers: { Authorization: ` Bearer ${token}` },
      });
      // setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      // alert("Booking cancelled successfully!");
      SetCancel(true);
    } catch (err) {
      console.error("Cancel error:", err);
      setFailed({ msg: `Failed to cancel booking`, state: true });
      // alert("Failed to cancel booking");
    }
  };

  if (!token) {
    return (
      <Box sx={{ p: 3, textAlign: "center", marginTop: 11 }}>
        <Typography variant="h6" color="text.secondary">
          Please login to view your bookings.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mb: 30,
        p: 2,
        maxWidth: 1180,
        mx: "auto",
        marginTop: 11,
        flexGrow: 1,
      }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 4, fontWeight: 700 }}
      >
        My Bookings
      </Typography>
      {isCancel && (
        <>
          <Alert
            sx={{ width: 300, marginBlock: 4 }}
            variant="standard"
            severity="warning"
            onClose={() => {
              SetCancel(false);
            }}
          >
            <AlertTitle>Success</AlertTitle>
            Successfully Booking Cancelled
          </Alert>
        </>
      )}
      {isFailed.state && (
        <>
          <Alert
            severity="error"
            onClose={() => {
              setTimeout(setFailed(false), 1000);
            }}
          >
            <AlertTitle>Error</AlertTitle>
            {isFailed.msg}
          </Alert>
        </>
      )}
      {loading ? (
        <Typography sx={{ textAlign: "center" }}>Loading...</Typography>
      ) : bookings.length === 0 ? (
        <Typography sx={{ textAlign: "center" }} color="text.secondary">
          You have no bookings yet.
        </Typography>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {bookings.map((bk) => (
            <Grid size={{ xs: 2, sm: 3, md: 6 }} key={bk._id}>
              <Card
                sx={{
                  width: 360,
                  borderRadius: 3,
                  boxShadow: 4,
                  borderLeft: "8px solid #41b13dff",
                  background: "linear-gradient(90deg,#fff 75%,#f4f7fa 100%)",
                  minHeight: 150,
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
                  {/* Event details */}
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, mb: 1, color: "#1976d2" }}
                    >
                      {bk.event.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 1, color: "#555", minHeight: 32 }}
                    >
                      {bk.event.description}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: "#888" }}>
                      📅 {new Date(bk.event.date).toLocaleDateString()} &nbsp;
                      🕓{" "}
                      {new Date(bk.event.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#888", mt: 0.5 }}
                    >
                      📍 {bk.event.location}
                    </Typography>
                  </Box>

                  {/* Cancel button */}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleCancel(bk._id)}
                    sx={{
                      borderRadius: 2,
                      fontWeight: 600,
                      minWidth: 120,
                    }}
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
