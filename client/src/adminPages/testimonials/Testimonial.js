import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestimonials, addTestimonial, deleteTestimonial, updateTestimonial } from "../testimonials/TestimonialSlice";
import Swal from "sweetalert2";  // Import SweetAlert2

const Testimonial = () => {
  const dispatch = useDispatch();
  const { testimonials, status, error } = useSelector((state) => state.testimonials);

  const [formData, setFormData] = useState({ name: "", feedback: "" });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTestimonials());
    }
  }, [status, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      dispatch(updateTestimonial({ id: editId, data: formData }));
      setEditMode(false);
    } else {
      dispatch(addTestimonial(formData));
    }

    setFormData({ name: "", feedback: "" });
  };

  const handleEdit = (testimonial) => {
    setFormData({ name: testimonial.name, feedback: testimonial.feedback });
    setEditId(testimonial._id);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    // Show confirmation alert
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTestimonial(id));  // Proceed with delete if confirmed
        Swal.fire("Deleted!", "Your testimonial has been deleted.", "success");
      }
    });
  };

  if (status === "loading") return <p>Loading testimonials...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{editMode ? "Edit" : "Add"} Testimonial</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Feedback</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {editMode ? "Update" : "Add"} Testimonial
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">Testimonials</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Feedback</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((testimonial) => (
            <tr key={testimonial._id}>
              <td className="border p-2">{testimonial.name}</td>
              <td className="border p-2">{testimonial.feedback}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(testimonial._id)}  // Call delete with confirmation
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Testimonial;
