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
import Nav from "../components/nav";
import Footer from "../components/footer";
import { motion } from "framer-motion";

const Contact = () => {
        return (
                <motion.div className="contact-page">
                        <Nav />
                        <motion.div
                                className="contact-container"
                                transition={{ type: "spring", stiffness: 300 }}
                        >
                                <motion.h1
                                        className="contact-title"
                                        transition={{
                                                type: "spring",
                                                stiffness: 300,
                                        }}
                                >
                                        Contact Us
                                </motion.h1>
                                <div className="contact-content">
                                        <div className="contact-info">
                                                <div className="info-item">
                                                        <MapPin className="icon" />
                                                        <p>
                                                                Av. de Sidónio
                                                                Pais 93,
                                                                4100-467 Porto
                                                        </p>
                                                </div>
                                                <div className="info-item">
                                                        <Phone className="icon" />
                                                        <p>+351 936 931 636</p>
                                                </div>
                                                <div className="info-item">
                                                        <Mail className="icon" />
                                                        <p>help@vertexai.pt</p>
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
                                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3003.636148543407!2d-8.639022124083544!3d41.164290171329036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2465a24ef2f013%3A0x88653da9a02aaa23!2sAv.%20de%20Sid%C3%B3nio%20Pais%2C%20Porto!5e0!3m2!1spt-PT!2spt!4v1740352475004!5m2!1spt-PT!2spt"
                                                        width="100%"
                                                        height="450"
                                                        style={{ border: 0 }}
                                                        allowFullScreen=""
                                                        loading="lazy"
                                                        title="Google Maps"
                                                ></iframe>
                                        </div>
                                </div>
                        </motion.div>
                        <Footer />
                </motion.div>
        );
};

export default Contact;
