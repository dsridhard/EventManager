import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  TextField,
  Box,
  Paper,
  Button,
  Typography,
  Grid,
  Alert,
  Collapse,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [errorMsg, setErrorMsg] = React.useState(""); // State for error message
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userData", res.data.user.name);
      localStorage.setItem("userid", res.data.user.id);
      localStorage.setItem("testindata",[{"first":"first","second":"second"}])
      if (res.data.user.role === "user") {
        navigate("/my-bookings");
      }
      else {
        navigate("/admin")
      }
    } catch (error) {
      const backendMsg = error?.response?.data?.msg || "Login failed";
      setErrorMsg(backendMsg);
      setOpen(true);
    }
  };

  const handleAlertClose = () => {
    setOpen(false);
    setErrorMsg("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={8} md={4}>
          <Paper
            elevation={2}
            sx={{
              padding: 4,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              background: "#fff",
              maxWidth: 320,
              width: "100%",
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Login to Book ticket
            </Typography>

            {/* Error Alert */}
            <Collapse in={open}>
              <Alert
                severity="error"
                sx={{ width: "100%", mb: 2 }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={handleAlertClose}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {errorMsg}
              </Alert>
            </Collapse>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ width: "100%" }}
            >
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                autoComplete="username"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                autoComplete="current-password"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button
                variant="contained"
                type="submit"
                fullWidth
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
                disabled={isSubmitting}
              >
                Login
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
