require("dotenv").config()
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const client = require("./db_config")

const app = express();
client.connect();

//middleware
app.use(cors({ origin: "*" }))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set("view engine", "ejs");
app.use(express.static('public'))



const httpServer = app.listen(process.env.PORT || 8000, () => {
    const port = httpServer.address().port;
    console.log("Express is running on port " + port);
})


//routes
const authRouter = require("./routes/auth_routes");
app.use("/auth", authRouter);

app.get("/", async (req, res) => {
    try {
        return res.status(200).json({ message: "Conneted" })
    } catch (error) {
        return res.status(400).json(error)
    }
})
//suspend doctor by id
app.post("/suspend-doctor/:id", async (req, res) => {
    try {
        const updateDoctor = await client.query(
            `UPDATE doctors SET 
            suspended=$2
            WHERE doctor_id=$1`, [req.params.id, true]
        )
        return res.status(200).json({ message: "Doctor suspended" })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})
//unsuspend doctor by id
app.post("/unsuspend-doctor/:id", async (req, res) => {
    try {
        const updateDoctor = await client.query(
            `UPDATE doctors SET 
            suspended=$2
            WHERE doctor_id=$1`, [req.params.id, false]
        )
        return res.status(200).json({ message: "Doctor unsuspended" })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

app.get("/all-doctors", async (req, res) => {
    try {
        const allDoctors = await client.query(`SELECT * FROM doctors`);
        for (let doctor of allDoctors.rows) {
            doctor.password = null;
        }
        return res.status(200).json(allDoctors.rows)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})



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
