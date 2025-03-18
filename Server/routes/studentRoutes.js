const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Student = require("../models/students");

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads/students");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Store the files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Create a unique file name
    },
});

const upload = multer({ storage: storage });

// Route to get all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students); 
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Error fetching students", error: error.message });
    }
});

// Route to add a new student, including image upload
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        
        console.log("Headers:", req.headers);
        console.log("Request body:", req.body);
        console.log("Uploaded file:", req.file);

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        
        const imagePath = `/uploads/students/${req.file.filename}`;
        console.log("Image path:", imagePath);

        // Create a new student with the uploaded image path
        const student = new Student({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            description: req.body.description,
            image: imagePath, 
        });

        await student.save(); // Save the student in the database
        res.status(201).json({ message: "Student added successfully", student });
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({ message: "Error adding student", error: error.message });
    }
});

module.exports = router;
