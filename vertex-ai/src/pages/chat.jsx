import "../styles/pages/chat.css";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Chat() {
        const [username, setUsername] = useState(null);
        const [input, setInput] = useState("");
        const [chatHistory, setChatHistory] = useState([]);
        const [message, setMessage] = useState("");
        const navigate = useNavigate();
        const [formData, setFormData] = useState({
                email: "",
                password: "",
        });

        const [formDataSignup, setFormDataSignup] = useState({
                username: "",
                email: "",
                password: "",
        });
        
        const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData({ ...formData, [name]: value });
        };

        const handleChangeCriar = (e) => {
                const { name, value } = e.target;
                setFormDataSignup({ ...formDataSignup, [name]: value });
        }; 


        
        
        useEffect(() => {
                axios.get("/auth/check", { withCredentials: true })
                        .then((response) => {
                                setUsername(response.data.username);
                        })
                        .catch(() => {
                                setUsername(null);
                        });

                const fetchHistory = async () => {
                        try {
                                const response = await fetch(
                                        "http://localhost:8000/openai/history",
                                        {
                                                credentials: "include",
                                        },
                                );
                                if (response.ok) {
                                        const data = await response.json();
                                        setChatHistory(data.history || []);
                                }
                        } catch (error) {
                                console.error(
                                        "Erro ao carregar histórico:",
                                        error,
                                );
                        }
                };
                fetchHistory();
        }, []);

        const sendMessage = async () => {
                if (!input.trim()) return;

                try {
                        const response = await fetch(
                                "http://localhost:8000/openai",
                                {
                                        method: "POST",
                                        headers: {
                                                "Content-Type":
                                                        "application/json",
                                        },
                                        credentials: "include",
                                        body: JSON.stringify({ input }),
                                },
                        );

                        if (response.ok) {
                                const data = await response.json();
                                setChatHistory(data.history);
                                setInput(""); // Clear the input
                        } else {
                                console.error("Erro ao enviar mensagem.");
                        }
                } catch (error) {
                        console.error("Erro ao conectar ao servidor:", error);
                }
        };

        const handleSubmitLogin = async (e) => {
                e.preventDefault();
                try {
                        const response = await axios.post("/signup", formData);
                        navigate("/chat");
                } catch (error) {
                        if (error.response) {
                                setMessage(error.response.data.message);
                        } else {
                                setMessage("Alguma cena aconteceu malee :(");
                        }
                }
        };

        const handleSubmitCriar = async (e) => {
                e.preventDefault();
                try {
                        const response = await axios.post("/signin", formDataSignup);
                        navigate("/chat");
                } catch (error) {
                        if (error.response) {
                                setMessage(error.response.data.message);
                        } else {
                                setMessage("Algum Erro Ocurreu :(");
                        }
                }
        };

        return (
                <div className="Chat-Page">
                        <div className="Chat-Header">
                                <h1>Welcome To VEX</h1>
                                <a href="/" className="Exit-Button">
                                        &#8592; Exit
                                </a>
                        </div>

                        <div className="Chat-Body">
                                {username ? (
                                        chatHistory.map((msg, index) => (
                                                <div
                                                        key={index}
                                                        className={
                                                                msg.role ===
                                                                "user"
                                                                        ? "User-Message"
                                                                        : "Assistant-Message"
                                                        }
                                                >
                                                        {msg.role !==
                                                                "user" && (
                                                                <img
                                                                        src="../public/img/Vertexailogo.png"
                                                                        alt="Assistant"
                                                                        className="Assistant-Avatar"
                                                                />
                                                        )}
                                                        <Markdown
                                                                children={
                                                                        msg.content
                                                                }
                                                                components={{
                                                                        code({
                                                                                node,
                                                                                inline,
                                                                                className,
                                                                                children,
                                                                                ...props
                                                                        }) {
                                                                                const match =
                                                                                        /language-(\w+)/.exec(
                                                                                                className ||
                                                                                                        "",
                                                                                        );
                                                                                return match ? (
                                                                                        <SyntaxHighlighter
                                                                                                style={
                                                                                                        coy
                                                                                                }
                                                                                                language={
                                                                                                        match[1]
                                                                                                }
                                                                                                PreTag="div"
                                                                                                children={String(
                                                                                                        children,
                                                                                                ).replace(
                                                                                                        /\n$/,
                                                                                                        "",
                                                                                                )}
                                                                                                {...props}
                                                                                        />
                                                                                ) : (
                                                                                        <code
                                                                                                className={
                                                                                                        className
                                                                                                }
                                                                                                {...props}
                                                                                        >
                                                                                                {
                                                                                                        children
                                                                                                }
                                                                                        </code>
                                                                                );
                                                                        },
                                                                }}
                                                        />
                                                </div>
                                        ))
                                ) : (
                                        <div className="Login-SignIn-Form">
                                                <div className="Form-Container">
                                                        <div className="Login-Side">
                                                                <h2>Login</h2>
                                                                <form
                                                                        onSubmit={handleSubmitLogin}
                                                                >
                                                                        <div className="Form-Group">
                                                                                <label htmlFor="email">
                                                                                        Email:
                                                                                </label>
                                                                                <input
                                                                                        type="email"
                                                                                        id="email"
                                                                                        name="email"
                                                                                        value={formData.email}
                                                                                        onChange={handleChange}
                                                                                        required
                                                                                />
                                                                        </div>
                                                                        <div className="Form-Group">
                                                                                <label htmlFor="password">
                                                                                        Password:
                                                                                </label>
                                                                                <input
                                                                                        type="password"
                                                                                        id="password"
                                                                                        name="password"
                                                                                        value={formData.password}
                                                                                        onChange={handleChange}
                                                                                        required
                                                                                />
                                                                        </div>
                                                                        <button
                                                                                type="submit"
                                                                                className="Form-Button"
                                                                        >
                                                                                Login
                                                                        </button>
                                                                </form>
                                                        </div>
                                                        <div className="SignIn-Side">
                                                                <h2>Sign Up</h2>
                                                                <form
                                                                        onSubmit={handleSubmitCriar}
                                                                >
                                                                        <div className="Form-Group">
                                                                                <label htmlFor="name">
                                                                                        Name:
                                                                                </label>
                                                                                <input
                                                                                        type="text"
                                                                                        id="name"
                                                                                        name="username"
                                                                                        value={
                                                                                                formDataSignup.username
                                                                                        }
                                                                                        onChange={handleChangeCriar}
                                                                                        required
                                                                                />
                                                                        </div>
                                                                        <div className="Form-Group">
                                                                                <label htmlFor="email">
                                                                                        Email:
                                                                                </label>
                                                                                <input
                                                                                        type="email"
                                                                                        id="email"
                                                                                        name="email"
                                                                                        value={formDataSignup.email}
                                                                                        onChange={handleChangeCriar}
                                                                                        required
                                                                                />
                                                                        </div>
                                                                        <div className="Form-Group">
                                                                                <label htmlFor="password">
                                                                                        Password:
                                                                                </label>
                                                                                <input
                                                                                        type="password"
                                                                                        id="password"
                                                                                        name="password"
                                                                                        value={formDataSignup.password}
                                                                                        onChange={handleChangeCriar}
                                                                                        required
                                                                                />
                                                                        </div>
                                                                        <button
                                                                                type="submit"
                                                                                className="Form-Button"
                                                                        >
                                                                                Sign
                                                                                Up
                                                                        </button>
                                                                </form>
                                                        </div>
                                                </div>
                                        </div>
                                )}
                        </div>

                        <div className="Chat-Footer">
                                <input
                                        type="text"
                                        placeholder={
                                                username
                                                        ? "Talk to VEX"
                                                        : "Login to use the chat"
                                        }
                                        value={input}
                                        onChange={(e) =>
                                                setInput(e.target.value)
                                        }
                                        disabled={!username}
                                />
                                {username ? (
                                        <button onClick={sendMessage}>
                                                <i className="fa fa-paper-plane"></i>
                                        </button>
                                ) : (
                                        <button>
                                                <i
                                                        className="fa fa-lock"
                                                        aria-hidden="true"
                                                ></i>
                                        </button>
                                )}
                        </div>
                </div>
        );
}
