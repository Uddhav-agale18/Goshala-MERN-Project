import React, { useState } from 'react';
import { Drawer, Menu, MenuItem, Button, List, ListItem, ListItemText, Divider, Box, Typography, ListItemIcon } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';
import { Dashboard, Settings, Person, ExitToApp, Notifications, Widgets, Pages, InsertEmoticon, Slideshow, Edit, PhotoLibrary, RateReview } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info'; // You can replace this with any other icon
import ContactsIcon from '@mui/icons-material/Contacts'; // Import the Contacts icon

const Sidebar = ({ open, toggleDrawer }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElLogo, setAnchorElLogo] = useState(null); // Separate state for this dropdown
    const handleOpenLogoMenu = (event) => {
        setAnchorElLogo(event.currentTarget); // Set the button as the anchor
    };

    const handleCloseLogoMenu = () => {
        setAnchorElLogo(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Drawer
            sx={{
                width: open ? 240 : 60,
                backgroundColor: 'black',
                boxSizing: 'border-box',
                color: 'white',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: open ? 240 : 60,
                    boxSizing: 'border-box',
                    backgroundColor: 'black',
                    color: 'white',
                    paddingTop: '10px', // Padding for top spacing
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <Box sx={{ width: open ? 240 : 60, color: 'white' }}>
                {/* Admin Panel Heading */}
                {open && (
                    <Typography
                        variant="h6"
                        sx={{
                            padding: '16px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: 'white',
                        }}
                    >
                        Admin Panel
                    </Typography>
                )}

                <List>
                    {/* Dashboard Link */}
                    <ListItem button component={Link} to="/admin/" sx={{ color: 'white', '&:hover': { backgroundColor: 'gray' } }}>
                        <ListItemIcon sx={{ color: 'white' }}>
                            <Dashboard />
                        </ListItemIcon>
                        {open && <ListItemText primary="Dashboard" sx={{ color: 'white' }} />}
                    </ListItem>

                    {/* Logo Link */}
                    <Button
                        aria-controls="logo-menu"
                        aria-haspopup="true"
                        onClick={handleOpenLogoMenu}
                        startIcon={<Menu />}
                        endIcon={<ArrowDropDownIcon />}
                        sx={{
                            backgroundColor: '#1976d2',
                            color: 'white',
                            '&:hover': { backgroundColor: '#1565c0' },
                            padding: '8px 16px',
                            borderRadius: '8px',
                            marginBottom: '10px',
                            width: '100%',
                        }}
                    >
                        Header Section
                    </Button>

                    {/* Dropdown Menu */}
                    <Menu
                        id="logo-menu"
                        anchorEl={anchorElLogo}
                        open={Boolean(anchorElLogo)}
                        onClose={handleCloseLogoMenu}
                    >
                        <MenuItem component={Link} to="/admin/logo" onClick={handleCloseLogoMenu}>
                            <ListItemIcon>
                                <InsertEmoticon />
                            </ListItemIcon>
                            <ListItemText primary="Change Logo" />
                        </MenuItem>

                        <MenuItem component={Link} to="/admin/logo-name" onClick={handleCloseLogoMenu}>
                            <ListItemIcon>
                                <Edit />
                            </ListItemIcon>
                            <ListItemText primary="Change Logo Name" />
                        </MenuItem>
                    </Menu>

                    {/* Slider Link */}
                    <ListItem button component={Link} to="/admin/slider" sx={{ color: 'white', '&:hover': { backgroundColor: 'gray' } }}>
                        <ListItemIcon sx={{ color: 'white' }}>
                            <Slideshow />
                        </ListItemIcon>
                        {open && <ListItemText primary="Change Slider Images" sx={{ color: 'white' }} />}
                    </ListItem>

                    {/* Gallery Link */}
                    <ListItem button component={Link} to="/admin/gallery" sx={{ color: 'white', '&:hover': { backgroundColor: 'gray' } }}>
                        <ListItemIcon sx={{ color: 'white' }}>
                            <PhotoLibrary />
                        </ListItemIcon>
                        {open && <ListItemText primary="Change Gallery Images" sx={{ color: 'white' }} />}
                    </ListItem>

                    {/* Change About Section Button */}
                    <Button
                        aria-controls="change-about-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        variant="contained"
                        color="primary"
                        // startIcon={<InfoIcon />}
                        endIcon={<ArrowDropDownIcon />}
                        sx={{
                            marginBottom: '10px',
                            width: '100%',
                            '&:hover': { backgroundColor: '#1565c0' },
                        }}
                    >
                        About Section
                    </Button>

                    {/* About Section Dropdown Menu */}
                    <Menu
                        id="change-about-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <MenuItem component={Link} to="/admin/image" onClick={handleClose}>
                            <ListItemIcon>
                                <InsertEmoticon /> {/* You can use the same icon or change it as needed */}
                            </ListItemIcon>
                            <ListItemText primary="Change About Image" />
                        </MenuItem>
                        <MenuItem component={Link} to="/admin/details" onClick={handleClose}>
                            <ListItemIcon>
                                <Edit /> {/* Same icon or choose a different one */}
                            </ListItemIcon>
                            <ListItemText primary="Change About Details" />
                        </MenuItem>

                    </Menu>

                    {/* Contacts Link */}
                    <ListItem button component={Link} to="/admin/contacts" sx={{ color: 'white', '&:hover': { backgroundColor: 'gray' } }}>
                        <ListItemIcon sx={{ color: 'white' }}>
                            <ContactsIcon />
                        </ListItemIcon>
                        {open && <ListItemText primary="Change Contact Details" sx={{ color: 'white' }} />}
                    </ListItem>

                    <ListItem button component={Link} to="/admin/add-review" sx={{ color: 'white', '&:hover': { backgroundColor: 'gray' } }}>
    <ListItemIcon sx={{ color: 'white' }}>
        <RateReview />
    </ListItemIcon>
    {open && <ListItemText primary="Add Reviews" sx={{ color: 'white' }} />}
</ListItem>
                   

                    {/* Profile Link */}
                    <ListItem button component={Link} to="/admin/profile" sx={{ color: 'white', '&:hover': { backgroundColor: 'gray' } }}>
                        <ListItemIcon sx={{ color: 'white' }}>
                            <Person />
                        </ListItemIcon>
                        {open && <ListItemText primary="Profile" sx={{ color: 'white' }} />}
                    </ListItem>

                    {/* Notifications Link */}
                    <ListItem button component={Link} to="/admin/notifications" sx={{ color: 'white', '&:hover': { backgroundColor: 'gray' } }}>
                        <ListItemIcon sx={{ color: 'white' }}>
                            <Notifications />
                        </ListItemIcon>
                        {open && <ListItemText primary="Notifications" sx={{ color: 'white' }} />}
                    </ListItem>

                    {/* Widgets Link */}
                    <ListItem button component={Link} to="/admin/widgets" sx={{ color: 'white', '&:hover': { backgroundColor: 'gray' } }}>
                        <ListItemIcon sx={{ color: 'white' }}>
                            <Widgets />
                        </ListItemIcon>
                        {open && <ListItemText primary="Widgets" sx={{ color: 'white' }} />}
                    </ListItem>

                    {/* Pages Link */}
                    <ListItem button component={Link} to="/admin/pages" sx={{ color: 'white', '&:hover': { backgroundColor: 'gray' } }}>
                        <ListItemIcon sx={{ color: 'white' }}>
                            <Pages />
                        </ListItemIcon>
                        {open && <ListItemText primary="Pages" sx={{ color: 'white' }} />}
                    </ListItem>

                    {/* Settings Link */}
                    <ListItem button component={Link} to="/admin/settings" sx={{ color: 'white', '&:hover': { backgroundColor: 'gray' } }}>
                        <ListItemIcon sx={{ color: 'white' }}>
                            <Settings />
                        </ListItemIcon>
                        {open && <ListItemText primary="Settings" sx={{ color: 'white' }} />}
                    </ListItem>

                    {/* Logout Link */}
                    <Divider sx={{ backgroundColor: 'white' }} />
                    <ListItem button sx={{ color: 'white', '&:hover': { backgroundColor: 'gray' } }}>
                        <ListItemIcon sx={{ color: 'white' }}>
                            <ExitToApp />
                        </ListItemIcon>
                        {open && <ListItemText primary="Logout" sx={{ color: 'white' }} />}
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
