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
        <div className="auth-container">
            <div className="auth-form">
                <h2>Create NoteSync Account</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleRegister}>
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
                    <button type="submit">Register</button>
                </form>
                <div className="auth-switch">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;