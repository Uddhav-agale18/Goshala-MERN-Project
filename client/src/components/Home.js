import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import Slider from 'react-slick';
import Star from '../images/star3.png';
import { fetchSliderImages } from '../adminPages/slider/SliderSlice'; // Replace with actual action
import { fetchLogos } from '../adminPages/logo/logoSlice';
import { fetchAboutImages } from '../adminPages/about/aboutImageSlice';
import { fetchLogoName } from '../adminPages/logo/logoNameSlice'
import { fetchGalleryImages } from '../adminPages/gallery/gallerySlice'
import { useVisibility } from '../VisibilityContext';
import { Box, Typography } from '@mui/material';
import { fetchTestimonials } from '../adminPages/testimonials/TestimonialSlice';
const Home = () => {
  const dispatch = useDispatch();

  // All hooks should be placed unconditionally
  const { images } = useSelector((state) => state.slider);
  const { logos, loading, error } = useSelector((state) => state.logo);
  const { aboutImages } = useSelector((state) => state.aboutImage);
  const { logoName } = useSelector((state) => state.logoName);
  const [about, setAbout] = useState(null);
  const { images: galleryImages, loading: galleryLoading } = useSelector(
    (state) => state.gallery
  );
  const { servicesVisible, brandsVisible, productsVisible } = useVisibility();
  const { testimonials, status } = useSelector((state) => state.testimonials);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch data in a single useEffect without conditionally calling it
  useEffect(() => {
    dispatch(fetchGalleryImages());
    dispatch(fetchLogoName());
    dispatch(fetchLogos());
    dispatch(fetchSliderImages());
    dispatch(fetchAboutImages());
    dispatch(fetchTestimonials());

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/about");
        if (!response.ok) {
          throw new Error("Failed to fetch about data");
        }
        const data = await response.json();
        console.log("Fetched about data:", data);
        setAbout(data);
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  // Automatically change the slide every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [images.length]);

  // Render loading and error states here
  if (galleryLoading || loading) return <p>Loading...</p>;

  // Render error state
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (status === "loading") return <p>Loading testimonials...</p>;

  // Slide navigation logic
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-screen-xl mx-auto p-3">
  {/* <img src={Logo1} alt="Logo" className="h-16 sm:h-20 md:h-28 rounded-full mb-4" /> */}
  {loading && <p>Loading logo...</p>}
  {error && <p className="text-red-500">{error}</p>}

  {logos.length > 0 && (
    <div className="h-20 sm:h-20 md:h-24 rounded-full mb-2"> {/* Reduced height */}
      <img
        src={`http://localhost:5000/uploads/${logos[0].logo}`}
        alt="Logo"
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  )}

  <div className="text-center mb-2">
    <p className="text-xs sm:text-sm md:text-base font-medium text-gray-700">
      || गावो विश्वस्य मातर: ||
    </p>
    {logoName.map((logo) => (
      <h1 key={logo._id} className="text-xl font-bold">{logo.name}</h1>
    ))}
  </div>

  <button className="relative flex items-center justify-center animate-pulse">
    <img src={Star} alt="Visit" className="w-28 h-20 rounded-full" /> {/* Reduced size */}
    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs sm:text-xs md:text-xs font-bold text-blue-900">
      Online Gaushala Visit
    </span>
  </button>
</div>


      <div className="bg-gray-100 py-0 mt-0">

        {/* Slider Section */}
        <div className="relative w-full mt-0 overflow-hidden">
          {images.length ? (
            <>
              {/* Image Wrapper */}
              <div
                className="slider flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="slide min-w-full h-96 relative"
                    style={{ transition: 'transform 0.3s' }}
                  >
                    <img
                      src={`http://localhost:5000/uploads/${img.sliderImage}`}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg absolute top-0 left-0"
                    />
                  </div>
                ))}
              </div>

              {/* Previous Button */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white text-2xl rounded-full p-3 opacity-50 hover:opacity-100 transition-opacity duration-300 z-10"
              >
                ❮
              </button>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white text-2xl rounded-full p-3 opacity-50 hover:opacity-100 transition-opacity duration-300 z-10"
              >
                ❯
              </button>
            </>
          ) : (
            <p className="text-center text-gray-500">No images to display</p>
          )}
        </div>
        {/* About Section */}
        <div className="max-w-screen-xl mx-auto px-6 py-12 bg-white shadow-lg rounded-lg mb-12">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0">
            {/* Image Section */}
            <div className="w-full md:w-1/2">
              {aboutImages.length > 0 ? (
                <div className="h-64 sm:h-80 md:h-96 rounded-lg mb-6">
                  <img
                    src={`http://localhost:5000/uploads/${aboutImages[0].aboutImage}`}
                    alt="About Image"
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              ) : (
                <p className="text-center text-gray-500">No about image available</p>
              )}
            </div>

            {/* Text Section */}


            <div className="w-full md:w-1/2 md:ml-8 mt-6 md:mt-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 underline">
                {about ? about.title : 'Loading...'}
              </h2>
              <p className="text-lg text-gray-700">
                {about ? about.description : 'Please wait while we fetch the data.'}
              </p> </div>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="max-w-screen-xl mx-auto px-6 py-12 bg-white shadow-lg rounded-lg mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Vision */}
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 underline">Our Vision</h2>
              <p className="text-lg text-gray-700">
                {about ? about.vision : 'Loading...'}       </p>

            </div>

            {/* Mission */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 underline">Our Mission</h2>
              <p className="text-lg text-gray-700">
                {about ? about.mission : 'Loading...'}            </p>
            </div>
          </div>
        </div>

        <div>
  {servicesVisible && (
    <Box
      sx={{
        padding: '40px',
        backgroundColor: '#e0f7fa', // Light cyan background for freshness
        marginTop: '30px',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)', // Larger shadow for depth
        textAlign: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)', // Slight lift on hover
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)', // More prominent shadow on hover
        },
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#007BFF', marginBottom: '15px' }}>
        Our Services
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px', fontSize: '18px' }}>
        At Gayatri Goshala, we provide high-quality services related to cow care, organic farming, and community outreach. Our services include:
      </Typography>
      <ul style={{ listStyleType: 'none', paddingLeft: 0, marginTop: '15px' }}>
        <li style={{ padding: '8px 0', fontSize: '16px', fontWeight: '500' }}>
          • Cow care and maintenance
        </li>
        <li style={{ padding: '8px 0', fontSize: '16px', fontWeight: '500' }}>
          • Organic milk production
        </li>
        <li style={{ padding: '8px 0', fontSize: '16px', fontWeight: '500' }}>
          • Training programs for organic farming
        </li>
        <li style={{ padding: '8px 0', fontSize: '16px', fontWeight: '500' }}>
          • Community awareness on animal welfare
        </li>
        <li style={{ padding: '8px 0', fontSize: '16px', fontWeight: '500' }}>
          • Traditional cow products such as ghee, dung, and urine for medicinal purposes
        </li>
      </ul>
    </Box>
  )}

  {brandsVisible && (
    <Box
      sx={{
        padding: '40px',
        backgroundColor: '#f4f4f4',
        marginTop: '30px',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
        textAlign: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#28a745', marginBottom: '15px' }}>
        Our Brands
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px', fontSize: '18px' }}>
        Gayatri Goshala collaborates with several trusted brands to promote organic products and animal welfare. Some of the brands we partner with include:
      </Typography>
      <ul style={{ listStyleType: 'none', paddingLeft: 0, marginTop: '15px' }}>
        <li style={{ padding: '8px 0', fontSize: '16px', fontWeight: '500' }}>
          • Gayatri Dairy: Known for its pure and organic cow milk.
        </li>
        <li style={{ padding: '8px 0', fontSize: '16px', fontWeight: '500' }}>
          • Gaushala Organics: Partnering in the promotion of organic farming products.
        </li>
        <li style={{ padding: '8px 0', fontSize: '16px', fontWeight: '500' }}>
          • Gokul Natural: Providing natural medicinal products made from cow's ghee and dung.
        </li>
        <li style={{ padding: '8px 0', fontSize: '16px', fontWeight: '500' }}>
          • Shree Gaayatri Ghee: A premium brand for pure, traditional cow ghee.
        </li>
      </ul>
    </Box>
  )}

  {productsVisible && (
    <Box
      sx={{
        padding: '40px',
        backgroundColor: '#fff3cd', // Light yellow background for warmth
        marginTop: '30px',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
        textAlign: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#ff5733', marginBottom: '15px' }}>
        Our Products
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px', fontSize: '18px' }}>
        We offer a range of products made from the purest cow milk and organic farming methods. Here are some of the products available at Gayatri Goshala:
      </Typography>
      <ul style={{ listStyleType: 'none', paddingLeft: 0, marginTop: '15px' }}>
        <li style={{ padding: '8px 0', fontSize: '16px', fontWeight: '500' }}>
          • <strong>Organic Cow Milk:</strong> Fresh and nutritious milk from our well-cared cows.
        </li>
        <li style={{ padding: '8px 0', fontSize: '16px', fontWeight: '500' }}>
          • <strong>Ghee:</strong> Pure, traditional cow ghee made with care and love.
        </li>
        <li style={{ padding: '8px 0', fontSize: '16px', fontWeight: '500' }}>
          • <strong>Cow Dung Cakes:</strong> Used for traditional rituals and eco-friendly fuel.
        </li>
        <li style={{ padding: '8px 0', fontSize: '16px', fontWeight: '500' }}>
          • <strong>Herbal Cow Urine:</strong> Used for medicinal purposes and Ayurvedic treatments.
        </li>
        <li style={{ padding: '8px 0', fontSize: '16px', fontWeight: '500' }}>
          • <strong>Organic Fertilizers:</strong> Made from cow dung and other natural elements for sustainable farming.
        </li>
      </ul>
    </Box>
  )}
</div>

        <section className="py-8 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">What Our Users Say</h2>
          <div className="max-w-6xl mx-auto px-4">
            {testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial._id}
                    className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
                  >

                    <p className="text-gray-600 italic mb-4">"{testimonial.feedback}"</p>
                    <h3 className="text-gray-800 font-semibold text-right">
                      {testimonial.name}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No testimonials available.</p>
            )}
          </div>
        </section>


        <div className="p-6 bg-gray-50">
          <h2 className="text-center font-bold text-2xl mb-6">Photo Gallery</h2>
          <Slider {...sliderSettings}>
            {galleryImages.map((image) => (
              <div key={image._id} className="p-2">
                <img
                  src={`http://localhost:5000/uploads/${image.galleryImage}`}
                  alt="gallery"
                  className="w-full h-auto"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <a
        href="tel:+9765223337"
        className="fixed bottom-20 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center animate-bounce mb-10"
      >
        <FaPhoneAlt size={24} />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/9765223337"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center animate-bounce mb-7"
      >
        <FaWhatsapp size={24} />
      </a>

    </div>
  );
};

export default Home;
