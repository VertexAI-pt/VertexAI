import "../styles/components/login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function SignUpForm() {
        //BACK-END
        const [formData, setFormData] = useState({
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
                        const response = await axios.post("/signup", formData);
                        navigate("/home");
                } catch (error) {
                        if (error.response) {
                                setMessage(error.response.data.message);
                        } else {
                                setMessage("Alguma cena aconteceu malee :(");
                        }
                }
        };

        return (
                <div className="login-container">
                        <h1 className="login-title">Welcome Back!</h1>
                        <p className="login-description">
                                We're glad to see you again
                        </p>
                        <form onSubmit={handleSubmit} className="login-form">
                                <div className="form-group">
                                        <label htmlFor="login-email">
                                                Your Email
                                        </label>
                                        <input
                                                id="login-email"
                                                name="email"
                                                type="email"
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                        />
                                </div>
                                <div className="form-group">
                                        <label htmlFor="login-password">
                                                Your Password
                                        </label>
                                        <input
                                                id="login-password"
                                                name="password"
                                                type="password"
                                                placeholder="Enter your password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                        />
                                </div>
                                <button type="submit" className="submit-button">
                                        Log In
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
