import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2'; // Import SweetAlert2
import {
    fetchContact,
    updateContact,
    addContact,
    deleteContact,
} from '../contacts/contactSlice';

const Contacts = () => {
    const dispatch = useDispatch();
    const { contact, loading, error } = useSelector((state) => state.contact);

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        dispatch(fetchContact());
    }, [dispatch]);

    const handleAdd = () => {
        dispatch(addContact({ email, phone }));
        setEmail('');
        setPhone('');
    };

    const handleEdit = (contact) => {
        setEditId(contact._id);
        setEmail(contact.email);
        setPhone(contact.phone);
    };

    const handleUpdate = () => {
        if (editId) {
            dispatch(updateContact({ id: editId, email, phone }));
            setEditId(null);
            setEmail('');
            setPhone('');
        }
    };

    const handleDelete = (id) => {
        // Show SweetAlert2 confirmation before deleting
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteContact(id)); // Proceed with delete
                Swal.fire('Deleted!', 'The contact has been deleted.', 'success');
            }
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-6 bg-gray-50">
            <h1 className="text-2xl font-bold mb-4">Manage Contact Details</h1>

            <div className="mb-4">
                <label className="block font-medium mb-2">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-2">Phone</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                />
            </div>

            <div className="flex gap-4">
                {editId ? (
                    <button
                        onClick={handleUpdate}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Update
                    </button>
                ) : (
                    <button
                        onClick={handleAdd}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Add New
                    </button>
                )}
            </div>

            {/* Contact Table */}
            {contact && (
                <table className="table-auto w-full mt-6 border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Phone</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={contact._id}>
                            <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{contact.phone}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    onClick={() => handleEdit(contact)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(contact._id)} // Trigger delete with alert
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Contacts;
