const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Initial candidate list
let candidates = [
  {
    id: 1,
    name: "Ali Khan",
    role: "Frontend Developer",
    skills: ["React", "TypeScript", "CSS"],
    matchPercentage: 88,
  },
];

// GET route to fetch candidates
app.get("/api/candidates", (req, res) => {
  res.json(candidates);
});

// POST route to add candidate
app.post("/api/candidates", (req, res) => {
  const { name, role, skills } = req.body;

  if (!name || !role) {
    return res.status(400).json({ error: "Name and Role are required" });
  }

  const matchPercentage = Math.min(60 + (skills ? skills.length * 8 : 10), 98);

  const newCandidate = {
    id: Date.now(),
    name,
    role,
    skills: skills || [],
    matchPercentage,
  };

  candidates.push(newCandidate);
  res.status(201).json(newCandidate);
});

app.listen(PORT, () => {
  console.log(`Candidate Screening API running on http://localhost:5000`);
});
