const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../vertex-ai/src/components/signinform.jsx");

const app = express();
app.use(express.json());

mongoose.connect(
        "mongodb+srv://luissmartinss:LlUuIiSs212526@vertexai.pnavd.mongodb.net/?retryWrites=true&w=majority&appName=vertexai",
        { userNewUrlParser: true, useUniFiedTopology: true },
);

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

app.listen(3000, () => {
        console.log("Server Running On 3000");
});
