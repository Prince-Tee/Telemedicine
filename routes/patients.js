const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../server');

router.post('/register', async (req, res)=>{
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO patients (name, email, password) VALUES (?, ?, ?)`;
    db.query(sql, [name, email, hashedPassword], (err, result)=>{
        if (err){
            return res.status(500).json({error: 'Reigistration failed'});
        }
        return res.status(201).json({message: 'Registration successful'});
    });
});

router.post('/login', (req, res)=>{
    const { email, password} = req.body;
    const sql = `select * from patients where email = ?`;

    db.query(sql, [email], async (err, result)=>{
        if (err) return res.status(500).json({ error: 'login failed'});
        if (result === 0) return res.status(404).json({error: 'not found'});

        const patient = result[0];

        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) return res.status(401).json({error: 'invalid credential'});

        const token = jwt.sign({id: patient.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({message: 'login sucessful', token});

    });
});

function authenticateToken(req, res, next) {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}


router.get('/profile', authenticateToken, (req, res) => {
    const sql = `SELECT name, email FROM patients WHERE id = ?`;
    db.query(sql, [req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error fetching profile' });
        res.json(result[0]);
    });
});

module.exports = router;