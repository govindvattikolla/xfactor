let express=require("express")
let Patient=require("../models/students.js")

const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json({ message: "Patient added successfully", patient });
    } catch (error) {
        res.status(500).json({ message: "Error adding patient", error });
    }
});

router.get("/", async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: "Error fetching patients", error });
    }
});

module.exports= router;
