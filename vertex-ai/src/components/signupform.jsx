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
export default function SignUpForm() {
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
                <div className="Signin-Container">
                        <div className="Signin-Card">
                                <h1 className="Signin-Title">
                                        Welcome Back To VertexAI!
                                </h1>
                                <p className="Signin-Description">
                                        We Are Glad To See You Again
                                </p>
                                <form onSubmit={handleSubmit}>
                                        <div className="Form-Group">
                                                <label for="email">
                                                        Your Email:
                                                </label>
                                                <input
                                                        placeholder="Email"
                                                        type="text"
                                                        id="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                />
                                        </div>
                                        <div className="Form-Group">
                                                <label for="password">
                                                        Enter Your Password:
                                                </label>
                                                <input
                                                        placeholder="Password"
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        value={
                                                                formData.password
                                                        }
                                                        onChange={handleChange}
                                                />
                                        </div>

                                        <button class="Submit-Button">
                                                Log In
                                        </button>
                                </form>
                                {message && <p>{message}</p>}
                        </div>
                </div>
        );
}
