const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/formDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
app.listen(5000, () => console.log("Server running on port 5000"));
