const express = require("express");
const pool = require("../db_config");
const bcrypt = require("bcryptjs");


let router = express.Router();

//signup a new doctor

router.post("/signup", async (req, res) => {
    let { username, password, email } = req.body;
    console.log("signing up new doctor...");

    try {
        const existingDoctor = await pool.query(
            "SELECT * FROM doctors WHERE email = $1", [email]);

        if (existingDoctor.rows.length <= 0) {
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

router.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        let existingDoctor = await pool.query(`SELECT * FROM doctors WHERE email = $1`, [email]);
        if (existingDoctor.rows.length <= 0) {
            //doctor with id does not exist
            return res.status(400).json({ error: "Email Not Found" })
        }
        let doctor = JSON.parse(JSON.stringify(existingDoctor.rows[0]));

        //validate passwords
        const validPassword = await bcrypt.compare(password, doctor.password);
        if (validPassword) {
            doctor.password = null;
            return res.status(200).json(doctor);
        } else {
            return res.status(400).json({ error: "Incorrect password" })
        }

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

//get doctor by id

router.get("/:id", async (req, res) => {
    try {
        const doctor = await pool.query("SELECT * FROM doctors WHERE _id = $1", [req.params.id]);
        if (doctor.rows.length <= 0) {
            //doctor with id does not exist
            return res.status(400).json({ error: "Doctor Not Found" })
        }
        doctor.rows[0].password = null;
        return res.status(200).json(doctor.rows[0])

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

//get all doctors

router.get("/", async (req, res) => {
    try {
        const allDoctors = await pool.query(`SELECT * FROM doctors`);
        for (let doctor of allDoctors.rows) {
            doctor.password = null;
        }
        return res.status(200).json(allDoctors.rows)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})


//onboard a doctor by email

router.post("/onboard/", async (req, res) => {
    let {
        qualification,
        experience,
        hospital,
        days,
        time,
        speciality,
        city,
        country,
        email
    } = req.body;

    try {
        const updateDoctor = await pool.query(
            `UPDATE doctors SET 
        qualification=$1,
        experience=$2,
        hospital=$3,
        days=$4,
        time=$5,
        speciality=$6,
        city=$7,
        country=$8,
        onboarded=$9 WHERE email=$10`,
            [qualification,
                experience,
                hospital,
                days,
                time,
                speciality,
                city,
                country, true, email]);

        return res.status(200).json({ message: "Doctor onboarded" })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }

})

module.exports = router;