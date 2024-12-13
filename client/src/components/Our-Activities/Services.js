import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Grid, Button } from '@mui/material';

// Sample list of services provided by Gayatri Goshala
const servicesList = [
  { id: 1, name: 'Cow Milking Services', description: 'Fresh and organic cow milk available daily.' },
  { id: 2, name: 'Goshala Visit and Tour', description: 'Guided tours to experience the traditional cow rearing.' },
  { id: 3, name: 'Cow Care and Treatment', description: 'Expert veterinary care for the cows of the Goshala.' },
  { id: 4, name: 'Organic Cow Dung and Manure', description: 'Natural fertilizers for farming and gardening.' },
  { id: 5, name: 'Milk Products (Curd, Ghee, etc.)', description: 'Pure and fresh milk products made from the cows.' },
  { id: 6, name: 'Goshala Volunteer Program', description: 'Join us in taking care of the cows and supporting the Goshala.' },
  { id: 7, name: 'Cow Yoga (Go-Yoga)', description: 'Practice yoga with cows to experience tranquility.' },
  { id: 8, name: 'Cow Adoption Program', description: 'Adopt a cow and contribute to its well-being and care.' },
];

const Services = () => {
  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Typography variant="h3" sx={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
        Services of Gayatri Goshala
      </Typography>

      <Grid container spacing={3}>
        {servicesList.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center', borderRadius: '8px', backgroundColor: '#fff' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                {service.name}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '10px', color: 'gray' }}>
                {service.description}
              </Typography>
              <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
                Learn More
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;
