import "./footer.css";

export default function Footer() {
        return (
                <footer className="App-footer">
                        <div className="Footer-left">
                                <h1>Resources</h1>
                                <ul>
                                        <li>
                                                <a
                                                        className="App-item5"
                                                        href="/help"
                                                >
                                                        Help Center
                                                </a>
                                        </li>

                                        <li>
                                                <a
                                                        className="App-item6"
                                                        href="/blog"
                                                >
                                                        Blog
                                                </a>
                                        </li>

                                        <li>
                                                <a
                                                        className="App-item7"
                                                        href="/faq"
                                                >
                                                        FAQ's
                                                </a>
                                        </li>
                                </ul>
                        </div>

                        <div className="Footer-center">
                                <h1>Company</h1>
                                <ul>
                                        <li>
                                                <a
                                                        className="App-item8"
                                                        href="/about"
                                                >
                                                        About Us
                                                </a>
                                        </li>

                                        <li>
                                                <a
                                                        className="App-item9"
                                                        href="/partners"
                                                >
                                                        Our Partners
                                                </a>
                                        </li>

                                        <li>
                                                <a
                                                        className="App-item10"
                                                        href="/book"
                                                >
                                                        Book Call
                                                </a>
                                        </li>
                                </ul>
                        </div>

                        <div className="Footer-right">
                                <h1>Contact</h1>
                                <ul>
                                        <li>
                                                <a
                                                        className="App-item11"
                                                        href="www.instagram.com"
                                                >
                                                        Instagram
                                                </a>
                                        </li>

                                        <li>
                                                <a
                                                        className="App-item12"
                                                        href="www.facebook.com"
                                                >
                                                        Facebook
                                                </a>
                                        </li>

                                        <li>
                                                <a
                                                        className="App-item13"
                                                        href="www.whatsapp.com"
                                                >
                                                        Whatsapp
                                                </a>
                                        </li>
                                </ul>
                        </div>
                </footer>
        );
}
