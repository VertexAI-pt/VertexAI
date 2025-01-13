const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./userModel");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const OpenAI = require("openai");
const rateLimit = require("express-rate-limit");
const ChatHistory = require("./models/ChatHistory");

require("dotenv").config();

const app = express();

const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
});

app.use(
        cors({
                origin: "http://localhost:3000",
                credentials: true,
        }),
);
app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", true);

mongoose.connect(process.env.MONGODB_URI);

const requestLimiter = rateLimit({
        windowMs: 60 * 1000,
        max: 10,
        keyGenerator: (req) => {
                console.log("IP detectado:", req.ip);
                return req.ip;
        },
        handler: (req, res) => {
                console.log("Limite atingido para IP:", req.ip);
                res.status(429).json({
                        error: "Atingiu o limite de requisições.",
                });
        },
        message: { error: "Atingiu o limite de requisições." },
});

app.post("/signin", async (req, res) => {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
                return res
                        .status(400)
                        .json({ message: "Sorry! Username Already Taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.cookie("username", newUser.username, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
        });

        res.status(201).json({
                message: "Congratulations! Your Account Was Created!",
        });
});

app.post("/signup", async (req, res) => {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        0;
        if (!existingUser) {
                return res
                        .status(400)
                        .json({ message: "User account doesn't exists..." });
        } else {
                const isMatch = await bcrypt.compare(
                        password,
                        existingUser.password,
                );
                if (!isMatch) {
                        return res
                                .status(400)
                                .json({ message: "Invalid credentials..." });
                }
                res.cookie("username", existingUser.username, {
                        httpOnly: true,
                        secure: false,
                        sameSite: "lax",
                });
                res.json({ message: "Logged in successfully!" });
        }
});

app.post("/logout", (req, res) => {
        res.clearCookie("username");
        res.json({ message: "Logged out successfully!" });
});

app.get("/auth/check", (req, res) => {
        const { username } = req.cookies;

        if (!username) {
                return res.status(401).json({ message: "Not authenticated" });
        }

        res.json({ username });
});

app.post("/openai", requestLimiter, async (req, res) => {
        const { username } = req.cookies;
        const { input } = req.body;

        if (!username) {
                return res
                        .status(401)
                        .json({ error: "Utilizador não autenticado" });
        }

        try {
                let chatHistory = await ChatHistory.findOne({ username });
                if (!chatHistory) {
                        chatHistory = new ChatHistory({
                                username,
                                messages: [],
                        });
                }

                const userMessage = { role: "user", content: input };
                chatHistory.messages.push(userMessage);

                const completion = await openai.chat.completions.create({
                        model: "gpt-4o-mini",
                        messages: [
                                {
                                        role: "system",
                                        content: "Your name is VEX. You are a helpful programming assistant.",
                                },
                                ...chatHistory.messages,
                        ],
                });

                const assistantMessage = completion.choices[0].message;
                chatHistory.messages.push(assistantMessage);
                await chatHistory.save();

                res.json({
                        message: assistantMessage,
                        history: chatHistory.messages,
                });
        } catch (error) {
                console.error("Erro ao gerar resposta:", error.message);
                res.status(500).json({
                        error: "Erro ao processar sua solicitação.",
                });
        }
});

app.get("/openai/history", async (req, res) => {
        const { username } = req.cookies;

        if (!username) {
                return res
                        .status(401)
                        .json({ error: "Usuário não autenticado" });
        }

        try {
                const chatHistory = await ChatHistory.findOne({ username });
                res.json({ history: chatHistory ? chatHistory.messages : [] });
        } catch (error) {
                console.error("Erro ao carregar histórico:", error.message);
                res.status(500).json({ error: "Erro ao carregar histórico." });
        }
});

app.listen(8000, () => {
        console.log("Server Running On 8000");
});
