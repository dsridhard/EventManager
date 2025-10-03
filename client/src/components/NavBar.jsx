import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Container,
  Avatar,
  Tooltip,
} from "@mui/material";

import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const Token = localStorage.getItem("token");
  const userData = localStorage.getItem("userData");
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    // setUser(null);
    navigate("/login");
  };
  const handleBooking = () => {
    navigate("/my-bookings");
    handleMenuClose();
  };
  return (
    <AppBar
      position="absolute"
      elevation={0}
      sx={{
        background: "rgba(145, 13, 228)",
        boxShadow: "none",
        width: "100vw",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 6 } }}>
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            width: "100%",
            minHeight: 80,
            px: 0,
          }}
        >
          {/* Logo */}
          <Typography
            component={RouterLink}
            to="/"
            variant="h4"
            // component="div"

            sx={{
              fontWeight: 700,
              color: "#FFD600",
              letterSpacing: 1,
              fontFamily: "Montserrat, sans-serif",
              mr: 6,
              textDecoration: "none",
            }}
          >
            eventoo
          </Typography>

          {/* Centered menu items */}
          <Box
            sx={{
              display: "flex",
              gap: 4,
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              component={RouterLink}
              to="/"
              sx={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 18,
                textTransform: "none",
              }}
              disableRipple
            >
              Home
            </Button>
            <Button
            component={RouterLink}
             to="/speakers"
              sx={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 18,
                textTransform: "none",
              }}
              disableRipple
            >
              Speakers
            </Button>
            <Button
              component={RouterLink}
              to="/events"
              sx={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 18,
                textTransform: "none",
              }}
              disableRipple
            >
              Event
            </Button>

            <Button
              sx={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 18,
                textTransform: "none",
              }}
              disableRipple
            >
              Contact
            </Button>

            {userData && (
              <>
                <Button
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 18,
                    textTransform: "none",
                  }}
                  disableRipple
                  onClick={handleBooking}
                >
                  MyBookings
                </Button>
                <Tooltip title={userData}>
                  <Avatar>{userData.slice(0, 1).toUpperCase()}</Avatar>
                </Tooltip>
              </>
            )}
          </Box>

          {/* Registration button */}
          {Token ? (
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              onClick={handleLogout}
              sx={{
                background: "linear-gradient(90deg, #FFD600, #FFB300)",
                color: "#222",
                fontWeight: 700,
                fontSize: "1.15rem",
                px: 4,
                py: 1.2,
                borderRadius: 2,
                boxShadow: "none",
                ml: 3,
                "&:hover": {
                  background: "linear-gradient(90deg, #FFB300, #FFD600)",
                  boxShadow: "none",
                },
              }}
            >
              Logout
            </Button>
          ) : location.pathname === "/register" ? (
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #FFD600, #FFB300)",
                color: "#222",
                fontWeight: 700,
                fontSize: "1.15rem",
                px: 4,
                py: 1.2,
                borderRadius: 2,
                boxShadow: "none",
                ml: 3,
                "&:hover": {
                  background: "linear-gradient(90deg, #FFB300, #FFD600)",
                  boxShadow: "none",
                },
              }}
            >
              SIGN IN
            </Button>
          ) : (
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #FFD600, #FFB300)",
                color: "#222",
                fontWeight: 700,
                fontSize: "1.15rem",
                px: 4,
                py: 1.2,
                borderRadius: 2,
                boxShadow: "none",
                ml: 3,
                "&:hover": {
                  background: "linear-gradient(90deg, #FFB300, #FFD600)",
                  boxShadow: "none",
                },
              }}
            >
              REGISTRATION
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
