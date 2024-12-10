const express = require('express');
const cors = require('cors');
const app = express();
const bodyParSer = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
app.use(cors());
app.use(bodyParSer.json());

const PORT = process.env.PORT || 5000;

app.get('/',(req, res)=>{
    res.send("Welcome to Telemedicine API");
});

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
});

const mysql = require('mysql2');

const db = mysql.createConnection({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err)=>{
    if (err){
        console.log('database connection failed:', err.message)
    }else{
        console.log('connected to the mysql database.');
    }
});
module.exports = db;

const patientRoutes = require ('./routes/patients');
app.use('/api/patients', patientRoutes);

const doctorRoutes = require ('./routes/doctors');
app.use('/api/doctors', doctorRoutes);

const appointmentRoutes = require('./routes/appointments');
app.use('/api/appointments', appointmentRoutes)
