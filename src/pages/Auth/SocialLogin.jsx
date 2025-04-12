import { AuthContext } from '../../provider/AuthProvider';
import React, { useContext, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const navigate = useNavigate();
    const { signInWithGoogle, signInWithGithub } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState({
        google: false,
        github: false
    });
    const [error, setError] = useState('');

    const handleSocialSignIn = async (provider, method) => {
        setError('');
        setIsLoading(prev => ({ ...prev, [provider]: true }));
        
        try {
            const result = await method();
            console.log(result.user);
            navigate('/tasks');
        } catch (error) {
            console.error(`${provider} sign-in error:`, error.message);
            setError(`Failed to sign in with ${provider}: ${error.message}`);
        } finally {
            setIsLoading(prev => ({ ...prev, [provider]: false }));
        }
    };

    return (
        <div className="w-full grid gap-3">
            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-2">
                    {error}
                </div>
            )}
            
            <button
                onClick={() => handleSocialSignIn('google', signInWithGoogle)}
                type="button"
                disabled={isLoading.google || isLoading.github}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition-all hover:bg-slate-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1 disabled:opacity-70"
            >
                {isLoading.google ? (
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600"></span>
                ) : (
                    <FcGoogle className="text-xl" />
                )}
                <span>Continue with Google</span>
            </button>

            <button
                onClick={() => handleSocialSignIn('github', signInWithGithub)}
                type="button"
                disabled={isLoading.google || isLoading.github}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition-all hover:bg-slate-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1 disabled:opacity-70"
            >
                {isLoading.github ? (
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600"></span>
                ) : (
                    <ImGithub className="text-xl" />
                )}
                <span>Continue with GitHub</span>
            </button>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200"></span>
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-xs text-slate-500">Or continue with</span>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;