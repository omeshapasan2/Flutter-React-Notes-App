import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/notes');
        } catch (error) {
            setError('Failed to log in. Please check your credentials.');
            console.error(error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Login to NoteSync</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <div className="auth-switch">
                    Don't have an account? <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    )
};

export default Login;