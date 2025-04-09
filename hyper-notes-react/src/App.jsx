import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home";
import Login from "./config/Login";
import Register from "./config/Register";
import Notes from "./pages/Notes";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import { FaLightbulb } from "react-icons/fa";

// Create a context to share loading state across components
export const LoadingContext = createContext();

function App() {
  const [user, setUser] = useState(null); // Store the user state
  const [loading, setLoading] = useState(true); // Track loading state
  const [showSplash, setShowSplash] = useState(true); // Control splash screen visibility
  const [isAuthenticating, setIsAuthenticating] = useState(false); // Track authentication process

  useEffect(() => {
    const auth = getAuth();
    
    // Set up an auth state listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user state when auth state changes
      
      // Keep splash screen visible for at least 2 seconds for better UX
      setTimeout(() => {
        setShowSplash(false);
        setLoading(false); // Once we know the user's state and splash time elapsed, stop loading
        setIsAuthenticating(false); // Reset authenticating state after auth state change
      }, 2000);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Splash Screen Component with loading spinner
  const SplashScreen = () => (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
  <div className="text-center animate-pulse mb-8">
    <div className="text-6xl font-bold text-amber-400 mb-4 flex items-center justify-center">
      <FaLightbulb className="mr-3" />
      <span>HyperNotes</span>
    </div>
    <p className="text-xl text-gray-400">Your Smart Note-Taking Companion</p>
  </div>
  
  {/* Loading Spinner */}
  <div role="status">
      <svg 
        aria-hidden="true" 
        className="inline w-10 h-10 text-gray-600 animate-spin fill-amber-400" 
        viewBox="0 0 100 101" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  </div>
  );

  // Show splash screen during initial load
  if (loading || showSplash) {
    return <SplashScreen />;
  }

  // Show splash screen during authentication process
  if (isAuthenticating) {
    return <SplashScreen />;
  }

  // Context value to be provided to children components
  const loadingContextValue = {
    setIsAuthenticating
  };

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      <Router>
        <ToastContainer />
        {/* Show splash screen overlay when authenticating */}
        {isAuthenticating && <SplashScreen />}
        
        <Routes>
          <Route path="/" element={user ? <Navigate to="/notes" /> : <Home />} />
          <Route path="/login" element={user ? <Navigate to="/notes" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/notes" /> : <Register />} />

          {/* Protect the /notes route from unauthorized access */}
          <Route 
            path="/notes" 
            element={user ? <Notes /> : <Navigate to="/login" />} 
          />
        </Routes>
      </Router>
    </LoadingContext.Provider>
  );
}

export default App;