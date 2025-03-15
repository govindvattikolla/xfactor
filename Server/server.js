let express = require("express");
let cors = require("cors");
let connectDB = require("./config/dbconfig.js");
let studentRoutes = require("./routes/studentRoutes.js");
let dotenv = require("dotenv");
let path = require("path");
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
