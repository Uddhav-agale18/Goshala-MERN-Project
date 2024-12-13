import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogos, addLogo, deleteLogo } from './logoSlice';

const UploadLogo = () => {
  const dispatch = useDispatch();
  const { logos, loading, error } = useSelector((state) => state.logo);
  const [file, setFile] = useState(null);

  // Fetch logos on component mount
  useEffect(() => {
    dispatch(fetchLogos());
  }, [dispatch]);

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission for adding a logo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    // If there's an existing logo, delete it first
    if (logos.length > 0) {
      const currentLogoId = logos[0]._id; // Assuming only one logo exists at a time
      dispatch(deleteLogo(currentLogoId));
      // Optionally wait for the logo to be deleted before adding the new one
      // You could track the deletion status and only dispatch addLogo once the old logo is deleted
    }

    // Dispatch addLogo action to upload the new logo
    dispatch(addLogo(file));
    setFile(null);
  };

  // Handle logo deletion
  const handleDelete = (id) => {
    dispatch(deleteLogo(id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Logo Manager</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Add Logo Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8 w-full max-w-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="fileInput"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Upload Logo
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload Logo'}
        </button>
      </form>

      {/* Display Logos in Table */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Existing Logos</h2>
        {loading && <p className="text-gray-600">Loading logos...</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border text-left">#</th>
                <th className="px-4 py-2 border text-left">Logo</th>
                <th className="px-4 py-2 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {logos.map((logo, index) => (
                <tr key={logo._id} className="border-b">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border text-center">
                    <img
                      src={`http://localhost:5000/uploads/${logo.logo}`}
                      alt="Logo"
                      className="w-24 h-24 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleDelete(logo._id)}
                      disabled={loading}
                      className="bg-red-500 text-white text-sm font-medium py-1 px-3 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UploadLogo;
