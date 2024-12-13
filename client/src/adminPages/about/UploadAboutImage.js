import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutImages, addAboutImage, deleteAboutImage } from './aboutImageSlice';

const UploadAboutImage = () => {
  const dispatch = useDispatch();
  const { aboutImages, loading, error } = useSelector((state) => state.aboutImage);
  const [file, setFile] = useState(null);

  // Fetch about images on component mount
  useEffect(() => {
    dispatch(fetchAboutImages());
  }, [dispatch]);

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission for adding an about image
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    // If there's an existing about image, delete it first
    if (aboutImages.length > 0) {
      const currentImageId = aboutImages[0]._id; // Assuming only one image exists at a time
      dispatch(deleteAboutImage(currentImageId));
      
    }

    // Dispatch addAboutImage action to upload the new about image
    dispatch(addAboutImage(file));
    setFile(null);
  };

  // Handle image deletion
  const handleDelete = (id) => {
    dispatch(deleteAboutImage(id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">About Image Manager</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Add About Image Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8 w-full max-w-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="fileInput"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Upload About Image
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
          {loading ? 'Uploading...' : 'Upload About Image'}
        </button>
      </form>

      {/* Display About Images in Table */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Existing About Images</h2>
        {loading && <p className="text-gray-600">Loading images...</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border text-left">#</th>
                <th className="px-4 py-2 border text-left">Image</th>
                <th className="px-4 py-2 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {aboutImages.map((aboutImage, index) => (
                <tr key={aboutImage._id} className="border-b">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border text-center">
                    <img
                      src={`http://localhost:5000/uploads/${aboutImage.aboutImage}`}
                      alt="About Image"
                      className="w-24 h-24 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleDelete(aboutImage._id)}
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

export default UploadAboutImage;
