const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const admin = require("./firebaseAdmin");

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json({ limit: "2mb" }));

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Missing token" });

    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

app.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "NoorGenX API",
    time: new Date().toISOString(),
  });
});

app.get("/me", requireAuth, async (req, res) => {
  res.json({
    uid: req.user.uid,
    email: req.user.email,
    name: req.user.name || null,
  });
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact message:", { name, email, message });

  return res.json({ ok: true, received: true });
});

app.post("/tools/openfold2/predict", requireAuth, async (req, res) => {
  const { sequence } = req.body;

  if (!sequence || sequence.length < 10) {
    return res.status(400).json({ error: "Invalid sequence" });
  }

  res.json({
    ok: true,
    message: "Prediction placeholder.",
    length: sequence.length,
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});