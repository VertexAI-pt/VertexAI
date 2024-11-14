import "./App.css";

function App() {
        return (
                <div className="App">
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
                                                <a
                                                        className="App-item1"
                                                        href=""
                                                >
                                                        Home
                                                </a>
                                        </li>
                                        <li>
                                                <a
                                                        className="App-item2"
                                                        href=""
                                                >
                                                        Services
                                                </a>
                                        </li>
                                        <li>
                                                <a
                                                        className="App-item3"
                                                        href=""
                                                >
                                                        About
                                                </a>
                                        </li>
                                        <li>
                                                <a
                                                        className="App-item4"
                                                        href=""
                                                >
                                                        Chat
                                                </a>
                                        </li>
                                </ul>
                        </nav>
                        <header className="App-header">
                                <p>VERTEX.AI</p>
                                <a
                                        className="App-link"
                                        href="https://github.com/LuisMartins21/VERTEX.ai"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                >
                                        Git Repository
                                </a>
                        </header>

                        <footer className="App-footer">
                                <div className="Footer-left">
                                        <h1>Resources</h1>
                                        <ul>
                                                <li>
                                                        <a href="">
                                                                Help Center
                                                        </a>
                                                </li>

                                                <li>
                                                        <a href="">Blog</a>
                                                </li>

                                                <li>
                                                        <a href="">FAQ's</a>
                                                </li>
                                        </ul>
                                </div>

                                <div className="Footer-center">
                                        <h1>Company</h1>
                                        <ul>
                                                <li>
                                                        <a href="">About Us</a>
                                                </li>

                                                <li>
                                                        <a href="">
                                                                Our Partners
                                                        </a>
                                                </li>

                                                <li>
                                                        <a href="">Book Call</a>
                                                </li>
                                        </ul>
                                </div>

                                <div className="Footer-right">
                                        <h1>Contact</h1>
                                        <ul>
                                                <li>
                                                        <a href="">Instagram</a>
                                                </li>

                                                <li>
                                                        <a href="">Facebook</a>
                                                </li>

                                                <li>
                                                        <a href="">Whatsapp</a>
                                                </li>
                                        </ul>
                                </div>
                        </footer>
                </div>
        );
}

export default App;
