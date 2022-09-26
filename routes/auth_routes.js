const express = require("express");
const client = require("../db_config")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");



let router = express.Router();

//signup a new doctor

router.post("/doctor/signup", async (req, res) => {
    let { username, password, email } = req.body;
    console.log("signing up new doctor...");

    try {
        const existingPatients = await client.query(
            "SELECT * FROM doctors WHERE email = $1", [email]);

        if (existingPatients.rows.length <= 0) {
            //doctor does not exist

            //generate hashed password
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(password, salt)
            const newDoctor = await client.query(
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
        let existingDoctors = await client.query(`SELECT * FROM doctors WHERE email = $1`, [email]);
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
        const existingPatients = await client.query(
            "SELECT * FROM patients WHERE email = $1", [email]);

        if (existingPatients.rows.length <= 0) {
            //patient does not exist

            //generate hashed password
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(password, salt)
            const newPatient = await client.query(
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
        let existingPatients = await client.query(`SELECT * FROM patients WHERE email = $1`, [email]);
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

//password reset for doctor

router.get("/doctor/forgot-password/", async (req, res) => {
    res.render("doctor-forgot-password")
})
router.post("/doctor/forgot-password", async (req, res) => {
    let { email } = req.body;
    const existingUser = await client.query(
        `SELECT * FROM doctors WHERE email = $1`, [email]
    );
    if (existingUser.rows.length <= 0) {
        return res.status(400).send("Email does not exist")
    }
    let doctor = JSON.parse(JSON.stringify(existingUser.rows[0]));

    //create one time link
    const secret = process.env.ACCESS_TOKEN_SECRET + doctor.password;
    const payload = {
        id: doctor.doctor_id,
        email: doctor.email
    }
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `http://localhost:8000/auth/doctor/reset-password/${doctor.doctor_id}/${token}`

    sendMail(doctor.email, link);
    res.status(200).send("Reset Link has been sent to your email")

})

router.get("/doctor/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const existingDoctors = await client.query(
        `SELECT * FROM doctors WHERE doctor_id = $1`, [id]
    )
    if (existingDoctors.rows.length <= 0) {
        return res.status(400).send("User not found")
    }
    let doctor = JSON.parse(JSON.stringify(existingDoctors.rows[0]));

    const secret = process.env.ACCESS_TOKEN_SECRET + doctor.password;
    try {
        const payload = jwt.verify(token, secret)
        res.render('doctor-reset-password', { email: doctor.email })

    } catch (error) {
        return res.status(400).send(error.message)
    }

})
router.post("/doctor/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    const existingDoctors = await client.query(
        `SELECT * FROM doctors WHERE doctor_id = $1`, [id]
    )
    if (existingDoctors.rows.length <= 0) {
        return res.status(400).send("User not found")
    }
    let doctor = JSON.parse(JSON.stringify(existingDoctors.rows[0]));
    const secret = process.env.ACCESS_TOKEN_SECRET + doctor.password;

    try {
        const payload = jwt.verify(token, secret);
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);

        const updatedDoctor = await client.query(`
        UPDATE doctors SET password = $1 WHERE email = $2`, [hash, doctor.email]
        )
        return res.status(200).send("Password Updated! Please Login again")


    } catch (error) {

        return res.status(400).send(error.message)
    }

})



//password reset for patient

router.get("/patient/forgot-password/", async (req, res) => {
    res.render("patient-forgot-password")
})
router.post("/patient/forgot-password", async (req, res) => {
    let { email } = req.body;
    const existingUser = await client.query(
        `SELECT * FROM patients WHERE email = $1`, [email]
    );
    if (existingUser.rows.length <= 0) {
        return res.status(400).send("Email does not exist")
    }
    let patient = JSON.parse(JSON.stringify(existingUser.rows[0]));

    //create one time link
    const secret = process.env.ACCESS_TOKEN_SECRET + patient.password;
    const payload = {
        id: patient.patient_id,
        email: patient.email
    }
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `http://localhost:8000/auth/patient/reset-password/${patient.patient_id}/${token}`

    sendMail(patient.email, link);
    res.status(200).send("Reset Link has been sent to your email")

})

router.get("/patient/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const existingpatient = await client.query(
        `SELECT * FROM patients WHERE patient_id = $1`, [id]
    )
    if (existingpatient.rows.length <= 0) {
        return res.status(400).send("User not found")
    }
    let patient = JSON.parse(JSON.stringify(existingpatient.rows[0]));

    const secret = process.env.ACCESS_TOKEN_SECRET + patient.password;
    try {
        const payload = jwt.verify(token, secret)
        res.render('doctor-reset-password', { email: patient.email })

    } catch (error) {
        return res.status(400).send(error.message)
    }

})
router.post("/patient/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    const existingpatient = await client.query(
        `SELECT * FROM patients WHERE patient_id = $1`, [id]
    )
    if (existingpatient.rows.length <= 0) {
        return res.status(400).send("User not found")
    }
    let patient = JSON.parse(JSON.stringify(existingpatient.rows[0]));
    const secret = process.env.ACCESS_TOKEN_SECRET + patient.password;

    try {
        const payload = jwt.verify(token, secret);
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);

        const updatedpatient = await client.query(`
        UPDATE patients SET password = $1 WHERE email = $2`, [hash, patient.email]
        )
        return res.status(200).send("Password Updated! Please Login again")


    } catch (error) {

        return res.status(400).send(error.message)
    }

})

module.exports = router;


var sendMail = async (to, link) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }

    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: "Password Reset Link for DocSeek",
        text: link
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}