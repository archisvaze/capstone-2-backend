const express = require("express");
const pool = require("../db_config");


let router = express.Router();

//create a new consulation 
router.post("/", async (req, res) => {
    let { doctor_id, patient_id, day, time } = req.body;
    try {
        //check if patient has any other consultations at the same time
        const existingConsultations = await pool.query(
            `SELECT * FROM consultations WHERE patient_id = $1 AND time = $2 AND day = $3`, [patient_id, time, day]
        );

        if (existingConsultations.rows.length <= 0) {
            console.log("No concurrent consultations found for patient on the same day/time");

            const newConsultation = await pool.query(
                `INSERT INTO "consultations" ("doctor_id", "patient_id", "day", "time", "status") VALUES ($1, $2, $3, $4, $5)`, [doctor_id, patient_id, day, time, false]
            );
            return res.status(200).json({ message: "Consultation Booked!" })
        } else {
            return res.status(400).json({ error: "Concurrent Consultation. You already have a consultation booked at during this time" })
        }

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

// get all patients' consultations by id
router.get("/patient/:id", async (req, res) => {
    try {

        let existingConsultations = await pool.query(
            `SELECT * FROM consultations WHERE patient_id = $1`, [req.params.id]
        );
        if (existingConsultations.rows.length <= 0) {
            //no consultations
            return res.status(200).json([])
        }
        let consultations = JSON.parse(JSON.stringify(existingConsultations.rows));

        for (let consulation of consultations) {
            //get doctors data
            let doctor = await pool.query(`SELECT * FROM doctors WHERE doctor_id = $1`, [consulation.doctor_id]);

            consulation.doctor = doctor.rows[0];
        }

        return res.status(200).json(consultations)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})


// get all doctors' consultations by id
router.get("/doctor/:id", async (req, res) => {
    try {

        let existingConsultations = await pool.query(
            `SELECT * FROM consultations WHERE doctor_id = $1`, [req.params.id]
        );
        if (existingConsultations.rows.length <= 0) {
            //no consultations
            return res.status(200).json([])
        }
        let consultations = JSON.parse(JSON.stringify(existingConsultations.rows));

        for (let consulation of consultations) {
            //get patients data
            let patient = await pool.query(`SELECT * FROM patients WHERE patient_id = $1`, [consulation.patient_id]);
            consulation.patient = patient.rows[0];
        }

        return res.status(200).json(consultations)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})


//update a consultation 





module.exports = router;