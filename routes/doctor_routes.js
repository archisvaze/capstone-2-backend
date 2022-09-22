const express = require("express");
const pool = require("../db_config");


let router = express.Router();

// //get doctor by id
// router.get("/:id", async (req, res) => {
//     try {
//         const doctor = await pool.query("SELECT * FROM doctors WHERE _id = $1", [req.params.id]);
//         if (doctor.rows.length <= 0) {
//             //doctor with id does not exist
//             return res.status(400).json({ error: "Doctor Not Found" })
//         }
//         doctor.rows[0].password = null;
//         return res.status(200).json(doctor.rows[0])

//     } catch (error) {
//         return res.status(400).json({ error: error.message })
//     }
// })

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

//get doctors by speciality
router.get("/:speciality", async (req, res) => {
    try {
        const allDoctors = await pool.query(
            `SELECT * FROM doctors WHERE speciality = $1`, [req.params.speciality]
        )
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
        times,
        speciality,
        city,
        country,
        email,
        cost,
        img
    } = req.body;

    try {
        const updateDoctor = await pool.query(
            `UPDATE doctors SET 
        qualification=$2,
        experience=$3,
        hospital=$4,
        days=$5,
        times=$6,
        speciality=$7,
        city=$8,
        country=$9,
        onboarded=$10,
        cost=$11,
        img=$12
        WHERE email=$1`,
            [
                email,
                qualification,
                experience,
                hospital,
                days,
                times,
                speciality,
                city,
                country,
                true,
                cost,
                img
            ]);

        return res.status(200).json({ message: "Doctor onboarded" })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }

})

module.exports = router;