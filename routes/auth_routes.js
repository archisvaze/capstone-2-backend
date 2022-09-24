const express = require("express");
const pool = require("../db_config")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


let router = express.Router();

//signup a new doctor

router.post("/doctor/signup", async (req, res) => {
    let { username, password, email } = req.body;
    console.log("signing up new doctor...");

    try {
        const existingPatients = await pool.query(
            "SELECT * FROM doctors WHERE email = $1", [email]);

        if (existingPatients.rows.length <= 0) {
            //doctor does not exist

            //generate hashed password
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(password, salt)
            const newDoctor = await pool.query(
                `INSERT INTO "doctors" ("username", "email", "password", "onboarded") VALUES ($1, $2, $3, $4)`, [username, email, hash, false]
            );
            return res.status(200).json({ message: "Doctor signed up!" });
        }
        else {
            return res.status(400).json({ error: "Email already exists" })
        }

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// login a doctor
router.post("/doctor/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        let existingDoctors = await pool.query(`SELECT * FROM doctors WHERE email = $1`, [email]);
        if (existingDoctors.rows.length <= 0) {
            //doctor with id does not exist
            return res.status(400).json({ error: "Email Not Found" })
        }
        let doctor = JSON.parse(JSON.stringify(existingDoctors.rows[0]));

        //validate passwords
        const validPassword = await bcrypt.compare(password, doctor.password);
        if (validPassword) {
            const payload = {
                id: doctor.doctor_id,
                email: doctor.email
            }
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
            doctor.password = null;
            return res.status(200).json({ user: doctor, accessToken });
        } else {
            return res.status(400).json({ error: "Incorrect password" })
        }

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})



//signup a new patient

router.post("/patient/signup", async (req, res) => {
    let { username, password, email } = req.body;
    console.log("signing up new patient...");

    try {
        const existingPatients = await pool.query(
            "SELECT * FROM patients WHERE email = $1", [email]);

        if (existingPatients.rows.length <= 0) {
            //patient does not exist

            //generate hashed password
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(password, salt)
            const newPatient = await pool.query(
                `INSERT INTO "patients" ("username", "email", "password", "onboarded") VALUES ($1, $2, $3, $4)`, [username, email, hash, false]
            );
            return res.status(200).json({ message: "Patient signed up!" });
        }
        else {
            return res.status(400).json({ error: "Email already exists" })
        }

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})


// login a patient
router.post("/patient/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        let existingPatients = await pool.query(`SELECT * FROM patients WHERE email = $1`, [email]);
        if (existingPatients.rows.length <= 0) {
            //patient with id does not exist
            return res.status(400).json({ error: "Email Not Found" })
        }
        let patient = JSON.parse(JSON.stringify(existingPatients.rows[0]));

        //validate passwords
        const validPassword = await bcrypt.compare(password, patient.password);
        if (validPassword) {
            const payload = {
                id: patient.patient_id,
                email: patient.email
            }
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
            patient.password = null;
            return res.status(200).json({ user: patient, accessToken });
        } else {
            return res.status(400).json({ error: "Incorrect password" })
        }

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

module.exports = router;