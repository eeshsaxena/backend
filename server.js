require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json()); // ✅ Corrected
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Define Schema
const FormSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const FormModel = mongoose.model("Form", FormSchema);

// API Route
app.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const formData = new FormModel({ name, email, message });
    await formData.save();
    res.json({ success: true, message: "Form Submitted!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/submissions", async (req, res) => {
  try {
    const submissions = await FormModel.find();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
