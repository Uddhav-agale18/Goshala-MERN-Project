import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGalleryImages } from '../../adminPages/gallery/gallerySlice';

const Gallery = () => {
    const dispatch = useDispatch();
    const { images, loading } = useSelector((state) => state.gallery);

    useEffect(() => {
        dispatch(fetchGalleryImages());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="gallery-container py-12 bg-gray-50">
            {/* Title Section */}
            <h1 className="text-4xl font-extrabold text-red-600 mb-8 text-center">
                Photo Gallery
            </h1>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                {images.map((image) => (
                    <div
                        key={image._id}
                        className="gallery-item relative group overflow-hidden rounded-lg shadow-lg"
                    >
                        <img
                            src={`http://localhost:5000/uploads/${image.galleryImage}`}
                            alt="gallery"
                            className="w-full h-auto transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                        />
                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <p className="text-white text-lg font-semibold">View Image</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
