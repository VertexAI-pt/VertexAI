import "../styles/pages/chat.css";
export default function Chat() {
        return (
                <div className="Chat-Page">
                        <div className="Chat-Header">
                                <h1>Welcome To VEX</h1>
                        </div>
                        <div className="Chat-Body"></div>
                        <div className="Chat-Footer">
                                <input
                                        type="text"
                                        placeholder="Type your message..."
                                        onChange={(e) => e.target.value}
                                />
                                <button>Send</button>
                        </div>
                </div>
        );
}
