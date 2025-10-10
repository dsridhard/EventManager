
import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Alert, FormControl } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
// ContactForm Component
const ContactForm = () => {
  // useForm hook from React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm();

  // Function called on form submit
  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      alert('Message sent successfully!');
    } catch (error) {
      alert('Error sending message: ' + error.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 800, mx: 'auto', mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      {isSubmitSuccessful && <Alert sx={{ width: 300 }}
        variant="filled"
        severity="success"
      >Successfully submitted your query!</Alert>}
      <Typography textAlign="center" fontStyle="bold" fontWeight="54" variant="h4" gutterBottom>
        Contact Us
      </Typography>

      {/* Name Field */}
      <TextField
        label="Name"
        {...register('name', { required: 'Name is required' })}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
      />

      {/* Email Field */}
      <TextField
        label="Email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address'
          }
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />

      {/* Message Field */}
      <TextField
        label="Message"
        {...register('message', { required: 'Message is required' })}
        error={!!errors.message}
        helperText={errors.message?.message}
        multiline
        rows={4}
        fullWidth
      />

      <Button type="submit" variant="contained"
        sx={{
          background: "linear-gradient(90deg, #FFD600, #FFB300)",
          color: "#222",
          fontWeight: 700,
          fontSize: "1.15rem",
          px: 3,
          py: 1.2,
          borderRadius: 2,
          boxShadow: "none",
          ml: 3,
          "&:hover": {
            background: "linear-gradient(90deg, #FFB300, #FFD600)",
            boxShadow: "none",
          },
        }}
        disabled={isSubmitting}
        endIcon={<SendIcon  />}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>


    </Box>
  );
};

export default ContactForm;