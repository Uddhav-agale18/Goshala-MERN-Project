import { configureStore } from '@reduxjs/toolkit';
import logoReducer from './adminPages/logo/logoSlice';
import sliderReducer from './adminPages/slider/SliderSlice';
import aboutReducer from './adminPages/about/aboutSlice';
import aboutImageReducer from './adminPages/about/aboutImageSlice';
import logoNameReducer from './adminPages/logo/logoNameSlice';
import galleryReducer from './adminPages/gallery/gallerySlice'
import contactReducer from './adminPages/contacts/contactSlice'
import testimonialReducer from './adminPages/testimonials/TestimonialSlice'
const store = configureStore({
  reducer: {
    logo: logoReducer,
    slider: sliderReducer,
    about: aboutReducer,
    aboutImage: aboutImageReducer,
    logoName: logoNameReducer,
    gallery: galleryReducer,
    contact: contactReducer,
    testimonials: testimonialReducer,


  },
});

export default store;
