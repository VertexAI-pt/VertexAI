const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./userModel");
const cors = require("cors");

require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

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

        res.status(201).json({
                message: "Congratulations! Your Account Was Created!",
        });
});

app.listen(5000, () => {
        console.log("Server Running On 5000");
});
