import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSliderImages, addSliderImage, deleteSliderImage } from './SliderSlice';

const UploadSlider = () => {
    const dispatch = useDispatch();
    const { images, loading } = useSelector((state) => state.slider);
    const [file, setFile] = useState(null);

    useEffect(() => {
        dispatch(fetchSliderImages());
    }, [dispatch]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAddImage = () => {
        if (file) {
            dispatch(addSliderImage(file));
            setFile(null);
        }
    };

    const handleDeleteImage = (id) => {
        dispatch(deleteSliderImage(id));
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            {/* File upload section */}
            <div className="mt-0">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="border border-gray-300 p-2 rounded-md mb-4"
                />
                <button
                    onClick={handleAddImage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 m-2"
                >
                    Upload Image
                </button>
            </div>
            <h2 className="text-3xl font-semibold mb-6">Slider Images</h2>

            {/* Table for displaying images */}
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-2 py-2 text-left border-r">Serial No.</th> {/* Border-right added */}
                            <th className="px-2 py-2 text-left border-r">Image</th> {/* Border-right added */}
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images.map((image, index) => (
                            <tr key={image._id} className="border-b">
                                <td className="px-2 py-2 text-center w-12">{index + 1}</td> {/* Reduced width */}
                                <td className="px-2 py-2 text-center">
                                    <img
                                        src={`http://localhost:5000/uploads/${image.sliderImage}`}
                                        alt="slider"
                                        className="w-24 h-24 object-cover rounded-lg" // Adjusted size here
                                    />
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleDeleteImage(image._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
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
    );
};

export default UploadSlider;
