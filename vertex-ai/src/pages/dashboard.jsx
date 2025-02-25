"use client";

import "../styles/pages/dashboard.css";
import { useState, useEffect } from "react";
import {
        MessageSquare,
        Clock,
        BarChart2,
        Zap,
        Users,
        Calendar,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
        const [username, setUsername] = useState(null);
        const [stats, setStats] = useState({
                totalMessages: 0,
                averageResponseTime: 0,
                longestMessage: 0,
                fastestResponse: Number.POSITIVE_INFINITY,
                totalUsers: 0,
                activeUsers: 0,
                messagesPerDay: 0,
        });
        const navigate = useNavigate();

        useEffect(() => {
                axios.get("/auth/check", { withCredentials: true })
                        .then((response) => {
                                setUsername(response.data.username);
                        })
                        .catch(() => {
                                setUsername(null);
                                navigate("/log"); // Redirect to login if not authenticated
                        });

                // Fetch dashboard stats
                // This is a mock API call. Replace with actual API when available
                const fetchStats = async () => {
                        try {
                                // const response = await axios.get("/api/dashboard-stats");
                                // setStats(response.data);

                                // Mock data for now
                                setStats({
                                        totalMessages: 1234,
                                        averageResponseTime: 1.5,
                                        longestMessage: 500,
                                        fastestResponse: 0.5,
                                        totalUsers: 567,
                                        activeUsers: 123,
                                        messagesPerDay: 789,
                                });
                        } catch (error) {
                                console.error(
                                        "Error fetching dashboard stats:",
                                        error,
                                );
                        }
                };

                fetchStats();
        }, [navigate]);

        return (
                <div className="Dashboard-Page">
                        <header className="Dashboard-Header">
                                <h1>Dashboard</h1>
                                <p>Welcome back, {username}!</p>
                        </header>

                        <main className="Dashboard-Content">
                                <section className="Stats-Grid">
                                        <div className="Stat-Card">
                                                <MessageSquare size={24} />
                                                <h2>Total Messages</h2>
                                                <p>{stats.totalMessages}</p>
                                        </div>
                                        <div className="Stat-Card">
                                                <Clock size={24} />
                                                <h2>Avg Response Time</h2>
                                                <p>
                                                        {stats.averageResponseTime.toFixed(
                                                                2,
                                                        )}
                                                        s
                                                </p>
                                        </div>
                                        <div className="Stat-Card">
                                                <BarChart2 size={24} />
                                                <h2>Longest Message</h2>
                                                <p>
                                                        {stats.longestMessage}{" "}
                                                        chars
                                                </p>
                                        </div>
                                        <div className="Stat-Card">
                                                <Zap size={24} />
                                                <h2>Fastest Response</h2>
                                                <p>{stats.fastestResponse}s</p>
                                        </div>
                                        <div className="Stat-Card">
                                                <Users size={24} />
                                                <h2>Total Users</h2>
                                                <p>{stats.totalUsers}</p>
                                        </div>
                                        <div className="Stat-Card">
                                                <Users size={24} />
                                                <h2>Active Users</h2>
                                                <p>{stats.activeUsers}</p>
                                        </div>
                                        <div className="Stat-Card">
                                                <Calendar size={24} />
                                                <h2>Messages / Day</h2>
                                                <p>{stats.messagesPerDay}</p>
                                        </div>
                                </section>

                                <section className="Chart-Section">
                                        <h2>Activity Over Time</h2>
                                        <div className="Chart-Placeholder">
                                                {/* Add a chart component here when available */}
                                                <p>Chart coming soon...</p>
                                        </div>
                                </section>
                        </main>

                        <footer className="Dashboard-Footer">
                                <a href="/VEX" className="Button">
                                        Back to Chat
                                </a>
                        </footer>
                </div>
        );
}
