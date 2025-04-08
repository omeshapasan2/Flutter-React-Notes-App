import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/notes');
        } catch (error) {
            setError('Failed to register. Please try again.');
            console.error(error);
        }
    };

    return(
      <div className="min-h-screen bg-gray-900 relative">
        {/* Back button positioned in top left corner outside the container */}
        <div className="absolute top-4 left-4">
          <Link 
            to="/" 
            className="bg-gray-700 text-gray-200 px-3 py-1.5 rounded-md
                    hover:bg-gray-600 transition duration-300 
                    focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
          >
            <span>←</span>
            <span className="ml-1">Back to Home</span>
          </Link>
        </div>
        
        <div className="flex items-center justify-center px-4 py-8 h-screen">
          <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8">
            <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">
              Create HyperNotes Account
            </h2>
            
            {error && (
              <div className="bg-red-600/20 border border-red-600 text-red-300 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-md 
                             focus:outline-none focus:ring-2 focus:ring-purple-600 
                             placeholder-gray-500 border border-gray-600"
                />
              </div>
              
              <div>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-md 
                             focus:outline-none focus:ring-2 focus:ring-purple-600 
                             placeholder-gray-500 border border-gray-600"
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-purple-600 text-white py-2 rounded-md 
                           hover:bg-purple-700 transition duration-300 
                           focus:outline-none focus:ring-2 focus:ring-purple-600 
                           focus:ring-opacity-50"
              >
                Register
              </button>
            </form>
            
            <div className="text-center mt-6 text-gray-400">
              Already have an account? {' '}
              <Link 
                to="/login" 
                className="text-purple-400 hover:text-purple-300 
                           transition duration-300 underline"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Register;