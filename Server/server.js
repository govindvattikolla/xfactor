let express = require("express");
let cors = require("cors");
let connectDB = require("./config/dbconfig.js");
let studentRoutes = require("./routes/studentRoutes.js");
const Student = require("./models/students.js");
let dotenv = require("dotenv");
let path = require("path");
const multer = require("multer"); 

dotenv.config();
connectDB();

const app = express();

// Enable CORS for frontend to communicate with backend
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

// Serve static files (images) from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const filePath = `/uploads/${req.file.filename}`;
    res.status(200).json({ filePath }); 
  });
  

// API Routes for students
app.use("/api/students", studentRoutes);

// DELETE route for deleting a student
app.delete('/api/students/:id', async (req, res) => {
  console.log("inside delete route");
  try {
    const studentId = req.params.id;
    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error deleting student' });
  }
});

// PUT route for editing student details
app.put('/api/students/:id', async (req, res) => {
  console.log("inside edit route");
  try {
    const studentId = req.params.id;
    const updatedData = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(studentId, updatedData, {
      new: true, // Return the updated student
      runValidators: true, // Run schema validation during the update
    });

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json(updatedStudent); // Return updated student details
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error updating student' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
