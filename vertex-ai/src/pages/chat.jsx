import "../styles/pages/chat.css";
import { useState, useEffect } from "react";
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Chat() {
    const [input, setInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch("http://localhost:8000/openai/history", {
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    setChatHistory(data.history || []);
                }
            } catch (error) {
                console.error("Erro ao carregar histórico:", error);
            }
        };
        fetchHistory();
    }, []);

    const sendMessage = async () => {
        if (!input.trim()) return;

        try {
            const response = await fetch("http://localhost:8000/openai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ input }),
            });

            if (response.ok) {
                const data = await response.json();
                setChatHistory(data.history);
                setInput(""); // Limpar a entrada
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
            </div>
            <div className="Chat-Body">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={msg.role === "user" ? "User-Message" : "Assistant-Message"}>
                        <Markdown
                            children={msg.content}
                            components={{
                                code({node, inline, className, children, ...props}) {
                                    // Detecta a linguagem para a sintaxe (exemplo: js, html, etc.)
                                    const match = /language-(\w+)/.exec(className || '');
                                    return match ? (
                                        <SyntaxHighlighter
                                            style={darcula}
                                            language={match[1]}
                                            PreTag="div"
                                            children={String(children).replace(/\n$/, '')}
                                            {...props}
                                        />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
            <div className="Chat-Footer">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}
