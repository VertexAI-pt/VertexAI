import "./nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
        return (
                <nav className="App-nav">
                        <ul>
                                <div className="App-logo">
                                        <img
                                                className="logo"
                                                src="./img/Vertexailogo-removebg-preview.png"
                                                alt="Vertex.AI Logo"
                                        />
                                </div>

                                <li>
                                        <a className="App-item1" href="/home">
                                                Home
                                        </a>
                                </li>

                                <li>
                                        <a className="App-item3" href="/about">
                                                About
                                        </a>
                                </li>
                                <li>
                                        <a className="App-item4" href="/chat">
                                                Chat
                                        </a>
                                </li>

                                <li>
                                        <a
                                                className="Login-button"
                                                href="/login"
                                        >
                                                <FontAwesomeIcon
                                                        icon={faUser}
                                                        bounce
                                                        href="/login"
                                                        size="lg"
                                                        style={{
                                                                color: "#ffffff",
                                                        }}
                                                />
                                        </a>
                                </li>
                        </ul>
                </nav>
        );
}
