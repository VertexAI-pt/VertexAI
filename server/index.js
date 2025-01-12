const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./userModel");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const OpenAI = require("openai")
const rateLimit = require('express-rate-limit');

require("dotenv").config();

const app = express();

const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
})

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.set('trust proxy', true);

mongoose.connect(process.env.MONGODB_URI);

const requestLimiter = rateLimit({
        windowMs: 60 * 1000, // Janela de 1 minuto
        max: 10, // Limite de 10 requisições
        keyGenerator: (req) => {
            console.log('IP detectado:', req.ip);
            return req.ip;
        },
        handler: (req, res) => {
            console.log('Limite atingido para IP:', req.ip);
            res.status(429).json({ error: 'Atingiu o limite de requisições.' });
        },
        message: { error: 'Atingiu o limite de requisições.' },
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

app.post('/openai', requestLimiter, async (req, res) => {
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    {
                        role: "user",
                        content: req.body.input,
                    },
                ],
            });
    
            res.json(completion.choices[0].message);
        } catch (error) {
            console.error('Erro ao gerar resposta:', error.message);
            res.status(500).json({ error: 'Erro ao processar sua solicitação.' });
        }
    });
    

app.listen(8000, () => {
        console.log("Server Running On 8000");
});
