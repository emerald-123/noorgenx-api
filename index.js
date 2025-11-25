import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Basic root endpoint
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "NoorGenX API",
    message: "Backend is running.",
    time: new Date().toISOString(),
  });
});

// Health check for Cloud Run / uptime monitoring
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "NoorGenX API",
    time: new Date().toISOString(),
  });
});

// Example AI endpoint (stub for now)
app.post("/analyze", async (req, res) => {
  const { prompt } = req.body || {};

  if (!prompt) {
    return res.status(400).json({
      error: "Missing 'prompt' in request body",
    });
  }

  // TODO: replace this with real Gemini / bioinformatics logic.
  res.json({
    status: "ok",
    service: "NoorGenX API",
    echoPrompt: prompt,
    note: "Replace this stub with real NoorGenX analysis pipeline.",
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`NoorGenX API listening on port ${PORT}`);
});
