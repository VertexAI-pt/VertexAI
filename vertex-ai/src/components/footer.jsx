import "../styles/components/footer.css";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
        return (
                <footer className="App-footer">
                        <div className="footer-container">
                                <div className="footer-section">
                                        <h3>Resources</h3>
                                        <ul>
                                                <li>
                                                        <Link href="/help">
                                                                Help Center
                                                        </Link>
                                                </li>
                                                <li>
                                                        <a href="/terms-of-service">
                                                                Terms Of Service
                                                        </a>
                                                </li>
                                                <li>
                                                        <Link href="/faq">
                                                                FAQ's
                                                        </Link>
                                                </li>
                                        </ul>
                                </div>

                                <div className="footer-section">
                                        <h3>Company</h3>
                                        <ul>
                                                <li>
                                                        <Link href="/about">
                                                                Our Team
                                                        </Link>
                                                </li>
                                                <li>
                                                        <Link href="/partners">
                                                                Our Partners
                                                        </Link>
                                                </li>
                                                <li>
                                                        <Link href="/book">
                                                                Book Call
                                                        </Link>
                                                </li>
                                        </ul>
                                </div>

                                <div className="footer-section">
                                        <h3>Follow Us</h3>
                                        <ul className="social-links">
                                                <li>
                                                        <a
                                                                href="https://www.instagram.com"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                        >
                                                                <Instagram
                                                                        size={
                                                                                20
                                                                        }
                                                                />
                                                                <span>
                                                                        Instagram
                                                                </span>
                                                        </a>
                                                </li>
                                                <li>
                                                        <a
                                                                href="https://www.facebook.com"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                        >
                                                                <Facebook
                                                                        size={
                                                                                20
                                                                        }
                                                                />
                                                                <span>
                                                                        Facebook
                                                                </span>
                                                        </a>
                                                </li>
                                                <li>
                                                        <a
                                                                href="https://www.whatsapp.com"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                        >
                                                                <Linkedin
                                                                        size={
                                                                                20
                                                                        }
                                                                />
                                                                <span>
                                                                        LinkedIn
                                                                </span>
                                                        </a>
                                                </li>

                                                <li>
                                                        <a
                                                                href="/home"
                                                                className="App-logo-footer"
                                                        >
                                                                <img
                                                                        className="logo"
                                                                        src="img/VEXLOGO.png"
                                                                        alt="Vertex.AI Logo"
                                                                />
                                                        </a>
                                                </li>
                                        </ul>
                                </div>
                        </div>
                </footer>
        );
}
