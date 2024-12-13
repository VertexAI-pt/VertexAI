import "./nav.css";

export default function Nav() {
        return (
                <nav className="App-nav">
                        <ul>
                                <div className="App-logo">
                                        <img
                                                className="logo"
                                                src="./img/Vertexailogo-removebg-preview.png"
                                                alt="Logo"
                                        />
                                </div>

                                <li>
                                        <a className="App-item1" href="/home">
                                                Home
                                        </a>
                                </li>
                                <li>
                                        <a className="App-item2" href="">
                                                Services
                                        </a>
                                </li>
                                <li>
                                        <a className="App-item3" href="">
                                                About
                                        </a>
                                </li>
                                <li>
                                        <a className="App-item4" href="/chat">
                                                Chat
                                        </a>
                                </li>
                        </ul>
                </nav>
        );
}
