import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAbout, updateAbout, deleteAbout, createAbout } from './aboutSlice';

const AdminAbout = () => {
    const dispatch = useDispatch();
    const { about, loading, error } = useSelector((state) => state.about);

    const [form, setForm] = useState({
        id: '',
        title: '',
        description: '',
        mission: '',
        vision: '',
    });

    const [editField, setEditField] = useState('');

    // Fetch the about data on component mount
    useEffect(() => {
        dispatch(fetchAbout());
    }, [dispatch]);

    // Sync form state when 'about' data changes
    useEffect(() => {
        if (about && about._id) {
            setForm({
                id: about._id,
                title: about.title,
                description: about.description,
                mission: about.mission,
                vision: about.vision,
            });
        }
    }, [about]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission to update "About" page data
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateAbout(form));
        setEditField(''); // Close the form after submitting
    };

    // Handle edit action to show the field-specific edit form
    const handleEdit = (field) => {
        setEditField(field);
    };

    // Handle delete action for the "About" page
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this content?')) {
            dispatch(deleteAbout(id));
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Admin - About Page Management</h2>

            {loading && <p className="text-center text-lg text-blue-500">Loading...</p>}
            {error && <p className="text-center text-lg text-red-500">{`Error: ${error}`}</p>}

            {/* Display existing About information with edit and delete options */}
            {about && about._id && (
                <div className="mt-6 p-6 bg-gray-100 rounded-md shadow-md">
                    <div className="overflow-x-auto mt-4">
                        <table className="min-w-full table-auto">
                            <tbody>
                                {/* Title Row */}
                                <tr>
                                    <td className="px-4 py-2 font-semibold text-gray-700">Title</td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {editField === 'title' ? (
                                            <input
                                                type="text"
                                                name="title"
                                                value={form.title}
                                                onChange={handleChange}
                                                className="p-2 border border-gray-300 rounded-md"
                                            />
                                        ) : (
                                            about.title
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {editField === 'title' ? (
                                            <button
                                                onClick={handleSubmit}
                                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleEdit('title')}
                                                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </td>
                                </tr>

                                {/* Description Row */}
                                <tr>
                                    <td className="px-4 py-2 font-semibold text-gray-700">Description</td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {editField === 'description' ? (
                                            <textarea
                                                name="description"
                                                value={form.description}
                                                onChange={handleChange}
                                                className="p-2 border border-gray-300 rounded-md"
                                            />
                                        ) : (
                                            about.description
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {editField === 'description' ? (
                                            <button
                                                onClick={handleSubmit}
                                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleEdit('description')}
                                                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </td>
                                </tr>

                                {/* Mission Row */}
                                <tr>
                                    <td className="px-4 py-2 font-semibold text-gray-700">Mission</td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {editField === 'mission' ? (
                                            <input
                                                type="text"
                                                name="mission"
                                                value={form.mission}
                                                onChange={handleChange}
                                                className="p-2 border border-gray-300 rounded-md"
                                            />
                                        ) : (
                                            about.mission
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {editField === 'mission' ? (
                                            <button
                                                onClick={handleSubmit}
                                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleEdit('mission')}
                                                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </td>
                                </tr>

                                {/* Vision Row */}
                                <tr>
                                    <td className="px-4 py-2 font-semibold text-gray-700">Vision</td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {editField === 'vision' ? (
                                            <input
                                                type="text"
                                                name="vision"
                                                value={form.vision}
                                                onChange={handleChange}
                                                className="p-2 border border-gray-300 rounded-md"
                                            />
                                        ) : (
                                            about.vision
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {editField === 'vision' ? (
                                            <button
                                                onClick={handleSubmit}
                                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleEdit('vision')}
                                                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAbout;
