const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const connectDB = require("./config/dbconfig.js");
const studentRoutes = require("./routes/studentRoutes.js");
const sessionRoutes = require("./routes/SessionRoutes.js");
const courseRoutes = require("./routes/CourseRoutes.js"); 
const Student = require("./models/students.js");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Enable CORS for frontend communication
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper function to ensure directories exist
const ensureDirectoryExistence = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Ensure upload directories exist
ensureDirectoryExistence("./uploads/students/images");
ensureDirectoryExistence("./uploads/sessions/images");
ensureDirectoryExistence("./uploads/courses/images");

// Multer Configuration for Image Uploads
const configureMulter = (uploadPath) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
};

// Set up multer for students, sessions, and courses
const studentImageUpload = multer({ storage: configureMulter("./uploads/students/images") });
const sessionImageUpload = multer({ storage: configureMulter("./uploads/sessions/images") });
const courseImageUpload = multer({ storage: configureMulter("./uploads/courses/images") });

// Serve static files (images)
app.use("/uploads/students", express.static(path.join(__dirname, "uploads/students")));
app.use("/uploads/sessions", express.static(path.join(__dirname, "uploads/sessions")));
app.use("/uploads/courses", express.static(path.join(__dirname, "uploads/courses")));

// Image Upload APIs
app.post("/api/upload/student", studentImageUpload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.status(200).json({ filePath: `/uploads/students/images/${req.file.filename}` });
});

app.post("/api/upload/session", sessionImageUpload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.status(200).json({ filePath: `/uploads/sessions/images/${req.file.filename}` });
});

app.post("/api/upload/course", courseImageUpload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.status(200).json({ filePath: `/uploads/courses/images/${req.file.filename}` });
});

// API Routes
app.use("/api/students", studentRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/courses", courseRoutes); // Added course routes

// DELETE Student Route
app.delete("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Error deleting student" });
  }
});

// PUT Student Update Route
app.put("/api/students/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) return res.status(404).json({ error: "Student not found" });

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Error updating student" });
  }
});

// user Apis
app.use("/api/courses", courseRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
