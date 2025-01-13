const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    username: { type: String, required: true }, // Associar ao usuário
    messages: [
        {
            role: { type: String, enum: ["user", "assistant"], required: true },
            content: { type: String, required: true },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ChatHistory", chatSchema);
