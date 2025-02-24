import { motion } from "framer-motion";
import { ShoppingCart, Check } from "lucide-react";
import "../styles/pages/products.css";
import Nav from "../components/nav";
import Footer from "../components/footer";

const ProductCard = ({ name, description, price, features }) => (
        <motion.div
                className="product-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
        >
                <h2 className="product-name">{name}</h2>
                <p className="product-description">{description}</p>
                <div className="product-price">{price}€/Month</div>
                <ul className="product-features">
                        {features.map((feature, index) => (
                                <li key={index}>
                                        <Check size={16} /> {feature}
                                </li>
                        ))}
                </ul>
                <a href="/contact" className="buy-button">
                        <ShoppingCart size={20} />
                        Buy Now
                </a>
        </motion.div>
);

export default function Products() {
        const products = [
                {
                        name: "VEX Assistant Pro",
                        description:
                                "Advanced AI model for natural language processing and task automation",
                        price: 399.99,
                        features: [
                                "24/7 AI-powered assistance",
                                "Natural language understanding",
                                "Task automation capabilities",
                                "Customizable responses",
                                "Multi-language support",
                        ],
                },
                {
                        name: "Stock Sentiment Analyzer",
                        description:
                                "AI-driven model that analyzes market for smarter investment decisions",
                        price: 949.99,
                        features: [
                                "Scrapes news, Twitter and Reddit",
                                "Uses NLP for classification",
                                "Detects bullish, bearish or trends",
                                "Provides real-time market insights",
                                "Integrates with trading platforms",
                        ],
                },
                {
                        name: "Symptom Checker",
                        description:
                                "AI that analyzes symptoms to provide diagnoses and next steps for doctors",
                        price: 749.99,
                        features: [
                                "Understands symptoms via NLP",
                                "Matches with medical databases",
                                "Provides condition likelihoods",
                                "Suggests next steps",
                                "Integrates with telemedicine",
                        ],
                },
        ];

        return (
                <div className="products-page">
                        <Nav />
                        <div className="container">
                                <motion.h1
                                        className="page-title"
                                        initial={{ opacity: 0, y: -50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                >
                                        Our AI Models
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
                                        Empower your business with our
                                        cutting-edge AI solutions
                                </motion.p>
                                <div className="products-grid">
                                        {products.map((product, index) => (
                                                <ProductCard
                                                        key={index}
                                                        {...product}
                                                />
                                        ))}
                                </div>
                        </div>
                        <Footer />
                </div>
        );
}
