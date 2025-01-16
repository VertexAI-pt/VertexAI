import "../styles/pages/chat.css";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";

export default function Chat() {
        const [username, setUsername] = useState(null);
        const [input, setInput] = useState("");
        const [chatHistory, setChatHistory] = useState([]);

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
                                                                        action="/login"
                                                                        method="POST"
                                                                >
                                                                        <div className="Form-Group">
                                                                                <label htmlFor="login-email">
                                                                                        Email:
                                                                                </label>
                                                                                <input
                                                                                        type="email"
                                                                                        id="login-email"
                                                                                        name="email"
                                                                                        required
                                                                                />
                                                                        </div>
                                                                        <div className="Form-Group">
                                                                                <label htmlFor="login-password">
                                                                                        Password:
                                                                                </label>
                                                                                <input
                                                                                        type="password"
                                                                                        id="login-password"
                                                                                        name="password"
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
                                                                        action="/signup"
                                                                        method="POST"
                                                                >
                                                                        <div className="Form-Group">
                                                                                <label htmlFor="signup-name">
                                                                                        Name:
                                                                                </label>
                                                                                <input
                                                                                        type="text"
                                                                                        id="signup-name"
                                                                                        name="name"
                                                                                        required
                                                                                />
                                                                        </div>
                                                                        <div className="Form-Group">
                                                                                <label htmlFor="signup-email">
                                                                                        Email:
                                                                                </label>
                                                                                <input
                                                                                        type="email"
                                                                                        id="signup-email"
                                                                                        name="email"
                                                                                        required
                                                                                />
                                                                        </div>
                                                                        <div className="Form-Group">
                                                                                <label htmlFor="signup-password">
                                                                                        Password:
                                                                                </label>
                                                                                <input
                                                                                        type="password"
                                                                                        id="signup-password"
                                                                                        name="password"
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
