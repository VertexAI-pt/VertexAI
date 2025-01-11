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
                        setMessage(response.data.message);
                } catch (error) {
                        if (error.response) {
                                setMessage(error.response.data.message);
                        } else {
                                setMessage("Alguma cena aconteceu malee :(");
                        }
                }
        };

        return (
                <div className="Signin-Form">
                        <form onSubmit={handleSubmit}>
                                <p>Welcome to Vertex.AI</p>
                                <div className="Input-Area">
                                        <label for="username">Your Name:</label>
                                        <input
                                                placeholder="Name"
                                                type="text"
                                                id="username"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                        />
                                        <label for="email">Your Email:</label>
                                        <input
                                                placeholder="Email"
                                                type="text"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                        />
                                        <label for="password">
                                                Choose Your Password:
                                        </label>
                                        <input
                                                placeholder="Password"
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                        />
                                </div>

                                <button class="Submit-Button">
                                        Create Account
                                </button>
                        </form>
                        {message && <p>{message}</p>}
                </div>
        );
}
