"use client";

import "../styles/pages/chat.css";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
        faPaperPlane,
        faLock,
        faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Clock, BarChart2, Zap } from "lucide-react";

export default function Chat() {
        const [username, setUsername] = useState(null);
        const [input, setInput] = useState("");
        const [chatHistory, setChatHistory] = useState([]);
        const navigate = useNavigate();
        const chatContainerRef = useRef(null);

        // New state variables for chat stats
        const [totalMessages, setTotalMessages] = useState(0);
        const [averageResponseTime, setAverageResponseTime] = useState(0);
        const [longestMessage, setLongestMessage] = useState(0);
        const [fastestResponse, setFastestResponse] = useState(
                Number.POSITIVE_INFINITY,
        );

        const [formData, setFormData] = useState({
                email: "",
                password: "",
        });

        const [formDataSignup, setFormDataSignup] = useState({
                username: "",
                email: "",
                password: "",
        });

        const [isThinking, setIsThinking] = useState(false);

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
                                        "/openai/history",
                                        { credentials: "include" },
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

                const userMessage = { role: "user", content: input };
                setChatHistory((prev) => [...prev, userMessage]);
                setInput("");
                setIsThinking(true);

                // Update stats
                setTotalMessages((prev) => prev + 1);
                setLongestMessage((prev) => Math.max(prev, input.length));

                const startTime = Date.now();

                try {
                        const response = await fetch(
                                "/openai",
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
                                const assistantMessage = data.message.content;

                                const endTime = Date.now();
                                const responseTime = endTime - startTime;

                                // Update stats
                                setTotalMessages((prev) => prev + 1);
                                setLongestMessage((prev) =>
                                        Math.max(prev, assistantMessage.length),
                                );
                                setFastestResponse((prev) =>
                                        Math.min(prev, responseTime),
                                );
                                setAverageResponseTime(
                                        (prev) => (prev + responseTime) / 2,
                                );

                                let currentMessage = "";
                                let index = 0;
                                const step = 4;

                                setChatHistory((prev) => [
                                        ...prev,
                                        { role: "assistant", content: "" },
                                ]);

                                const typeEffect = () => {
                                        if (index < assistantMessage.length) {
                                                currentMessage +=
                                                        assistantMessage.slice(
                                                                index,
                                                                index + step,
                                                        );
                                                setChatHistory((prev) => {
                                                        const newHistory = [
                                                                ...prev,
                                                        ];
                                                        newHistory[
                                                                newHistory.length -
                                                                        1
                                                        ].content =
                                                                currentMessage;
                                                        return newHistory;
                                                });
                                                index += step;

                                                setTimeout(() => {
                                                        chatContainerRef.current.scrollTop =
                                                                chatContainerRef.current.scrollHeight;
                                                }, 0);

                                                setTimeout(typeEffect, 10);
                                        } else {
                                                setTimeout(() => {
                                                        chatContainerRef.current.scrollTop =
                                                                chatContainerRef.current.scrollHeight;
                                                }, 0);
                                                setIsThinking(false);
                                        }
                                };

                                typeEffect();
                        } else {
                                console.error("Error Sending Message.");
                                setIsThinking(false);
                        }
                } catch (error) {
                        console.error(
                                "Error Sending Message to Server:",
                                error,
                        );
                        setIsThinking(false);
                }
        };

        const handleSubmitLogin = async (e) => {
                e.preventDefault();
                try {
                        const response = await axios.post("/signup", formData);
                        if (response.status === 200) {
                                const authResponse = await axios.get(
                                        "/auth/check",
                                        { withCredentials: true },
                                );
                                setUsername(authResponse.data.username);
                        }
                } catch (error) {
                        if (error.response) {
                                console.error(error.response.data.message);
                        } else {
                                console.error(
                                        "Algum erro ocorreu. Tente novamente!",
                                );
                        }
                }
        };

        const handleSubmitCriar = async (e) => {
                e.preventDefault();
                try {
                        const response = await axios.post(
                                "/signin",
                                formDataSignup,
                        );
                        if (response.status === 201) {
                                const authResponse = await axios.get(
                                        "/auth/check",
                                        { withCredentials: true },
                                );
                                if (authResponse.status === 200) {
                                        console.log(authResponse.data.username);
                                        setUsername(authResponse.data.username);
                                        navigate("/chat");
                                }
                        }
                } catch (error) {
                        if (error.response) {
                                console.error(error.response.data.message);
                        } else {
                                console.error(
                                        "Algum erro ocorreu. Tente novamente!",
                                );
                        }
                }
        };

        const clearConversation = () => {
                setChatHistory([]);
        };

        useEffect(() => {
                if (chatContainerRef.current) {
                        chatContainerRef.current.scrollTop =
                                chatContainerRef.current.scrollHeight;
                }
        }, []);

        return (
                <div className="Chat-Page">
                        <div className="Chat-Header">
                                <h1>Welcome To VEX</h1>
                                <div className="Chat-Header-Buttons">
                                        <a href="/" className="Exit-Button">
                                                &#8592; Exit
                                        </a>
                                        <button
                                                onClick={clearConversation}
                                                className="Clear-Button"
                                        >
                                                Clear Chat
                                        </button>
                                </div>
                        </div>

                        {username && (
                                <div className="Chat-Dashboard">
                                        <div className="Dashboard-Item">
                                                <MessageSquare size={24} />
                                                <span>
                                                        Total Messages:{" "}
                                                        {totalMessages}
                                                </span>
                                        </div>
                                        <div className="Dashboard-Item">
                                                <Clock size={24} />
                                                <span>
                                                        Avg Response Time:{" "}
                                                        {averageResponseTime.toFixed(
                                                                2,
                                                        )}
                                                        ms
                                                </span>
                                        </div>
                                        <div className="Dashboard-Item">
                                                <BarChart2 size={24} />
                                                <span>
                                                        Longest Message:{" "}
                                                        {longestMessage} chars
                                                </span>
                                        </div>
                                        <div className="Dashboard-Item">
                                                <Zap size={24} />
                                                <span>
                                                        Fastest Response:{" "}
                                                        {fastestResponse ===
                                                        Number.POSITIVE_INFINITY
                                                                ? "N/A"
                                                                : `${fastestResponse}ms`}
                                                </span>
                                        </div>
                                </div>
                        )}

                        <div
                                className="Chat-Body"
                                ref={chatContainerRef}
                                style={{ scrollBehavior: "smooth" }}
                        >
                                <AnimatePresence>
                                        {username ? (
                                                <>
                                                        {chatHistory.map(
                                                                (
                                                                        msg,
                                                                        index,
                                                                ) => (
                                                                        <motion.div
                                                                                key={
                                                                                        index
                                                                                }
                                                                                className={
                                                                                        msg.role ===
                                                                                        "user"
                                                                                                ? "User-Message"
                                                                                                : "Assistant-Message"
                                                                                }
                                                                                initial={{
                                                                                        opacity: 0,
                                                                                        y: 20,
                                                                                }}
                                                                                animate={{
                                                                                        opacity: 1,
                                                                                        y: 0,
                                                                                }}
                                                                                exit={{
                                                                                        opacity: 0,
                                                                                        y: -20,
                                                                                }}
                                                                                transition={{
                                                                                        duration: 0.3,
                                                                                }}
                                                                        >
                                                                                {msg.role !==
                                                                                        "user" && (
                                                                                        <img
                                                                                                src="../img/VEXLOGO.png"
                                                                                                alt="Assistant"
                                                                                                className="Assistant-Avatar"
                                                                                        />
                                                                                )}
                                                                                <Markdown
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
                                                                                                        return !inline &&
                                                                                                                match ? (
                                                                                                                <SyntaxHighlighter
                                                                                                                        style={
                                                                                                                                vscDarkPlus
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
                                                                                >
                                                                                        {
                                                                                                msg.content
                                                                                        }
                                                                                </Markdown>
                                                                        </motion.div>
                                                                ),
                                                        )}
                                                        {isThinking && (
                                                                <motion.div
                                                                        className="Assistant-Message Thinking-Message"
                                                                        initial={{
                                                                                opacity: 0,
                                                                                y: 20,
                                                                        }}
                                                                        animate={{
                                                                                opacity: 1,
                                                                                y: 0,
                                                                        }}
                                                                        exit={{
                                                                                opacity: 0,
                                                                                y: -20,
                                                                        }}
                                                                        transition={{
                                                                                duration: 0.3,
                                                                        }}
                                                                >
                                                                        <FontAwesomeIcon
                                                                                icon={
                                                                                        faSpinner
                                                                                }
                                                                                spin
                                                                        />
                                                                        <span>
                                                                                VEX
                                                                                is
                                                                                thinking...
                                                                        </span>
                                                                </motion.div>
                                                        )}
                                                </>
                                        ) : (
                                                <div className="Login-SignIn-Form">
                                                        <div className="Form-Container">
                                                                <div className="Login-Side">
                                                                        <h2>
                                                                                Login
                                                                        </h2>
                                                                        <form
                                                                                onSubmit={
                                                                                        handleSubmitLogin
                                                                                }
                                                                        >
                                                                                <div className="Form-Group">
                                                                                        <label htmlFor="email">
                                                                                                Email:
                                                                                        </label>
                                                                                        <input
                                                                                                type="email"
                                                                                                id="email"
                                                                                                name="email"
                                                                                                value={
                                                                                                        formData.email
                                                                                                }
                                                                                                onChange={
                                                                                                        handleChange
                                                                                                }
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
                                                                                                value={
                                                                                                        formData.password
                                                                                                }
                                                                                                onChange={
                                                                                                        handleChange
                                                                                                }
                                                                                                required
                                                                                        />
                                                                                </div>
                                                                                <button
                                                                                        type="submit"
                                                                                        className="Form-Button-Login"
                                                                                >
                                                                                        Login
                                                                                </button>
                                                                        </form>
                                                                </div>
                                                                <div className="SignIn-Side">
                                                                        <h2>
                                                                                Sign
                                                                                Up
                                                                        </h2>
                                                                        <form
                                                                                onSubmit={
                                                                                        handleSubmitCriar
                                                                                }
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
                                                                                                onChange={
                                                                                                        handleChangeCriar
                                                                                                }
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
                                                                                                value={
                                                                                                        formDataSignup.email
                                                                                                }
                                                                                                onChange={
                                                                                                        handleChangeCriar
                                                                                                }
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
                                                                                                value={
                                                                                                        formDataSignup.password
                                                                                                }
                                                                                                onChange={
                                                                                                        handleChangeCriar
                                                                                                }
                                                                                                required
                                                                                        />
                                                                                </div>
                                                                                <button
                                                                                        type="submit"
                                                                                        className="Form-Button-Signup"
                                                                                >
                                                                                        Sign
                                                                                        Up
                                                                                </button>
                                                                        </form>
                                                                </div>
                                                        </div>
                                                </div>
                                        )}
                                </AnimatePresence>
                        </div>

                        <div className="Chat-Footer relative">
                                <textarea
                                        value={input}
                                        onChange={(e) =>
                                                setInput(e.target.value)
                                        }
                                        disabled={!username || isThinking}
                                        placeholder={
                                                username
                                                        ? isThinking
                                                                ? "VEX is thinking..."
                                                                : "Talk to VEX! Type your message here..."
                                                        : "SignUp or Login to use VEX"
                                        }
                                />

                                {username ? (
                                        <button
                                                onClick={sendMessage}
                                                disabled={isThinking}
                                        >
                                                <FontAwesomeIcon
                                                        icon={
                                                                isThinking
                                                                        ? faSpinner
                                                                        : faPaperPlane
                                                        }
                                                        spin={isThinking}
                                                />
                                        </button>
                                ) : (
                                        <button disabled>
                                                <FontAwesomeIcon
                                                        icon={faLock}
                                                />
                                        </button>
                                )}
                        </div>
                </div>
        );
}
