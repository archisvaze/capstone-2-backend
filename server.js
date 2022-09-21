require("dotenv").config()
const express = require("express");
const cors = require("cors");

const app = express();

//middleware
app.use(cors({ origin: "*" }))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


const httpServer = app.listen(process.env.PORT || 8000, () => {
    const port = httpServer.address().port;
    console.log("Express is running on port " + port);
})


//routes

const consultationRouter = require("./routes/consultation_routes");
app.use("/consultation", consultationRouter);

const doctorRouter = require("./routes/doctor_routes");
app.use("/doctor", doctorRouter);

const patientRouter = require("./routes/patient_routes");
app.use("/patient", patientRouter);

const authRouter = require("./routes/auth_routes");
app.use("/auth", authRouter);