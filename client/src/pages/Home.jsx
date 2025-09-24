import { Typography, Box } from "@mui/material";
export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
        background: `linear-gradient(rgba(110, 6, 174, .6), rgba(110, 6, 174, .6)), url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80') center/cover no-repeat`,
        color: "#fff",
      }}
    >
  
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "70vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pt: { xs: 8, md: 12 },
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontSize: { xs: 18, md: 28 },
            mb: 2,
            letterSpacing: 8,
            fontWeight: 300,
            textAlign: "center",
            fontFamily: "Montserrat, sans-serif",
            opacity: 0.8,
          }}
        >
          Don’t Miss it
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            color: "#fff",
            textAlign: "center",
            fontSize: { xs: 32, md: 60 },
            letterSpacing: 1,
            textShadow: "1px 2px 10px #7c36b2",
            fontFamily: "Montserrat, sans-serif",
            lineHeight: 1.1,
          }}
        >
          World Biggest UI/UX <br /> Meetup V-1.0
        </Typography>
      </Box>
    </Box>
  );
}
