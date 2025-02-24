import { useState } from "react";
import "../styles/components/signin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function Signin() {
        const [formData, setFormData] = useState({
                username: "",
                email: "",
                password: "",
        });
        const [message, setMessage] = useState("");
        const navigate = useNavigate();

        const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                        const response = await axios.post("/signin", formData);
                        navigate("/home");
                } catch (error) {
                        setMessage(
                                error.response?.data?.message ||
                                        "An error occurred",
                        );
                }
        };

        return (
                <div className="signin-container">
                        <h1 className="signin-title">Join VertexAI</h1>
                        <p className="signin-description">
                                Create your account and join us
                        </p>
                        <form onSubmit={handleSubmit} className="signin-form">
                                <div className="form-group">
                                        <label htmlFor="username">
                                                Your Name
                                        </label>
                                        <input
                                                id="username"
                                                name="username"
                                                type="text"
                                                placeholder="Enter your name"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                        />
                                </div>
                                <div className="form-group">
                                        <label htmlFor="email">
                                                Your Email
                                        </label>
                                        <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                        />
                                </div>
                                <div className="form-group">
                                        <label htmlFor="password">
                                                Choose Your Password
                                        </label>
                                        <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="Enter your password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                        />
                                </div>
                                <button type="submit" className="submit-button">
                                        Create Account
                                </button>
                        </form>
                        {message && (
                                <div className="error-message">
                                        <AlertCircle size={18} />
                                        {message}
                                </div>
                        )}
                </div>
        );
}
