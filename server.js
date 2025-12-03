// server.js
// Main NoorGenX backend API for Cloud Run.

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "noorgenx-api",
    message: "NoorGenX backend is running 🚀",
    time: new Date().toISOString()
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "healthy", time: new Date().toISOString() });
});

// Status endpoint for frontend
app.get("/api/status", (req, res) => {
  res.json({
    status: "online",
    version: "v1.0",
    tools: {
      openfold2: "planned",
      uniprot: "planned",
      crispr: "planned"
    }
  });
});

// Stub analyze endpoint
app.post("/api/analyze", async (req, res) => {
  const { prompt } = req.body || {};
  res.json({
    ok: true,
    receivedPrompt: prompt || null,
    message: "NoorGenX analysis stub endpoint – plug tools here."
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`NoorGenX API listening on port ${PORT}`);
});
