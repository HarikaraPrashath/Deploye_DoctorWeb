const express = require('express');
const { deleteDoc,getDoc,makeDoc } = require('../controller/doctorController');

const router = express.Router();



// GET all bookings
router.get('/slots', getDoc);

// DELETE a booking
router.delete('/slot/:id', deleteDoc);

// POST a new booking
router.post('/slot', makeDoc);

module.exports = router;
