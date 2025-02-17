const express = require('express');
const requireAuth = require('../middleware/AuthRoutes'); 
const { makeBooking, getBooking, deleteBooking } = require('../controller/BookingController');

const router = express.Router();

// Require auth for all routes
router.use(requireAuth);

// GET all bookings
router.get('/appointments', getBooking);

// DELETE a booking
router.delete('/appointments/:id', deleteBooking);

// POST a new booking
router.post('/appointments', makeBooking);

module.exports = router;
