require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json()); // ✅ Properly closed
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
  const { name, email, message } = req.body;
  const formData = new FormModel({ name, email, message });
  await formData.save();
  res.send({ success: true, message: "Form Submitted!" });
});

app.get("/submissions", async (req, res) => {
  const submissions = await FormModel.find();
  res.json(submissions);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
