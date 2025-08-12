import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Api from '../../../services/back/api_service';

function AddEditMovie() {
    const { id } = useParams(); // Get movie ID from URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        movieName: '',
        movieImage: null,
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const isEditMode = Boolean(id); // Check if we are in edit mode

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'movieImage' && files && files.length > 0) {
            const file = files[0];
            setFormData((prev) => ({
                ...prev,
                movieImage: file,
            }));
            setPreviewImage(URL.createObjectURL(file)); // Preview the image
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Validate the form
    const validateForm = () => {
        const newErrors = {};
        if (!formData.movieName.trim()) newErrors.movieName = 'Movie name is required!';
        if (!formData.movieImage && !isEditMode) newErrors.movieImage = 'Movie image is required!';
        setErrors(newErrors);
        return Object.keys(newErrors).length;
    };

    // Handle form submission (Create or Edit Movie)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm() !== 0) {
            toast.error('Please fill required fields.');
            return;
        }

        setLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append('movieName', formData.movieName);
        if (formData.movieImage) {
            formDataToSend.append('movieImage', formData.movieImage);
        }

        try {
            let response;
            if (isEditMode) {
                // Update movie API call (PUT request)
                response = await axios.post(`http://localhost:5000/api/movie_update/${id}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                // Create new movie API call (POST request)
                response = await axios.post('http://localhost:5000/api/movie_create', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            if (response.data.success) {
                toast.success(isEditMode ? 'Movie updated successfully!' : 'Movie added successfully!');
                setFormData({ movieName: '', movieImage: null });
                setPreviewImage(null);
                navigate('/movies'); // Navigate to the movie list page
            } else {
                toast.error('Failed to save movie');
            }
        } catch (error) {
            toast.error('Error saving movie');
        } finally {
            setLoading(false);
        }
    };

    // Fetch movie data when editing
    useEffect(() => {
        if (isEditMode) {
            const fetchMovie = async () => {
                try {
                    const response = await Api.getMovieById({ id })
                    const movie = response.data.movie;
                    setFormData({
                        movieName: movie.title,
                        movieImage: null, // Don't pre-load the image (edit the image later if needed)
                    });
                    //setPreviewImage(movie.image ? `http://localhost:5000/uploads/${movie.image}` : null);
                } catch (error) {
                    toast.error('Failed to load movie data');
                }
            };
            fetchMovie();
        }
    }, [id, isEditMode]);

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">
                        {isEditMode ? 'Edit Movie' : 'Add Movie'}
                    </h1>
                    <p className="text-sm text-gray-500">Fill in the user information below.</p>
                </div>
                <Link to="/admin/movies">
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm">
                        ← Back to Movie List
                    </button>
                </Link>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Movie Name */}
                <div className="mb-6">
                    <label className="block mb-1 font-medium">
                        Movie Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter movie name"
                        name="movieName"
                        value={formData.movieName}
                        onChange={handleChange}
                        className="border px-3 py-2 rounded w-full"
                    />
                    {errors.movieName && <p className="text-red-500 text-sm">{errors.movieName}</p>}
                </div>

                {/* Movie Image */}
                <div className="mb-6">
                    <label className="block mb-1 font-medium">
                        Movie Image <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="file"
                        name="movieImage"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {errors.movieImage && <p className="text-red-500 text-sm">{errors.movieImage}</p>}

                    {/* Image Preview */}
                    {previewImage && (
                        <img src={previewImage} alt="Preview" className="mt-2 w-32 h-48 object-cover border" />
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-600 text-white px-6 py-2 rounded ${loading ? 'cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    >
                        {loading ? 'Uploading...' : isEditMode ? 'Update Movie' : 'Add Movie'}
                    </button>
                </div>
            </form>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
}

export default AddEditMovie;
