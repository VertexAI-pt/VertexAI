"use client";

import "../styles/pages/home.css";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import {
        ArrowRight,
        MessageSquare,
        Zap,
        Shield,
        ChevronDown,
        ChevronUp,
} from "lucide-react";
import { useState } from "react";

const FeatureCard = ({ icon: Icon, title, description }) => (
        <motion.div
                className="feature-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
        >
                <Icon className="feature-icon" />
                <h3>{title}</h3>
                <p>{description}</p>
        </motion.div>
);

const Testimonial = ({ name, role, content }) => (
        <motion.div
                className="testimonial-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
        >
                <p>"{content}"</p>
                <div className="testimonial-author">
                        <strong>{name}</strong>
                        <span>{role}</span>
                </div>
        </motion.div>
);

const FAQItem = ({ question, answer }) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
                <div className="faq-item">
                        <button
                                className="faq-question"
                                onClick={() => setIsOpen(!isOpen)}
                        >
                                {question}
                                {isOpen ? <ChevronUp /> : <ChevronDown />}
                        </button>
                        {isOpen && <p className="faq-answer">{answer}</p>}
                </div>
        );
};

export default function Home() {
        return (
                <div className="App">
                        <Nav />
                        <main>
                                <section className="hero">
                                        <motion.div
                                                className="hero-content"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                        >
                                                <h1>Welcome to VertexAI</h1>
                                                <p>
                                                        Empowering developers
                                                        with cutting-edge AI
                                                        solutions
                                                </p>
                                                <a
                                                        href="/chat"
                                                        className="cta-button"
                                                >
                                                        Try Our AI Chat{" "}
                                                        <ArrowRight className="icon" />
                                                </a>
                                        </motion.div>
                                </section>

                                <section className="features">
                                        <h2>Our Features</h2>
                                        <div className="features-grid">
                                                <FeatureCard
                                                        icon={MessageSquare}
                                                        title="AI-Powered Chat"
                                                        description="Engage with our advanced AI chatbot for instant assistance and information."
                                                />
                                                <FeatureCard
                                                        icon={Zap}
                                                        title="Lightning-Fast Responses"
                                                        description="Get quick and accurate answers to your development queries."
                                                />
                                                <FeatureCard
                                                        icon={Shield}
                                                        title="Secure & Private"
                                                        description="Your data and conversations are protected with state-of-the-art security measures."
                                                />
                                        </div>
                                </section>

                                <section className="testimonials">
                                        <h2>What Our Users Say</h2>
                                        <div className="testimonials-grid">
                                                <Testimonial
                                                        name="John Doe"
                                                        role="Full Stack Developer"
                                                        content="VertexAI has significantly improved my productivity. The AI chat is like having a knowledgeable colleague always ready to help!"
                                                />
                                                <Testimonial
                                                        name="Jane Smith"
                                                        role="AI Researcher"
                                                        content="I'm impressed by the accuracy and depth of VertexAI's responses. It's an invaluable tool for staying updated in the fast-paced world of AI."
                                                />
                                                <Testimonial
                                                        name="Mike Johnson"
                                                        role="Startup Founder"
                                                        content="VertexAI has been a game-changer for our development team. It's like having an extra team member who's always available to answer questions."
                                                />
                                        </div>
                                </section>

                                <section className="faq">
                                        <h2>Frequently Asked Questions</h2>
                                        <FAQItem
                                                question="What is VertexAI?"
                                                answer="VertexAI is an AI-powered platform designed to assist developers with coding queries, provide information on the latest technologies, and offer solutions to common programming challenges."
                                        />
                                        <FAQItem
                                                question="Is VertexAI free to use?"
                                                answer="Yes, our basic AI chat service is free for all users. We also offer premium plans with additional features for power users and enterprises."
                                        />
                                        <FAQItem
                                                question="How accurate is the AI?"
                                                answer="Our AI is trained on vast amounts of up-to-date programming knowledge and is continuously improving. While it's highly accurate, we always recommend verifying critical information."
                                        />
                                        <FAQItem
                                                question="Can I use VertexAI for commercial projects?"
                                                answer="VertexAI can be used for both personal and commercial projects. Just make sure to review our terms of service for any specific limitations."
                                        />
                                </section>
                        </main>
                        <Footer />
                </div>
        );
}
