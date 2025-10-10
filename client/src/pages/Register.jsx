import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Box,
  Paper,
  Button,
  Typography,
  Grid,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate()
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registered! You can now login.");
      navigate("/login")
    } catch (err) {
      alert(`Registration failed ${err}`);
    }
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
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              background: "#fff",
              maxWidth: 380,
              width: "100%",
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Create account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ width: "100%" }}
            >
              <TextField
                name="name"
                value={form.name}
                onChange={handleChange}
                label="Name"
                fullWidth
                margin="normal"
                autoComplete="name"
              />
              <TextField
                name="email"
                value={form.email}
                onChange={handleChange}
                label="Email"
                fullWidth
                margin="normal"
                autoComplete="email"
              />
              <TextField
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                label="Password"
                fullWidth
                margin="normal"
                autoComplete="new-password"
              />
              <Button
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
                sx={{
                  background: "linear-gradient(90deg, #FFD600, #FFB300)",
                  color: "black",
                  mt: 2,
                  mb: 2,
                  borderRadius: 5,
                  fontWeight: 700,
                  "&:hover": {
                    background: "linear-gradient(90deg, #FFB300, #FFD600)",
                    boxShadow: "none",
                  },
                }}
              >
                Register
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
