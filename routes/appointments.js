const express = require('express')
const router = express.Router();
const db = require('../server');

router.post('/book', (req, res)=>{
    const {patient_id, doctor_id, appointment_date } = req.body;
    const sql = `INSERT INTO appointment (patient_id, doctor_id, appointment_date, status) values(?, ?, ?,'pending')`;

    db.query(sql, [patient_id, doctor_id, appointment_date], (err, result)=>{
        if (err) return res.status(500).json({error: 'can not add appointment booking'});
        res.status(201).json({message: 'appointment booking added successfully'});
    });
});

module.exports = router;
