import React from 'react';

const TermsCondition = () => {
  return (
    <div className="bg-gray-50 text-gray-800 p-8">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-600 mb-4">
          Terms and Conditions
        </h1>
        <p className="text-xl text-gray-600">For Using the Gayatri Gaushala Dabhadi Services</p>
      </div>

      {/* Introduction Section */}
      <div className="mb-8">
        <p className="text-lg text-justify leading-relaxed">
          Welcome to Gayatri Gaushala Dabhadi. These Terms and Conditions ("Terms") apply to your use of
          our services and website. By accessing or using our website, services, or making any donations
          or contributions, you agree to be bound by these Terms and Conditions. If you do not agree with
          these Terms, please do not use our services.
        </p>
      </div>

      {/* General Terms Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">General Terms</h2>
        <ul className="list-decimal list-inside text-lg space-y-2 text-gray-700">
          <li>By using our website and services, you confirm that you are at least 18 years of age.</li>
          <li>We reserve the right to update these Terms from time to time, and it is your responsibility to stay informed of any changes.</li>
          <li>You must comply with all applicable local, state, and national laws while using our services.</li>
        </ul>
      </div>

      {/* Donation Terms Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Donation Terms</h2>
        <p className="text-lg text-justify leading-relaxed mb-4">
          Any donations made to Gayatri Gaushala Dabhadi are voluntary. By donating, you agree to the following:
        </p>
        <ul className="list-decimal list-inside text-lg space-y-2 text-gray-700">
          <li>All donations are non-refundable unless required by law.</li>
          <li>Donations are used exclusively for the care and well-being of the cows, maintaining the Gaushala, and other related activities.</li>
          <li>Donors may be publicly acknowledged unless otherwise requested. You can choose to remain anonymous if you wish.</li>
        </ul>
      </div>

      {/* Code of Conduct Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Code of Conduct</h2>
        <p className="text-lg text-justify leading-relaxed mb-4">
          At Gayatri Gaushala Dabhadi, we ask all individuals to adhere to the following code of conduct while visiting or interacting with the Gaushala:
        </p>
        <ul className="list-decimal list-inside text-lg space-y-2 text-gray-700">
          <li>Be respectful to the animals and the staff members at all times.</li>
          <li>Do not harm, disturb, or mistreat any animals in the Gaushala.</li>
          <li>Respect the rules and regulations set forth by the Gaushala management.</li>
          <li>Visitors should refrain from bringing food, beverages, or any other items that may disturb the animals.</li>
          <li>Only authorized personnel should handle the animals; please do not attempt to interact with or feed the cows unless permitted.</li>
        </ul>
      </div>

      {/* Liability Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Limitation of Liability</h2>
        <p className="text-lg text-justify leading-relaxed mb-4">
          Gayatri Gaushala Dabhadi will not be liable for any injuries, damages, or loss arising from your use of our services or visitation of the Gaushala, except where required by law. This includes, but is not limited to, any incidents involving the animals or property.
        </p>
      </div>

      {/* Privacy and Data Protection Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Privacy and Data Protection</h2>
        <p className="text-lg text-justify leading-relaxed mb-4">
          We respect your privacy. Any personal information collected will be handled in accordance with our privacy policy, which you can view separately. By using our website or services, you agree to our collection and use of personal data in accordance with applicable data protection laws.
        </p>
      </div>

      {/* Termination Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Termination</h2>
        <p className="text-lg text-justify leading-relaxed mb-4">
          We reserve the right to terminate or suspend access to our services or website at any time, without prior notice, for conduct that we believe violates these Terms and Conditions or is harmful to other users or the Gaushala.
        </p>
      </div>

      {/* Governing Law Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Governing Law</h2>
        <p className="text-lg text-justify leading-relaxed mb-4">
          These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes or claims arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Maharashtra, India.
        </p>
      </div>

      {/* Contact Us Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Contact Us</h2>
        <p className="text-lg text-justify leading-relaxed mb-4">
          If you have any questions regarding these Terms and Conditions or any other aspect of our services, please do not hesitate to contact us:
        </p>
        <p className="text-lg">Phone: (+91) 9765223337</p>
        <p className="text-lg">Email: sominathjaiwal@gmail.com</p>
      </div>

      {/* Footer Section */}
      <div className="text-center mt-10">
        <p className="text-lg text-gray-600">Thank you for supporting Gayatri Gaushala Dabhadi!</p>
      </div>
    </div>
  );
};

export default TermsCondition;
