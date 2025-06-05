const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const dataFile = path.join(__dirname, "phones.json");

const initializeDataFile = async () => {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify([]));
  }
};

app.get("/api/phones", async (req, res) => {
  try {
    const data = await fs.readFile(dataFile, "utf8");
    const phones = JSON.parse(data);
    res.json(phones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/phones/:id", async (req, res) => {
  try {
    const data = await fs.readFile(dataFile, "utf8");
    const phones = JSON.parse(data);
    const phone = phones.find((p) => p.id === req.params.id);

    if (!phone) {
      return res.status(404).json({ message: "Phone not found" });
    }

    res.json(phone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/phones", async (req, res) => {
  try {
    const data = await fs.readFile(dataFile, "utf8");
    const phones = JSON.parse(data);
    const newPhone = {
      id: Date.now().toString(),
      ...req.body,
    };
    phones.push(newPhone);
    await fs.writeFile(dataFile, JSON.stringify(phones, null, 2));
    res.status(201).json(newPhone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

initializeDataFile().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
