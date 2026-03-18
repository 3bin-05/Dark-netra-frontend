import { useState, useEffect } from "react";
import { signInWithPopup, User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const Login = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Monitor auth state changes to detect already logged-in users
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleGoogleLogin = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      // Direct popup login completely avoiding the redirect flow
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (err: unknown) {
      console.error("Popup login failed:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to sign in with Google. Please try again."
      );
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50/50 p-6">
      <div className="w-full max-w-md p-8 bg-white border border-gray-100 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to your account to continue
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>{error}</div>
          </div>
        )}

        {user ? (
          <div className="flex flex-col items-center space-y-5 animate-in fade-in zoom-in duration-300">
            {user.photoURL && (
              <div className="relative">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
            )}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {user.displayName || "Google User"}
              </h3>
              <p className="text-sm font-medium text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 w-full h-11 px-6 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors focus:ring-2 focus:ring-gray-200 focus:outline-none"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full h-12 flex items-center justify-center gap-3 px-4 border border-gray-200 rounded-xl bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm"
          >
            {loading ? (
              <svg className="animate-spin w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5 group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            <span>{loading ? "Signing in..." : "Continue with Google"}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
