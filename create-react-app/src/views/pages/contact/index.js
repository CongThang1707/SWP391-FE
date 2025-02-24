import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, Box } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import { styled } from '@mui/system';

const ContactButton = styled(Button)({
  background: '#1976d2',
  color: '#fff',
  '&:hover': {
    background: '#1565c0'
  },
  padding: '10px 20px',
  fontSize: '16px'
});

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.message) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert('Message sent successfully!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        We`re here to help and love to hear from you!
      </Typography>

      <Grid container spacing={4} mt={2}>
        {/* Form Liên Hệ */}
        <Grid item xs={12} md={6}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              error={Boolean(errors.message)}
              helperText={errors.message}
              margin="normal"
              multiline
              rows={4}
            />
            <Box textAlign="center" mt={2}>
              <ContactButton type="submit" variant="contained">
                Send
              </ContactButton>
            </Box>
          </Box>
        </Grid>

        {/* Thông tin liên hệ */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <LocationOn color="primary" sx={{ mr: 1 }} />
              <Typography>123 Main Street, Anytown, USA</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Phone color="primary" sx={{ mr: 1 }} />
              <Typography>+84 987 654 321</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Email color="primary" sx={{ mr: 1 }} />
              <Typography>contact@example.com</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Google Maps */}
      <Box mt={4}>
        <iframe
          title="Google Maps"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: '10px' }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8224670915146!2d105.80194431514345!3d21.0285112931596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3c99fc6593%3A0xf2f50d9c97b0f721!2sHanoi!5e0!3m2!1sen!2s!4v1631129345461!5m2!1sen!2s"
        ></iframe>
      </Box>
    </Container>
  );
};

export default ContactPage;
