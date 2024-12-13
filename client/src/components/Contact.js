import React from 'react';

const Contact = () => {
  return (
    <div className="contact-section py-12 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Title and Description */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-red-600 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600">We are here to assist you. Please reach out with any questions or concerns!</p>
        </div>

        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Get In Touch</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700">Message</label>
                <textarea
                  id="message"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  placeholder="Your Message"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details Section */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Details</h3>
            <ul className="space-y-4 text-lg text-gray-600">
              <li>
                <strong className="font-semibold">Address:</strong> Gayatri Gaushala Dabhadi, Maharashtra, India
              </li>
              <li>
                <strong className="font-semibold">Phone:</strong> +91 9765223337
              </li>
              <li>
                <strong className="font-semibold">Email:</strong> sominathjaiwal@gmail.com
              </li>
              
            </ul>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">Find Us on the Map</h3>
          <div className="w-full h-80 bg-gray-300 rounded-lg">
            {/* Embed Google Map */}
            <iframe
              title="Gayatri Gaushala Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238517.04227624585!2d73.9677440420041!3d19.07609962590311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bc6e8f2e4fdf%3A0x522a0eb5b3d0e8c8!2sGayatri%20Gaushala%2C%20Dabhadi!5e0!3m2!1sen!2sin!4v1630323306846!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
