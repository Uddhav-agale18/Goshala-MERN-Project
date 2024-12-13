import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './components/Home';
import Contact from './components/Contact';
import TermsCondition from './components/TermsCondition';

// Donation Pages
import MyPayments from './components/My Donation/MyPayments';
import MonthlyDonation from './components/My Donation/MonthlyDonation';
import ConsolidatedReceipts from './components/My Donation/ConsolidatedReceipts';
import AdoptCow from './components/Donation/AdoptCow';
import Food from './components/Donation/Food';
import Service from './components/Donation/Service';
import Medical from './components/Donation/Medical';

// Adopt Gauvansh Pages
import MyAdopt from './components/Adopt A Gauvansh/MyAdopt';
import Adopt from './components/Adopt A Gauvansh/Adopt';
import ExtraActivity from './components/Adopt A Gauvansh/ExtraActivity';

// Other Pages
import CelebrateEvent from './components/CelebrateEvent';
import References from './components/References';
import RaiseConcern from './components/RaiseConcern ';
import Communication from './components/Communication ';
import Csr from './components/Csr';

// Our Activities Pages
import OurActivity from './components/Our-Activities/Services';
import Gallery from './components/Our-Activities/Gallery';
import AboutUs from './components/Our-Activities/AboutUs';
import Benifits from './components/Our-Activities/Benifits';

// Admin Panel
import MainContent from './adminPanel/MainContent';
import Dashboard from './adminPages/Dashboard';
import Profile from './adminPages/Profile';
import Settings from './adminPages/settings/Settings';
import UploadLogo from './adminPages/logo/UploadLogo';
import UpdateLogoName from './adminPages/logo/UpdateLogoName'
import UploadSlider from './adminPages/slider/UploadSlider';
import AdminAbout from './adminPages/about/AdminAbout';
import AboutImage from './adminPages/about/UploadAboutImage';
import UploadAboutImage from './adminPages/about/UploadAboutImage';
import UploadGallery from './adminPages/gallery/UploadGallery';
import Contacts from './adminPages/contacts/Contacts';
import Services from './components/Our-Activities/Services';
import { VisibilityProvider } from './VisibilityContext';
import Testimonial from './adminPages/testimonials/Testimonial';
import { ColorProvider } from './ColorContext';


function App() {
  const location = useLocation();

  // Check if the current route is part of the admin panel
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {/* Render Header only on non-admin routes */}
      {!isAdminRoute && <Header />}

      <Routes>
        {/* General Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms-and-conditions" element={<TermsCondition />} />

        {/* Donation Routes */}
        <Route path="/my-donation/my-payments" element={<MyPayments />} />
        <Route path="/my-donation/monthly-donation" element={<MonthlyDonation />} />
        <Route path="/my-donation/consolidated-receipt" element={<ConsolidatedReceipts />} />
        <Route path="/donation/book-your-sewa/food-for-under-privileged" element={<Food />} />
        <Route path="/donation/book-your-sewa/adopt-cows" element={<AdoptCow />} />
        <Route path="/donation/book-your-sewa/service-to-mother-cow" element={<Service />} />
        <Route path="/donation/book-your-sewa/medical-emergency" element={<Medical />} />

        {/* Adopt Gauvansh Routes */}
        <Route path="/adopt-gauvansh/adopt-gauvansh" element={<MyAdopt />} />
        <Route path="/adopt-gauvansh/my-adopted-cow" element={<Adopt />} />
        <Route path="/adopt-gauvansh/extra-activity" element={<ExtraActivity />} />

        {/* Other Routes */}
        <Route path="/celebrate-event" element={<CelebrateEvent />} />
        <Route path="/csr" element={<Csr />} />
        <Route path="/references" element={<References />} />
        <Route path="/raise-concern" element={<RaiseConcern />} />
        <Route path="/communication" element={<Communication />} />

        {/* Our Activities Routes */}
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/benefits-of-cow" element={<Benifits />} />

        {/* Admin Panel */}
        <Route path="/admin" element={<MainContent />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logo" element={<UploadLogo />} />
          <Route path="logo-name" element={<UpdateLogoName />} />
          <Route path="slider" element={<UploadSlider />} />
          <Route path="image" element={<UploadAboutImage />} />
          <Route path="details" element={<AdminAbout />} />
          <Route path="gallery" element={<UploadGallery />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="add-review" element={<Testimonial />} />

         

        </Route>
      </Routes>

      {/* Render Footer only on non-admin routes */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
    <VisibilityProvider>
      <ColorProvider>
        <App />
      </ColorProvider>
    </VisibilityProvider>
  </Router>  );
}
