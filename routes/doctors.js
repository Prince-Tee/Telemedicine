const express = require('express');
const db = require('../server');
const router = express.Router();

router.get('/', (req, res)=>{
    const sql = `select * from doctors`;

    db.query(sql, (err, results)=>{
        if (err) return res.status(500).json({error: 'failed to retrieve doctor data'});
        res.json(results);
    });
});
router.post('/', (req, res)=>{
    const { name, specialization, availability, profile} = req.body;

    const sql = `INSERT INTO doctors (name, specialization, availability, profile) VALUES (?, ?, ?, ?)`;

    db.query(sql, [name, specialization, availability, profile], (err, result)=>{
        if (err) return res.status(500).json({error: 'failed to add doctors data'});
        res.status(201).json({message: 'doctors data added successfully'})
    });
});
module.exports = router;