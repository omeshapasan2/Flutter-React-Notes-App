import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home";
import Login from "./config/Login";
import Register from "./config/Register";
import Notes from "./pages/Notes";

function App() {
  return (
    <Router>
        <ToastContainer />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/notes" element={<Notes />} />
        </Routes>
    </Router>
  );
}

export default App
