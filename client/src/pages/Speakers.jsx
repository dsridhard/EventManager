import React, { useEffect, useState } from "react";
import { Typography, Grid, Box, CardContent, Card } from "@mui/material";
import axios from "axios";
const Speakers = () => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [getSpeaker, setSpeaker] = useState([]);
  // keep token updated if user logs in/out on other tabs
  useEffect(() => {
    const onStorage = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/bookings/speaker")
      .then((res) => {
        setSpeaker(res.data.speakers);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, [token]);

  return (
    <div>
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
          sx={{ textAlign: "center", mb: 4, fontWeight: 700 }}
        >
          Speakers
        </Typography>
        {getSpeaker.map((card, index) => (
          <Grid
            container
            spacing={{ xs: 3, md: 4 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item size={{ xs: 2, sm: 3, md: 4 }} key={getSpeaker._id}>
              <Card
                sx={{
                  width: 360,
                  borderRadius: 3,
                  boxShadow: 4,
                  borderLeft: "8px solid #d68a19ff",
                  background: "linear-gradient(90deg,#fff 75%,#f4f7fa 100%)",
                  height: 170,
                  display: "flex",
                  alignItems: "center",
                }}
                key={index}
              >
                <CardContent
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h5" component="div">
                    {card.speaker}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ))}
      </Box>
    </div>
  );
};

export default Speakers;
