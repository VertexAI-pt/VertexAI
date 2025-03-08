const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./userModel");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const OpenAI = require("openai");
const rateLimit = require("express-rate-limit");
const ChatHistory = require("./models/ChatHistory");
const dotenv = require("dotenv")
const path = require("path");

dotenv.config();

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
                console.log("Mensagem Enviada", req.ip);
                return req.ip;
        },
        handler: (req, res) => {
                console.log("Limite Atingido pelo Utilizador:", req.ip);
                res.status(429).json({
                        error: "Atingiu o Limite de Mensagens.",
                });
        },
        message: { error: "Atingiu o Limite de Mensagens." },
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
        console.log(req.cookies);
});

app.post("/signup", async (req, res) => {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        0;
        if (!existingUser) {
                return res.status(400).json({
                        message: "User Account Doesn't Exist :( Please Sign Up Or Try Again.",
                });
        } else {
                const isMatch = await bcrypt.compare(
                        password,
                        existingUser.password,
                );
                if (!isMatch) {
                        return res
                                .status(400)
                                .json({ message: "Invalid Password!" });
                }
                res.cookie("username", existingUser.username, {
                        httpOnly: true,
                        secure: false,
                        sameSite: "lax",
                });
                res.json({ message: "Logged in successfully!" });
                console.log(req.cookies);
        }
});

app.post("/logout", (req, res) => {
        res.clearCookie("username");
        res.json({ message: "Logged out successfully!" });
});

app.get("/auth/check", (req, res) => {
        const { username } = req.cookies;

        if (!username) {
                return res.status(401).json({ message: "Not Authenticated" });
        }

        res.json({ username });
});

app.post("/openai", requestLimiter, async (req, res) => {
        const { username } = req.cookies;
        const { input } = req.body;

        if (!username) {
                return res
                        .status(401)
                        .json({ error: "User Not Authenticated" });
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
                                        content: "You are an experienced Senior Developer with extensive knowledge about programming languages, best practices, and debugging techniques. Your role is to assist users in understanding programming concepts thoroughly, identifying and correcting errors in their code, explaining code snippets clearly, and generating well-structured code based on user requirements. Code Explanation: When a user provides a code snippet, explain it in detail, covering:What the code does. Key components and their roles. Any relevant programming concepts or best practices. Error Identification**: If a user presents code that contains errors, thoroughly analyze it and: - Identify syntax and logical errors. - Explain why they are errors.- Provide suggestions for correcting these errors, along with examples. **Code Generation**: When asked to generate code, adhere to the following guidelines: - Ask clarifying questions to ensure you understand the requirements thoroughly. Generate clean, efficient, and well-commented code. Include examples and edge cases where possible. **Problem-Solving**: For any programming problem a user presents: - Break down the problem into smaller, manageable parts. - Discuss possible solutions and their implications. - Provide a detailed solution along with relevant code and explanations. **Mentorship**: Adopt a mentoring approach. When a user asks for help, guide them through the solution rather than simply providing the answer. Encourage best practices and learning. **Documentation and Resources**: Suggest relevant documentation or online resources where users can further their understanding of the topic discussed. Now, given this context, please provide the following: - Sample code snippets for explanation. - Specific questions related to programming issues. - Requirements for new code generation. Your explanations should be exhaustive and tailored to users of all skill levels, ensuring that everyone gains a deeper understanding of programming. If a user speaks Portuguese from Portugal, please provide responses in Portuguese from Portugal not from Brazil.",
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
                console.error("Error Generating Response:", error.message);
                res.status(500).json({
                        error: "Error Generating Response.",
                });
        }
});

app.get("/openai/history", async (req, res) => {
        const { username } = req.cookies;

        if (!username) {
                return res
                        .status(401)
                        .json({ error: "User Not Authenticated" });
        }

        try {
                const chatHistory = await ChatHistory.findOne({ username });
                res.json({ history: chatHistory ? chatHistory.messages : [] });
        } catch (error) {
                console.error("Error Loading History:", error.message);
                res.status(500).json({ error: "Error Loading History." });
        }
});

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/vertex-ai/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'vertex-ai', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('API está a rodar...');
    });
}

app.listen(8000, () => {
        console.log("VERTEXai Server Running!");
});
