const express = require("express");
const pool = require("../db_config");


let router = express.Router();

//onboard a patient by email
router.post("/onboard/", async (req, res) => {
    let {
        email,
        city,
        country,
        lookingfor,
        conditions,
        age,
        bloodgroup,
        gender,
        img,
        phone
    } = req.body;

    try {
        const updatePatient = await pool.query(
            `UPDATE patients SET 
            city=$2,
            country=$3,
            lookingfor=$4,
            conditions=$5,
            age=$6,
            bloodgroup=$7,
            gender=$8,
            img=$9,
            phone=$10,
            onboarded=$11
             WHERE email=$1`,
            [
                email,
                city,
                country,
                lookingfor,
                conditions,
                age,
                bloodgroup,
                gender,
                img,
                phone,
                true]);

        let patient = await pool.query(
            `SELECT * FROM patients WHERE email = $1`, [email]
        )
        return res.status(200).json(patient.rows[0])

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }

})


module.exports = router;