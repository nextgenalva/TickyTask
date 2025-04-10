import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AuthContext } from '../../provider/AuthProvider';
import SocialLogin from './SocialLogin';

const Login = () => {
    const { userLogin, setUser, passwordResetEmail } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [resetEmailSent, setResetEmailSent] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    const emailRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Reset previous errors and notifications
        setErrors({});
        setResetEmailSent(false);
        
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        
        // Validate form fields
        const newErrors = {};
        if (!email) {
            newErrors.email = "Email is required";
        }
        if (!password) {
            newErrors.password = "Password is required";
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        userLogin(email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
            })
            .catch((error) => {
                // Handle specific error types
                const errorCode = error.code;
                if (errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password") {
                    setErrors({ submit: "Invalid email or password. Please try again." });
                } else if (errorCode === "auth/too-many-requests") {
                    setErrors({ submit: "Too many failed login attempts. Please try again later." });
                } else if (errorCode === "auth/invalid-email") {
                    setErrors({ email: "Invalid email format." });
                } else {
                    setErrors({ submit: error.message });
                }
            });
    };

    const handleForget = (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        
        // Clear previous statuses and errors
        setResetEmailSent(false);
        setErrors({});
        
        const email = emailRef.current.value;
        if (!email) {
            setErrors({ email: "Please enter your email address for password reset." });
            return;
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setErrors({ email: "Please enter a valid email address." });
            return;
        }
        
        setIsResetting(true);
        
        passwordResetEmail(email)
            .then(() => {
                setResetEmailSent(true);
                setIsResetting(false);
            })
            .catch((error) => {
                setIsResetting(false);
                // Handle specific error cases
                const errorCode = error.code;
                if (errorCode === "auth/user-not-found") {
                    setErrors({ email: "No account found with this email." });
                } else if (errorCode === "auth/invalid-email") {
                    setErrors({ email: "Invalid email format." });
                } else if (errorCode === "auth/too-many-requests") {
                    setErrors({ email: "Too many requests. Please try again later." });
                } else {
                    setErrors({ email: "Failed to send reset email. Please try again." });
                }
            });
    }
    
    const handleLoginSuccess = (user) => {
        setUser(user);
    };
    
    const handleLoginError = (errorMessage) => {
        setErrors({ submit: errorMessage });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex py-20 flex-col items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-7 shadow-md">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Welcome back</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Login to access your account
                    </p>
                </div>
                
                {/* Display submit errors */}
                {errors.submit && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
                        {errors.submit}
                    </div>
                )}
                
                {/* Password reset success message */}
                {resetEmailSent && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-md text-sm">
                        Password reset email has been sent. Please check your inbox.
                    </div>
                )}

                <SocialLogin 
                    onLoginSuccess={handleLoginSuccess} 
                    onLoginError={handleLoginError} 
                />

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            ref={emailRef}
                            placeholder="m@example.com"
                            className={`h-10 w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-slate-300'} bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <button
                                onClick={handleForget}
                                disabled={isResetting}
                                className={`text-sm font-medium text-slate-600 hover:text-slate-900 hover:underline focus:outline-none ${isResetting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isResetting ? 'Sending...' : 'Forgot your password?'}
                            </button>
                        </div>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                type={showPassword ? "text" : "password"}
                                className={`h-10 w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-slate-300'} bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1`}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                        )}
                    </div>

                    {/* Remember me checkbox */}
                    <div className="flex items-start space-x-2 pt-2">
                        <input
                            type="checkbox"
                            id="remember"
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-black focus:ring-slate-400 focus:ring-offset-0"
                        />
                        <div>
                            <label htmlFor="remember" className="text-sm text-slate-600">
                                Remember me
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-2 h-11 w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-slate-600">Don't have an account?</span>{' '}
                    <Link to='/signup' className="font-medium text-black hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;