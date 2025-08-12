import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Api from '../../../services/back/api_service';
import config from "../../../config";

function AddEditScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        screen_name: '',
        seat_qty: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const isEditMode = Boolean(id);

    const [seats, setSeats] = useState({ left: [], center: [], right: [] });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.screen_name.trim()) newErrors.screen_name = 'Screen name is required!';
        if (!formData.seat_qty || isNaN(formData.seat_qty) || formData.seat_qty <= 0)
            newErrors.seat_qty = 'Valid seat quantity is required!';
        setErrors(newErrors);
        return Object.keys(newErrors).length;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm() !== 0) {
            toast.error('Please fill required fields.');
            return;
        }

        setLoading(true);

        try {
            let response;
            if (isEditMode) {
                response = await axios.post(`${config.REACT_APP_API_URL}/screen_update/${id}`, formData);
            } else {
                response = await axios.post(`${config.REACT_APP_API_URL}/screen_create`, formData);
            }

            if (response.data.screen.success) {
                toast.success(isEditMode ? 'Screen updated successfully!' : 'Screen added successfully!');
                setFormData({ screen_name: '', seat_qty: '' });
                navigate('/admin/screens');
            } else {
                toast.error('Failed to save screen');
            }
        } catch (error) {
            toast.error('Error saving screen');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isEditMode) {
            const fetchScreen = async () => {
                try {
                    const response = await Api.getScreenById({ id });
                    const screen = response.data.screen;
                    setFormData({
                        screen_name: screen.screen_name,
                        seat_qty: screen.seat_qty
                    });
                } catch (error) {
                    toast.error('Failed to load screen data');
                }
            };
            fetchScreen();
        }
    }, [id, isEditMode]);

    // Auto-generate seats when qty changes
    useEffect(() => {
    let qty = parseInt(formData.seat_qty);
    if (!qty || qty <= 0) {
        setSeats({ left: [], center: [], right: [] });
        return;
    }

    let left = [];
    let center = [];
    let right = [];

    let perSection = Math.ceil(qty / 3);
    let sectionLimits = [perSection, perSection * 2, qty];

    for (let i = 1; i <= qty; i++) {
        if (i <= sectionLimits[0]) {
            left.push(`L${i}`);
        } else if (i <= sectionLimits[1]) {
            center.push(`C${i - sectionLimits[0]}`);
        } else {
            right.push(`R${i - sectionLimits[1]}`);
        }
    }

    setSeats({ left, center, right });
}, [formData.seat_qty]);


    const SeatGrid = ({ sectionSeats, color }) => (
    <div className="flex flex-wrap gap-1 justify-center">
        {sectionSeats.map((seat, idx) => (
            <div
                key={idx}
                className={`w-6 h-6 flex items-center justify-center rounded cursor-pointer ${color} text-white text-xs`}
            >
                {seat}
            </div>
        ))}
    </div>
);

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">
                        {isEditMode ? 'Edit Screen' : 'Add Screen'}
                    </h1>
                    <p className="text-sm text-gray-500">Fill in the screen details below.</p>
                </div>
                <Link to="/admin/screens">
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm">
                        ← Back to Screen List
                    </button>
                </Link>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block mb-1 font-medium">
                        Screen Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter screen name"
                        name="screen_name"
                        value={formData.screen_name}
                        onChange={handleChange}
                        className="border px-3 py-2 rounded w-full"
                    />
                    {errors.screen_name && <p className="text-red-500 text-sm">{errors.screen_name}</p>}
                </div>

                <div className="mb-6">
                    <label className="block mb-1 font-medium">
                        Seat Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Enter seat quantity"
                        name="seat_qty"
                        value={formData.seat_qty}
                        onChange={handleChange}
                        className="border px-3 py-2 rounded w-full"
                    />
                    {errors.seat_qty && <p className="text-red-500 text-sm">{errors.seat_qty}</p>}
                </div>

                {formData.seat_qty > 0 && (
                    <div className="my-6">
                        <h2 className="text-xl font-semibold mb-4">Seat Layout</h2>
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <h3 className="text-center mb-2 font-medium">Left</h3>
                                <SeatGrid sectionSeats={seats.left} color="bg-blue-500" />
                            </div>
                            <div>
                                <h3 className="text-center mb-2 font-medium">Center</h3>
                                <SeatGrid sectionSeats={seats.center} color="bg-green-500" />
                            </div>
                            <div>
                                <h3 className="text-center mb-2 font-medium">Right</h3>
                                <SeatGrid sectionSeats={seats.right} color="bg-red-500" />
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-600 text-white px-6 py-2 rounded ${loading ? 'cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    >
                        {loading ? 'Saving...' : isEditMode ? 'Update Screen' : 'Add Screen'}
                    </button>
                </div>
            </form>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
}

export default AddEditScreen;
