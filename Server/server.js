let express = require("express");
let cors = require("cors");
let connectDB = require("./config/dbconfig.js");
let studentRoutes = require("./routes/studentRoutes.js");
const Student = require("./models/students.js");
const sessionRoutes = require("./routes/SessionRoutes.js");
let dotenv = require("dotenv");
let path = require("path");
const multer = require("multer");
const fs = require("fs");

dotenv.config();
connectDB();

const app = express();

// Enable CORS for frontend to communicate with backend
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper function to ensure that the upload directories exist
const ensureDirectoryExistence = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Ensure upload directories exist for students and sessions
ensureDirectoryExistence('./uploads/students/images');
ensureDirectoryExistence('./uploads/sessions/images');

// Set up multer storage for student image uploads
const studentImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/students/images');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const studentImageUpload = multer({ storage: studentImageStorage });

// Serve static files (images) from the "uploads/students" directory
app.use("/uploads/students", express.static(path.join(__dirname, "uploads/students")));

// Student Image Upload API
app.post('/api/upload/student', studentImageUpload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = `/uploads/students/images/${req.file.filename}`;
  res.status(200).json({ filePath });
});

// Set up multer storage for session image uploads
const sessionImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/sessions/images');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const sessionImageUpload = multer({ storage: sessionImageStorage });

// Serve static files (images) from the "uploads/sessions" directory
app.use("/uploads/sessions", express.static(path.join(__dirname, "uploads/sessions")));

// Session Image Upload API
app.post('/api/upload/session', sessionImageUpload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = `/uploads/sessions/images/${req.file.filename}`;
  res.status(200).json({ filePath });
});

// API Routes for students
app.use("/api/students", studentRoutes);

// DELETE route for deleting a student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting student' });
  }
});

// PUT route for editing student details
app.put('/api/students/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const updatedData = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(studentId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: 'Error updating student' });
  }
});

// API Routes for sessions
app.use("/api/sessions", sessionRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
