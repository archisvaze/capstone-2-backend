const express = require("express");
const client = require("../db_config");


let router = express.Router();

// //get doctor by id
// router.get("/:id", async (req, res) => {
//     try {
//         const doctor = await client.query("SELECT * FROM doctors WHERE _id = $1", [req.params.id]);
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
        const allDoctors = await client.query(`SELECT * FROM doctors`);
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
        const allDoctors = await client.query(
            `SELECT * FROM doctors WHERE speciality = $1`, [req.params.speciality]
        )
        return res.status(200).json(allDoctors.rows)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})
//get doctors by city
router.get("/city/:city", async (req, res) => {
    try {
        const allDoctors = await client.query(
            `SELECT * FROM doctors WHERE city = $1`, [req.params.city]
        )
        return res.status(200).json(allDoctors.rows)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})
//get doctors by username
router.get("/username/:username", async (req, res) => {
    try {
        const allDoctors = await client.query(
            `SELECT * FROM doctors WHERE username = $1`, [req.params.username]
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
        const updateDoctor = await client.query(
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

        let doctor = await client.query(
            `SELECT * FROM doctors WHERE email = $1`, [email]
        )
        return res.status(200).json(doctor.rows[0])

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }

})



//get consultation times

router.get("/timings/:id/:date", async (req, res) => {
    try {
        let existingDoctor = await client.query(
            `SELECT * FROM doctors WHERE doctor_id = $1`, [req.params.id]
        )
        if (existingDoctor.rows.length <= 0) {
            return res.status(400).json({ error: "Incorrect Doctor id or Doctor does not exist" })
        }

        let doctor = JSON.parse(JSON.stringify(existingDoctor.rows[0]));
        let times = doctor.times;

        let existingConsultations = await client.query(
            `SELECT * FROM consultations WHERE doctor_id = $1 AND date = $2`, [doctor.doctor_id, req.params.date]
        )

        if (existingConsultations.rows.length <= 0) {
            return res.status(200).json({ times: times })
        }

        let sameDayConsultations = JSON.parse(JSON.stringify(existingConsultations.rows));


        for (let consultation of sameDayConsultations) {
            let consultation_time = consultation.time;
            if (times.includes(consultation_time)) {
                for (let i = 0; i < times.length; i++) {
                    if (times[i] === consultation_time) {
                        times.splice(i, 1)
                    }
                }
            }
        }
        return res.status(200).json({ times: times })



    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

module.exports = router;



