import { useState } from "react";
import { motion } from "framer-motion";
import {
        ChevronDown,
        ChevronUp,
        MessageSquare,
        Cpu,
        Building,
        Linkedin,
        Instagram,
} from "lucide-react";
import "../styles/pages/about.css";
import Nav from "../components/nav";

const FeatureCard = ({ title, description, icon: Icon }) => (
        <motion.div
                className="feature-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
        >
                <Icon className="feature-icon" />
                <h3 className="feature-title">{title}</h3>
                <p className="feature-description">{description}</p>
        </motion.div>
);

const FounderCard = ({ name, role, bio, image, linkedin, instagram }) => (
        <motion.div
                className="founder-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
        >
                <img
                        src={image || "/placeholder.svg"}
                        alt={name}
                        className="founder-image"
                />
                <div className="founder-info">
                        <h3 className="founder-name">{name}</h3>
                        <p className="founder-role">{role}</p>
                        <p className="founder-bio">{bio}</p>
                        <div className="founder-social">
                                <a
                                        href={linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                >
                                        <Linkedin className="social-icon" />
                                </a>
                                <a
                                        href={instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                >
                                        <Instagram className="social-icon" />
                                </a>
                        </div>
                </div>
        </motion.div>
);

export default function About() {
        const [showMore, setShowMore] = useState(false);

        const founders = [
                {
                        name: "Luis Martins",
                        role: "Founder & Front-End Developer",
                        bio: "bio",
                        image: "/placeholder.svg?height=200&width=200",
                        linkedin: "https://www.linkedin.com/in/luis-martins-10a1612b2/",
                        instagram: "https://www.instagram.com/luis_martins_25/",
                },
                {
                        name: "Tanjil Khan",
                        role: "Co-Founder & Back-End Developer",
                        bio: "bio",
                        image: "/placeholder.svg?height=200&width=200",
                        linkedin: "https://www.linkedin.com/in/tanjil-khan/",
                        instagram: "https://www.instagram.com/tsk.xz/",
                },
        ];

        const features = [
                {
                        title: "AI Chatbot for Developers",
                        description:
                                "Free-to-use AI assistant dedicated to helping developers with their coding queries.",
                        icon: MessageSquare,
                },
                {
                        title: "Custom AI Models",
                        description:
                                "Tailored AI solutions to empower businesses and drive innovation.",
                        icon: Cpu,
                },
                {
                        title: " UI/UX & Product Design Consulting",
                        description:
                                "Creating intuitive and engaging experiences to enhance usability and elevate digital products.",
                        icon: Building,
                },
        ];

        return (
                <div className="about-page">
                        <Nav />
                        <div className="container">
                                <motion.h1
                                        className="page-title"
                                        initial={{ opacity: 0, y: -50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                >
                                        About Our AI Startup
                                </motion.h1>

                                <motion.p
                                        className="page-description"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                                delay: 0.2,
                                                duration: 0.5,
                                        }}
                                >
                                        We are a team of passionate AI
                                        enthusiasts dedicated to creating
                                        innovative solutions that empower
                                        developers and businesses in the digital
                                        world.
                                </motion.p>

                                <motion.div
                                        className="founders-section"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                                delay: 0.4,
                                                duration: 0.5,
                                        }}
                                >
                                        <h2 className="section-title">
                                                Meet Our Founders
                                        </h2>
                                        <div className="founders-grid">
                                                {founders.map(
                                                        (founder, index) => (
                                                                <FounderCard
                                                                        key={
                                                                                index
                                                                        }
                                                                        {...founder}
                                                                />
                                                        ),
                                                )}
                                        </div>
                                </motion.div>

                                <motion.div
                                        className="features-section"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                                delay: 0.6,
                                                duration: 0.5,
                                        }}
                                >
                                        <h2 className="section-title">
                                                Our Solutions
                                        </h2>
                                        <div className="features-grid">
                                                {features.map(
                                                        (feature, index) => (
                                                                <FeatureCard
                                                                        key={
                                                                                index
                                                                        }
                                                                        {...feature}
                                                                />
                                                        ),
                                                )}
                                        </div>
                                </motion.div>

                                <motion.div
                                        className="mission-section"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                                delay: 0.8,
                                                duration: 0.5,
                                        }}
                                >
                                        <h2 className="section-title">
                                                Our Mission
                                        </h2>
                                        <p className="mission-text">
                                                At VertexAI, we believe that AI
                                                should be an accessible and
                                                powerful tool for developers and
                                                businesses alike. Our mission is
                                                to empower developers with a
                                                free-to-use AI chatbot designed
                                                to assist with coding,
                                                debugging, and learning new
                                                technologies—making development
                                                faster and more efficient.
                                        </p>
                                        {showMore && (
                                                <motion.p
                                                        className="mission-text"
                                                        initial={{
                                                                opacity: 0,
                                                                height: 0,
                                                        }}
                                                        animate={{
                                                                opacity: 1,
                                                                height: "auto",
                                                        }}
                                                        transition={{
                                                                duration: 0.3,
                                                        }}
                                                >
                                                        Beyond that, we
                                                        specialize in building
                                                        cutting-edge AI models
                                                        that help businesses
                                                        optimize processes,
                                                        enhance decision-making,
                                                        and unlock new
                                                        opportunities. Whether
                                                        it’s through smart
                                                        automation, data-driven
                                                        insights, or advanced AI
                                                        solutions, we strive to
                                                        push the boundaries of
                                                        what technology can
                                                        achieve. At our core, we
                                                        are dedicated to
                                                        innovation,
                                                        accessibility, and
                                                        collaboration, ensuring
                                                        that AI serves as a tool
                                                        for growth, creativity,
                                                        and problem-solving for
                                                        everyone.
                                                </motion.p>
                                        )}
                                        <button
                                                className="show-more-button"
                                                onClick={() =>
                                                        setShowMore(!showMore)
                                                }
                                        >
                                                {showMore
                                                        ? "Show Less"
                                                        : "Show More"}
                                                {showMore ? (
                                                        <ChevronUp className="chevron-icon" />
                                                ) : (
                                                        <ChevronDown className="chevron-icon" />
                                                )}
                                        </button>
                                </motion.div>
                        </div>
                </div>
        );
}
