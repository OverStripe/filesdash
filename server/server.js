require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { extractTeraboxVideo } = require("./extractor");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// API route to extract video
app.post("/extract", async (req, res) => {
    const { link } = req.body;
    if (!link) return res.status(400).json({ error: "Missing Terabox link" });

    const videoURL = await extractTeraboxVideo(link);
    res.json({ videoURL });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

