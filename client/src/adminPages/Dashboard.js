import React, { useState, useEffect } from 'react';
import { Button, IconButton, Typography, Box, Paper } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { SketchPicker } from 'react-color';
import { useVisibility } from '../VisibilityContext';
import Header from '../components/Header';
import Footer from '../components/Footer'; // Import Footer component

const Dashboard = () => {
  const { toggleVisibility, servicesVisible, brandsVisible, productsVisible } = useVisibility();
  
  // State to handle colors and color picker visibility
  const [headerColor, setHeaderColor] = useState('#950f0f'); // Default header color
  const [footerColor, setFooterColor] = useState('#0f2a95'); // Default footer color
  const [showHeaderColorPicker, setShowHeaderColorPicker] = useState(false);
  const [showFooterColorPicker, setShowFooterColorPicker] = useState(false);

  // Load colors from localStorage when the component mounts
  useEffect(() => {
    const savedHeaderColor = localStorage.getItem('headerColor');
    const savedFooterColor = localStorage.getItem('footerColor');
    if (savedHeaderColor) {
      setHeaderColor(savedHeaderColor);
    }
    if (savedFooterColor) {
      setFooterColor(savedFooterColor);
    }
  }, []);

  const handleHeaderColorChange = (color) => {
    setHeaderColor(color.hex);
    localStorage.setItem('headerColor', color.hex); // Save header color to localStorage
  };

  const handleFooterColorChange = (color) => {
    setFooterColor(color.hex);
    localStorage.setItem('footerColor', color.hex); // Save footer color to localStorage
  };

  return (
    <div>
     
      <Box sx={{ padding: '20px', backgroundColor: '#f4f6f8', boxShadow: 3 }}>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Dashboard
        </Typography>

        {/* Color Picker Section for Header */}
        <Paper sx={{ padding: '15px', marginBottom: '20px' }}>
          <Typography variant="h6">Change Header Color</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowHeaderColorPicker(!showHeaderColorPicker)}
            sx={{ marginBottom: '10px' }}
          >
            {showHeaderColorPicker ? 'Close Header Color Picker' : 'Open Header Color Picker'}
          </Button>
          {showHeaderColorPicker && (
            <div>
              <SketchPicker color={headerColor} onChangeComplete={handleHeaderColorChange} />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleHeaderColorChange({ hex: headerColor })}
                sx={{ marginTop: '10px' }}
              >
                Add Color
              </Button>
            </div>
          )}
        </Paper>

        {/* Color Picker Section for Footer */}
        <Paper sx={{ padding: '15px', marginBottom: '20px' }}>
          <Typography variant="h6">Change Footer Color</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowFooterColorPicker(!showFooterColorPicker)}
            sx={{ marginBottom: '10px' }}
          >
            {showFooterColorPicker ? 'Close Footer Color Picker' : 'Open Footer Color Picker'}
          </Button>
          {showFooterColorPicker && (
            <div>
              <SketchPicker color={footerColor} onChangeComplete={handleFooterColorChange} />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleFooterColorChange({ hex: footerColor })}
                sx={{ marginTop: '10px' }}
              >
                Add Color
              </Button>
            </div>
          )}
        </Paper>

        {/* Toggle Buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Button
            variant="contained"
            color={servicesVisible ? 'primary' : 'error'}
            onClick={() => toggleVisibility('services')}
            startIcon={servicesVisible ? <ExpandLess /> : <ExpandMore />}
            sx={{
              padding: '10px 20px',
              textTransform: 'none',
              justifyContent: 'space-between',
              width: '150px',
            }}
          >
            {servicesVisible ? 'Close Services' : 'Open Services'}
          </Button>

          <Button
            variant="contained"
            color={brandsVisible ? 'primary' : 'error'}
            onClick={() => toggleVisibility('brands')}
            startIcon={brandsVisible ? <ExpandLess /> : <ExpandMore />}
            sx={{
              padding: '10px 20px',
              textTransform: 'none',
              justifyContent: 'space-between',
              width: '150px',
            }}
          >
            {brandsVisible ? 'Close Brands' : 'Open Brands'}
          </Button>

          <Button
            variant="contained"
            color={productsVisible ? 'primary' : 'error'}
            onClick={() => toggleVisibility('products')}
            startIcon={productsVisible ? <ExpandLess /> : <ExpandMore />}
            sx={{
              padding: '10px 20px',
              textTransform: 'none',
              justifyContent: 'space-between',
              width: '150px',
            }}
          >
            {productsVisible ? 'Close Products' : 'Open Products'}
          </Button>
        </Box>
      </Box>
   </div>
  );
};

export default Dashboard;
