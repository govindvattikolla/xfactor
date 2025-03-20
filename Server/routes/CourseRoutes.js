const express = require("express");
const router = express.Router();
const Course = require("../models/Courses");
const Session = require("../models/AddSession");

// ✅ Add a new course
router.post("/add", async (req, res) => {
    try {
        console.log("Received Data:", req.body);
        const { image, title, description, price, category } = req.body;

        // Validation: Ensure all fields are provided
        if (!image || !title || !description || !price || !category) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create a new course
        const newCourse = new Course({ image, title, description, price, category });
        await newCourse.save();

        res.status(201).json({ message: "Course added successfully", course: newCourse });
    } catch (error) {
        console.error("Error adding course:", error);
        res.status(500).json({ error: "Error adding course" });
    }
});

// ✅ Get all courses with their respective sessions (grouped by category)
router.get("/with-sessions", async (req, res) => {
    try {
        const courses = await Course.find();
        console.log("Courses Found:", courses); // Debugging log

        const courseSessions = await Promise.all(
            courses.map(async (course) => {
                console.log(`Checking sessions for category: "${course.category}"`); // Log course category
                const sessions = await Session.find({ category: course.category });
                console.log(`Sessions Found for "${course.category}":`, sessions); // Log fetched sessions

                return { ...course.toObject(), sessions };
            })
        );

        res.status(200).json(courseSessions);
    } catch (error) {
        console.error("Error fetching courses with sessions:", error);
        res.status(500).json({ error: "Error fetching courses with sessions" });
    }
});


// ✅ Get all courses (without sessions)
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ error: "Error fetching courses" });
    }
});

// ✅ Get a specific course by ID
router.get("/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ error: "Course not found" });
        res.status(200).json(course);
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ error: "Error fetching course" });
    }
});

// ✅ Update a course
router.put("/:id", async (req, res) => {
    try {
        const { title, description, price, image, category } = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            { title, description, price, image, category },
            { new: true, runValidators: true }
        );

        if (!updatedCourse) return res.status(404).json({ error: "Course not found" });

        res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ error: "Error updating course" });
    }
});

// ✅ Delete a course
router.delete("/:id", async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) return res.status(404).json({ error: "Course not found" });

        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ error: "Error deleting course" });
    }
});

module.exports = router;
