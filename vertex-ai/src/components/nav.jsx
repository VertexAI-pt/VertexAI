"use client";

import "../styles/components/nav.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
        User,
        LogOut,
        Menu,
        X,
        Home,
        Package,
        MessageSquare,
        Info,
        Phone,
        LayoutDashboard,
} from "lucide-react";
import axios from "axios";

export default function Nav() {
        const [username, setUsername] = useState(null);
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const router = useNavigate();

        useEffect(() => {
                axios.get("/auth/check", { withCredentials: true })
                        .then((response) => {
                                setUsername(response.data.username);
                        })
                        .catch(() => {
                                setUsername(null);
                        });
        }, []);

        const handleLogout = async () => {
                try {
                        const response = await fetch(
                                "http://localhost:8000/logout",
                                {
                                        method: "POST",
                                        credentials: "include",
                                },
                        );

                        if (response.ok) {
                                console.log("User logged out");
                                setUsername(null);
                                router.push("/home");
                        } else {
                                console.error("Failed to log out");
                        }
                } catch (error) {
                        console.error("Error logging out:", error);
                }
        };

        const toggleMenu = () => {
                setIsMenuOpen(!isMenuOpen);
        };

        return (
                <nav className="App-nav">
                        <div className="nav-container">
                                <a href="/home" className="App-logo">
                                        <img
                                                className="logo"
                                                src="img/VEXLOGO.png"
                                                alt="Vertex.AI Logo"
                                        />
                                </a>

                                <button
                                        className="menu-toggle"
                                        onClick={toggleMenu}
                                        aria-label={
                                                isMenuOpen
                                                        ? "Close menu"
                                                        : "Open menu"
                                        }
                                >
                                        {isMenuOpen ? <X /> : <Menu />}
                                </button>

                                <ul
                                        className={`nav-links ${isMenuOpen ? "active" : ""}`}
                                >
                                        <li>
                                                <a
                                                        className="nav-item"
                                                        href="/home"
                                                >
                                                        <Home size={16} />
                                                        <span>HOME</span>
                                                </a>
                                        </li>
                                        <li>
                                                <a
                                                        className="nav-item"
                                                        href="/products"
                                                >
                                                        <Package size={16} />
                                                        <span>PRODUCTS</span>
                                                </a>
                                        </li>
                                        <li>
                                                <a
                                                        className="nav-item"
                                                        href="/VEX"
                                                >
                                                        <MessageSquare
                                                                size={16}
                                                        />
                                                        <span>VEX</span>
                                                </a>
                                        </li>
                                        <li>
                                                <a
                                                        className="nav-item"
                                                        href="/about-us"
                                                >
                                                        <Info size={16} />
                                                        <span>ABOUT</span>
                                                </a>
                                        </li>
                                        <li>
                                                <a
                                                        className="nav-item"
                                                        href="/contact"
                                                >
                                                        <Phone size={16} />
                                                        <span>CONTACT</span>
                                                </a>
                                        </li>
                                        {username && (
                                                <li>
                                                        <a
                                                                className="nav-item"
                                                                href="/dashboard"
                                                        >
                                                                <LayoutDashboard
                                                                        size={
                                                                                16
                                                                        }
                                                                />
                                                                <span>
                                                                        DASHBOARD
                                                                </span>
                                                        </a>
                                                </li>
                                        )}
                                        <li>
                                                {username ? (
                                                        <button
                                                                className="nav-item logout-button"
                                                                onClick={
                                                                        handleLogout
                                                                }
                                                        >
                                                                <LogOut
                                                                        size={
                                                                                16
                                                                        }
                                                                />
                                                                <span>
                                                                        Logout
                                                                </span>
                                                        </button>
                                                ) : (
                                                        <a
                                                                className="nav-item login-button"
                                                                href="/log"
                                                        >
                                                                <User
                                                                        size={
                                                                                16
                                                                        }
                                                                />
                                                                <span>
                                                                        Login
                                                                </span>
                                                        </a>
                                                )}
                                        </li>
                                </ul>
                        </div>
                </nav>
        );
}
