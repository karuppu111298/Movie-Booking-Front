import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../../components/back/input';
import Api from '../../services/back/api_service';


function AddEditUser() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: 12345,
        role: 'admin',
        country: '',
        bio: '',
        gender: '',
        agree: false
    });

     //edit code
    const { id } = useParams();
    const isEditMode = !!id;
    //



    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : name === 'gender' ? parseInt(value) : value
        }));
    };


    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "First name is required!";
        if (!formData.email) newErrors.email = "Email is required!";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format!";
        if (!formData.country) newErrors.country = "Please select a country!";
        if (!formData.gender) newErrors.gender = "Please select gender!";
        if (!formData.agree) newErrors.agree = "You must agree to continue!";

        setErrors(newErrors);
        return Object.keys(newErrors).length;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm() !== 0) {
            toast.error("Please Fill Required Fields.");
            return;
        }
        setLoading(true);
        try {
            let res;
            if (isEditMode) {
               res = await Api.updateUser(id, formData);
            } else {
                res = await Api.register(formData);
            }
            console.log(res)
            if (res.data.user.success === true) {
                toast.success(res.data.user.message);
                navigate('/admin/users');
            } else {
                toast.info(res.data.user.message);
            }
        } catch (error) {
            toast.warning("User Save Failed");
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    const genderOptions = [
        { label: 'Male', value: 1 },
        { label: 'Female', value: 2 },
        { label: 'Other', value: 3 }
    ];


    //edit code

    useEffect(() => {
        if (isEditMode) {
            const fetchUser = async () => {
                try {
                    const res = await Api.getUserById({id});
                    const user = res.data.user.user_rec;
                    console.log('user',user)
                    setFormData({
                        name: user.name || '',
                        email: user.email || '',
                        password: '', // leave empty or hidden in UI
                        role: user.role || 'admin',
                        country: user.country || '',
                        bio: user.bio || '',
                        gender: user.gender || '',
                        agree: true
                    });
                } catch (err) {
                    toast.error("Failed to load user data");
                }
            };
            fetchUser();
        }
    }, [id]);

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">Add User</h1>
                    <p className="text-sm text-gray-500">Fill in the user information below.</p>
                </div>
                <Link to="/admin/users">
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm">
                        ← Back to User List
                    </button>
                </Link>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                        <label className="block mb-1 font-medium">Name <span className="text-red-500">*</span></label>
                        <Input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            handleChange={handleChange}
                            className="pl-3"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Email <span className="text-red-500">*</span></label>
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            handleChange={handleChange}
                            className="pl-3"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                        <label className="block mb-1 font-medium">Country <span className="text-red-500">*</span></label>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="">Select Country</option>
                            <option value="1">India</option>
                            <option value="2">USA</option>
                            <option value="3">UK</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Gender <span className="text-red-500">*</span></label>


                        <div className="flex gap-4 mt-2">
                            {genderOptions.map((g) => (
                                <label key={g.value} className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={g.value}
                                        checked={formData.gender === g.value}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    {g.label}
                                </label>
                            ))}
                        </div>

                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                        <label className="block mb-1 font-medium">Bio <span className="text-red-500">*</span></label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Tell us about yourself"
                            className="w-full border px-3 py-2 rounded"
                        ></textarea>
                    </div>
                    <div className="flex items-center mt-6">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                name="agree"
                                checked={formData.agree}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            I agree to the terms and conditions <span className="text-red-500">*</span>
                        </label>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                limit={3}
            />
        </div>
    );
}

export default AddEditUser;
