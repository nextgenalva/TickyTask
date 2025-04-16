import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AuthContext } from '../../provider/AuthProvider';
import SocialLogin from './SocialLogin';
import Navbar from '../../Shared/Navbar';

const Signup = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [strength, setStrength] = useState(0);
    const [photoName, setPhotoName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);

    const validatePassword = (pass) => {
        const errors = {};

        if (pass.length < 8) {
            errors.length = "Password must be at least 8 characters";
        }
        if (!/[a-z]/.test(pass)) {
            errors.lowercase = "Password must include at least one lowercase letter";
        }
        if (!/[A-Z]/.test(pass)) {
            errors.uppercase = "Password must include at least one uppercase letter";
        }
        if (!/[0-9]/.test(pass)) {
            errors.number = "Password must include at least one number";
        }

        return errors;
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate password requirements
        const passwordErrors = validatePassword(password);
        if (Object.keys(passwordErrors).length > 0) {
            newErrors.password = passwordErrors;
        }

        // Validate password confirmation
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        // Validate terms acceptance
        if (!termsAccepted) {
            newErrors.terms = "You must accept the Terms and Conditions";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const form = new FormData(e.target);
        const name = form.get('name');
        const email = form.get('email');
        const photo = form.get('photo');

        createNewUser(email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        navigate('/dashboard');
                    }).catch(err => {
                        console.log('Error updating user profile');
                    })
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);

                // Handle Firebase authentication errors
                if (errorCode === "auth/email-already-in-use") {
                    setErrors({ submit: "Email already in use. Please use a different email." });
                } else {
                    setErrors({ submit: errorMessage });
                }
            });
    }

    const calculateStrength = (pass) => {
        let score = 0;
        if (!pass) return 0;

        // Length check
        if (pass.length >= 8) score += 1;

        // Complexity checks
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[a-z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;

        return score;
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setStrength(calculateStrength(newPassword));
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setPhotoName(e.target.files[0].name);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleTermsChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    // Get color and label for password strength
    const getStrengthData = () => {
        switch (strength) {
            case 0: return { color: 'bg-red-500', width: '0%', label: 'Very weak' };
            case 1: return { color: 'bg-red-500', width: '20%', label: 'Weak' };
            case 2: return { color: 'bg-yellow-500', width: '40%', label: 'Fair' };
            case 3: return { color: 'bg-yellow-500', width: '60%', label: 'Good' };
            case 4: return { color: 'bg-green-500', width: '80%', label: 'Strong' };
            case 5: return { color: 'bg-green-500', width: '100%', label: 'Very strong' };
            default: return { color: 'bg-red-500', width: '0%', label: 'Weak' };
        }
    };

    const strengthData = getStrengthData();

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center bg-slate-50 px-4 py-10">
                <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Create an account</h1>
                        <p className="mt-2 text-sm text-slate-600">
                            Enter your details to get started
                        </p>
                    </div>

                    <SocialLogin />

                    {errors.submit && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
                            {errors.submit}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid gap-4">
                        {/* Full Name */}
                        <div className="grid gap-2">
                            <label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                                Full name
                            </label>
                            <input
                                name='name'
                                type="text"
                                placeholder="John Doe"
                                className="h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                                Photo URL
                            </label>
                            <input
                                name='photo'
                                type="text"
                                placeholder="https://i.ibb.co.com/..."
                                className="h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
                            />
                        </div>

                        {/* Email */}
                        <div className="grid gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-slate-700">
                                Email
                            </label>
                            <input
                                name='email'
                                type="email"
                                placeholder="m@example.com"
                                className="h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
                                required
                            />
                        </div>

                        {/* Password with Strength Meter */}
                        <div className="grid gap-2">
                            <label htmlFor="password" className="text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    name='password'
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className={`h-10 w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-slate-300'} bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1`}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>

                            {/* Password Requirements and Errors */}
                            {errors.password && (
                                <div className="mt-1 space-y-1">
                                    {Object.values(errors.password).map((error, idx) => (
                                        <p key={idx} className="text-xs text-red-600">{error}</p>
                                    ))}
                                </div>
                            )}

                            {/* Password Strength Bar */}
                            {password && (
                                <div className="space-y-1 mt-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-500">Password strength</span>
                                        <span className="text-xs font-medium"
                                            style={{
                                                color: strength <= 1 ? '#ef4444' : strength <= 3 ? '#eab308' : '#22c55e'
                                            }}>
                                            {strengthData.label}
                                        </span>
                                    </div>
                                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${strengthData.color} transition-all duration-300`}
                                            style={{ width: strengthData.width }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        Use 8+ characters with a mix of letters, numbers & symbols
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="grid gap-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                                Confirm password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    className={`h-10 w-full rounded-md border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-300'} bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1`}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Terms Agreement */}
                        <div className="flex items-start space-x-2 pt-2">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={termsAccepted}
                                onChange={handleTermsChange}
                                className={`mt-1 h-4 w-4 rounded border-${errors.terms ? 'red-500' : 'slate-300'} text-black focus:ring-slate-400 focus:ring-offset-0`}
                            />
                            <div>
                                <label htmlFor="terms" className="text-sm text-slate-600">
                                    I agree to the{' '}
                                    <a href="#" className="font-medium text-slate-900 hover:underline">Terms of Service</a>
                                    {' '}and{' '}
                                    <a href="#" className="font-medium text-slate-900 hover:underline">Privacy Policy</a>
                                </label>
                                {errors.terms && (
                                    <p className="mt-1 text-xs text-red-600">{errors.terms}</p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-2 h-10 w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
                        >
                            Create account
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-slate-600">Already have an account?</span>{' '}
                        <Link to='/login' className="font-medium text-black hover:underline">
                            Login
                        </Link>
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-slate-500">
                    By clicking continue, you agree to our{' '}
                    <a href="#" className="underline underline-offset-2 hover:text-slate-700">
                        Terms of Service
                    </a>
                    {' '}and{' '}
                    <a href="#" className="underline underline-offset-2 hover:text-slate-700">
                        Privacy Policy
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;