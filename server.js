require("dotenv").config()
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken")

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
const authRouter = require("./routes/auth_routes");
app.use("/auth", authRouter);

app.use(authenticateMiddleware);

const consultationRouter = require("./routes/consultation_routes");
app.use("/consultation", consultationRouter);

const doctorRouter = require("./routes/doctor_routes");
app.use("/doctor", doctorRouter);

const patientRouter = require("./routes/patient_routes");
app.use("/patient", patientRouter);





function authenticateMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (authHeader === undefined) {
        return res.status(401).json({ error: "No token was provided" })
    }
    const token = authHeader.split(" ")[1];
    if (token === undefined) {
        return res.status(401).json({ error: "Proper token was not provided" })
    }
    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(payload)
        next();
    } catch (error) {
        return res.status(401).json({ error: error })
    }
}