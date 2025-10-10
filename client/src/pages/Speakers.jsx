import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import axios from "axios";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events
  useEffect(() => {


    axios
      .get("http://localhost:5000/api/bookings/speaker")
      .then((res) => {
        console.log(res.data)
        setEvents(res.data.speakers);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Box
      sx={{
        mb: 30,
        p: 2,
        maxWidth: 1180,
        mx: "auto",
        flexGrow: 1,
        marginTop: 11,
      }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 2, fontWeight: 700 }}
      >
        Speakers
      </Typography>
      {loading ? (
        <Typography sx={{ textAlign: "center" }}>Loading...</Typography>
      ) : events.length === 0 ? (
        <Typography sx={{ textAlign: "center" }} color="text.secondary">
          No event is going to be live.
        </Typography>
      ) : (
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
                      textAlign="center"
                      sx={{ fontWeight: 600, mb: 1, color: "#1976d2" }}
                    >
                      {ev.speaker}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
