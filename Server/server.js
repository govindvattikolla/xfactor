

let express=require("express")
let cors=require("cors")
let connectDB=require("./config/dbconfig.js")
let patientRoutes=require("./routes/studentRoutes.js")
let dotenv=require("dotenv")
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/patients", patientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
