import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContact } from '../../adminPages/contacts/contactSlice';
import { FiPhone, FiMail } from "react-icons/fi";

const AboutUs = () => {
  const dispatch = useDispatch();
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state to handle loading state
  const { contact } = useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(fetchContact());  // Fetch contact details when the component mounts
  }, [dispatch]);

  // Fetch data inside useEffect to avoid infinite loop
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/about");
        if (!response.ok) {
          throw new Error("Failed to fetch about data");
        }
        const data = await response.json();
        console.log("Fetched about data:", data);
        setAbout(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching about data:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData(); // Call the fetchData function inside useEffect
  }, []); // Empty dependency array to run only once when component mounts

  return (
    <div className="bg-gray-50 text-gray-800 p-8">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-600 mb-4">
          {loading ? 'Loading...' : about ? about.title : 'Error'}
        </h1>
        <p className="text-xl text-gray-600">A place of compassion and care for our beloved cows</p>
      </div>

      {/* Introduction Section */}
      <div className="mb-8">
        <p className="text-lg text-justify leading-relaxed">
          {loading ? 'Please wait while we fetch the data.' : about ? about.description : 'Error loading data.'}
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Our Mission</h2>
        <p>
          {loading ? 'Loading vision...' : about ? about.mission : 'Error loading data.'}
        </p>
      </div>

      {/* Our Values Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Our Mission</h2>
        <p>
          {loading ? 'Loading vision...' : about ? about.vision : 'Error loading data.'}
        </p>
      </div>

      {/* How You Can Help Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">How You Can Help</h2>
        <p className="text-lg text-justify leading-relaxed mb-4">
          At Gayatri Gaushala Dabhadi, we are always looking for ways to engage the community and invite
          people to contribute to the cause. Whether it’s through donations, volunteering, or spreading
          awareness, there are many ways you can support our mission:
        </p>
        <ul className="list-disc list-inside text-lg space-y-2 text-gray-700">
          <li>Make a donation to support our operations and ensure the well-being of the cows</li>
          <li>Volunteer your time and skills to help care for the cows and maintain the Gaushala</li>
          <li>Spread awareness about the importance of cow welfare in our community</li>
          <li>Adopt a cow or sponsor their upkeep for a year or more</li>
        </ul>
      </div>

      {/* Contact Us Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-semibold text-red-600 mb-6">Contact Us</h2>
        <p className="text-lg text-justify leading-relaxed mb-6">
          We would love for you to visit Gayatri Gaushala Dabhadi, learn about our work, and interact with the cows.
          Your presence will help us in our mission of spreading love and care for these wonderful animals.
        </p>

        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-700">Address:</p>
          <p className="text-lg text-gray-700 mb-4">Gayatri Gaushala Dabhadi, Tq. Badnapur, Dist. Jalna, Maharashtra, India</p>
          
          {contact && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FiPhone className="text-amber-200 text-xl" />
                <span className="text-lg">{contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="text-amber-200 text-xl" />
                <span className="text-lg">{contact.email}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="text-center mt-6">
        <a
          href="https://www.paypal.com/donate?hosted_button_id=XXXXXXX"
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 text-lg font-semibold"
        >
          Donate Now
        </a>
        <p className="mt-2">To support Gaushala</p>
      </div>
    </div>
  );
};

export default AboutUs;
