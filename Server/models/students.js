let mongoose=require("mongoose")


const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    address: { type: String },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports= Patient;
