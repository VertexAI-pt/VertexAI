import {
        MapPin,
        Phone,
        Mail,
        Facebook,
        Twitter,
        Instagram,
        Linkedin,
} from "lucide-react";
import "../styles/pages/contact.css";

const Contact = () => {
        return (
                <div className="contact-page">
                        <div className="contact-container">
                                <h1 className="contact-title">Contact Us</h1>
                                <div className="contact-content">
                                        <div className="contact-info">
                                                <div className="info-item">
                                                        <MapPin className="icon" />
                                                        <p>
                                                                123 AI Street,
                                                                Tech City, TC
                                                                12345
                                                        </p>
                                                </div>
                                                <div className="info-item">
                                                        <Phone className="icon" />
                                                        <p>+1 (555) 123-4567</p>
                                                </div>
                                                <div className="info-item">
                                                        <Mail className="icon" />
                                                        <p>
                                                                contact@vertexai.com
                                                        </p>
                                                </div>
                                                <div className="social-icons">
                                                        <a
                                                                href="https://facebook.com"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                        >
                                                                <Facebook className="icon" />
                                                        </a>
                                                        <a
                                                                href="https://twitter.com"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                        >
                                                                <Twitter className="icon" />
                                                        </a>
                                                        <a
                                                                href="https://instagram.com"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                        >
                                                                <Instagram className="icon" />
                                                        </a>
                                                        <a
                                                                href="https://linkedin.com"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                        >
                                                                <Linkedin className="icon" />
                                                        </a>
                                                </div>
                                        </div>
                                        <div className="map-container">
                                                <iframe
                                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648718453!2d-73.98656668459468!3d40.74844097932855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1614518639048!5m2!1sen!2sus"
                                                        width="100%"
                                                        height="450"
                                                        style={{ border: 0 }}
                                                        allowFullScreen=""
                                                        loading="lazy"
                                                        title="Google Maps"
                                                ></iframe>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default Contact;
