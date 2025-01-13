import "../styles/pages/chat.css";
import { useState, useEffect } from "react";

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
                    <div key={index} className={msg.role === "user" ? "user-message" : "assistant-message"}>
                        <p>{msg.content}</p>
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
