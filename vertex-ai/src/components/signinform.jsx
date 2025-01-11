import "./signinform.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Back-End
/*const form = document.getElementById("Signin-Form");
form.addEventListener("submit", registerUser);

function registerUser(event) {
        event.preventDefault();
        const username = document.getElementById("username");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        }*/

//Front-End
export default function SigninForm() {
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
                        if (error.response) {
                                setMessage(error.response.data.message);
                        } else {
                                setMessage("Algum Erro Ocurreu :(");
                        }
                }
        };

        return (
                <div className="Signin-Container">
                        <div className="Signin-Card">
                                <h1 className="Signin-Title">Join VertexAI!</h1>
                                <p className="Signin-Description">
                                        Create Your Account And Join Us
                                </p>
                                <form onSubmit={handleSubmit}>
                                        <div className="Form-Group">
                                                <label htmlFor="username">
                                                        Your Name
                                                </label>
                                                <input
                                                        id="username"
                                                        name="username"
                                                        value={
                                                                formData.username
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="Enter your name"
                                                        required
                                                />
                                        </div>
                                        <div className="Form-Group">
                                                <label htmlFor="email">
                                                        Your Email
                                                </label>
                                                <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="Enter your email"
                                                        required
                                                />
                                        </div>
                                        <div className="Form-Group">
                                                <label htmlFor="password">
                                                        Choose Your Password
                                                </label>
                                                <input
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        value={
                                                                formData.password
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="Enter your password"
                                                        required
                                                />
                                        </div>
                                        <button
                                                type="submit"
                                                className="Submit-Button"
                                        >
                                                Create Account
                                        </button>
                                </form>
                        </div>
                        {message && (
                                <div className="error-message">{message}</div>
                        )}
                </div>
        );
}
