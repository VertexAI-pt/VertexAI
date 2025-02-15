import { motion } from "framer-motion";
import { ShoppingCart, Check } from "lucide-react";
import "../styles/pages/products.css";

const ProductCard = ({ name, description, price, features }) => (
        <motion.div
                className="product-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
        >
                <h2 className="product-name">{name}</h2>
                <p className="product-description">{description}</p>
                <div className="product-price">${price}</div>
                <ul className="product-features">
                        {features.map((feature, index) => (
                                <li key={index}>
                                        <Check size={16} /> {feature}
                                </li>
                        ))}
                </ul>
                <button className="buy-button">
                        <ShoppingCart size={20} />
                        Buy Now
                </button>
        </motion.div>
);

export default function Products() {
        const products = [
                {
                        name: "AI Assistant Pro",
                        description:
                                "Advanced AI model for natural language processing and task automation.",
                        price: 99.99,
                        features: [
                                "24/7 AI-powered assistance",
                                "Natural language understanding",
                                "Task automation capabilities",
                                "Customizable responses",
                                "Multi-language support",
                        ],
                },
                {
                        name: "DeepVision AI",
                        description:
                                "State-of-the-art computer vision model for image and video analysis.",
                        price: 149.99,
                        features: [
                                "Object detection and tracking",
                                "Facial recognition",
                                "Image classification",
                                "Scene understanding",
                                "Real-time video analysis",
                        ],
                },
                {
                        name: "PredictAI",
                        description:
                                "Powerful predictive analytics model for business intelligence and forecasting.",
                        price: 199.99,
                        features: [
                                "Advanced data analysis",
                                "Trend forecasting",
                                "Anomaly detection",
                                "Customizable dashboards",
                                "Integration with popular BI tools",
                        ],
                },
        ];

        return (
                <div className="products-page">
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
                </div>
        );
}
