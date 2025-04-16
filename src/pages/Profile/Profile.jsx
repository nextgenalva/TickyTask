import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { BiEdit, BiSave, BiX, BiUserCircle, BiCamera, BiLoaderAlt } from 'react-icons/bi';
import axios from 'axios';

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    
    const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

    // Initialize state with user data
    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setPhotoURL(user.photoURL || '');
        }
    }, [user]);

    // Handle image upload to ImgBB
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            setError('Please select a valid image file (JPEG, PNG, or GIF)');
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            setError('Image size should be less than 2MB');
            return;
        }

        setIsUploading(true);
        setError('');

        try {
            // Create form data for ImgBB API
            const formData = new FormData();
            formData.append('image', file);
            
            // Upload to ImgBB
            const response = await axios.post(
                `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                formData
            );
            
            if (response.data.success) {
                setPhotoURL(response.data.data.url);
            } else {
                throw new Error('Upload failed');
            }
        } catch (err) {
            console.error('Error uploading image:', err);
            setError('Failed to upload image. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Check if anything changed
            if (displayName === user.displayName && photoURL === user.photoURL) {
                setIsEditing(false);
                return;
            }

            await updateUserProfile({
                displayName,
                photoURL
            });
            
            setSuccess('Profile updated successfully!');
            setIsEditing(false);
            
            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccess('');
            }, 3000);
        } catch (err) {
            setError('Failed to update profile. Please try again.');
        }
    };

    const handleCancel = () => {
        setDisplayName(user?.displayName || '');
        setPhotoURL(user?.photoURL || '');
        setError('');
        setIsEditing(false);
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="py-12 bg-slate-50 min-h-screen">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-8">
                        {/* Header with title */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
                            <p className="text-gray-500 mt-1">Manage your profile information</p>
                        </div>

                        {/* Notification messages */}
                        {success && (
                            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
                                {success}
                            </div>
                        )}
                        
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                                {error}
                            </div>
                        )}

                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Profile Image Column */}
                            <div className="flex flex-col items-center md:items-start">
                                {/* Avatar */}
                                <div className="relative group mb-6">
                                    <div className="h-28 w-28 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                                        {photoURL ? (
                                            <img 
                                                src={photoURL} 
                                                alt={displayName || 'User'} 
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "/api/placeholder/100/100";
                                                }}
                                            />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center bg-gray-100">
                                                <BiUserCircle className="h-full w-full text-gray-300" />
                                            </div>
                                        )}
                                        
                                        {isUploading && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                <BiLoaderAlt className="text-white h-8 w-8 animate-spin" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    {isEditing && (
                                        <div className="absolute bottom-0 right-0">
                                            <button 
                                                type="button"
                                                onClick={() => fileInputRef.current.click()}
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow transition-all duration-200"
                                                disabled={isUploading}
                                            >
                                                <BiCamera size={16} />
                                            </button>
                                            <input 
                                                type="file" 
                                                ref={fileInputRef}
                                                onChange={handleImageChange}
                                                className="hidden"
                                                accept="image/jpeg, image/png, image/gif"
                                                disabled={isUploading}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="mb-6 md:mb-0 text-center md:text-left">
                                    <h3 className="text-gray-500 text-sm font-medium">Profile Photo</h3>
                                    <p className="text-gray-400 text-xs mt-1">
                                        {isEditing ? 'Click the camera icon to change' : 'Your public profile image'}
                                    </p>
                                </div>
                            </div>

                            {/* Profile Details Column */}
                            <div className="flex-1">
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-6">
                                        {/* Display Name */}
                                        <div>
                                            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                                                Display Name
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    id="displayName"
                                                    value={displayName}
                                                    onChange={(e) => setDisplayName(e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Your name"
                                                />
                                            ) : (
                                                <p className="text-gray-800 font-medium">
                                                    {user?.displayName || 'Not set'}
                                                </p>
                                            )}
                                        </div>
                                        
                                        {/* Email (read-only) */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email Address
                                            </label>
                                            <p className="text-gray-800">
                                                {user?.email || 'Not available'}
                                            </p>
                                        </div>

                                        {/* Account Info: Created Date + Auth Provider in cards */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <h3 className="text-xs font-medium text-gray-500 uppercase">Account Created</h3>
                                                <p className="text-gray-800 text-sm mt-1">
                                                    {user?.metadata?.creationTime 
                                                        ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })
                                                        : 'Not available'}
                                                </p>
                                            </div>
                                            
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <h3 className="text-xs font-medium text-gray-500 uppercase">Sign-in Method</h3>
                                                <p className="text-gray-800 text-sm mt-1">
                                                    {user?.providerData[0]?.providerId === 'password' 
                                                        ? 'Email and Password' 
                                                        : user?.providerData[0]?.providerId === 'google.com'
                                                        ? 'Google'
                                                        : user?.providerData[0]?.providerId === 'github.com'
                                                        ? 'GitHub'
                                                        : user?.providerData[0]?.providerId || 'Not available'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                            {isEditing ? (
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition-colors"
                                        disabled={isUploading}
                                    >
                                        {isUploading ? 'Uploading...' : 'Save Changes'}
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition-colors"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;