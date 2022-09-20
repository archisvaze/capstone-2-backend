const express = require("express");
const pool = require("../db_config");


let router = express.Router();

//signup a new doctor

router.post("/signup", async (req, res) => {
    let { username, password, email } = req.body;
    console.log("signing up new doctor...");

    try {

        const existingDoctor = await pool.query(
            "SELECT * FROM doctors WHERE email = $1", [email]);

        if (existingDoctor.rows.length === 0) {
            //doctor does not exist

            const newDoctor = await pool.query(
                `INSERT INTO "doctors" ("username", "email", "password", "onboarded") VALUES ($1, $2, $3, $4)`, [username, email, password, false]
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

//get all doctors

router.get("/", async (req, res) => {
    try {
        const allDoctors = await pool.query(`SELECT * FROM doctors`);
        return res.status(200).json(allDoctors.rows)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})


//onboard a doctor 
router.post("/onboard/:email", async (req, res) => {
    let {
        qualification,
        experience,
        hospital,
        days,
        time,
        speciality,
        city,
        country
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
                country, true, req.params.email]);

        return res.status(200).json({ message: "Doctor onboarded" })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }

})

module.exports = router;