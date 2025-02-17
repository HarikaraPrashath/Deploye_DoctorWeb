const Booking = require('../models/bookingModel.js');

// Add new booking order
const makeBooking = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Debug log to inspect incoming data
        const { name, age, mail, mobile, date, time } = req.body;

        // Validate required fields
        if (!name || !age || !mail || !mobile || !date || !time) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const user_id = req.user?._id; // Ensure req.user exists
        if (!user_id) {
            return res.status(400).json({ error: 'User ID not found in request' });
        }
        console.log("user id in backend",user_id)

        const newBooking = new Booking({ name, age, mail, mobile, date, time, userid: user_id });
        await newBooking.save();

        res.status(201).json({ success: true, booking: newBooking });
    } catch (error) {
        console.error('Booking Error:', error);
        res.status(500).json({ error: 'Server error occurred while creating Booking order' });
    }
};


// Delete booking order
const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const Book = await Booking.findByIdAndDelete(id);

        if (!Book) {
            return res.status(404).json({
                success: false,
                message: 'Payment order not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order and Payment deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error occurred while deleting payment order',
        });
    }
};

const getBooking = async (req, res) => {
    try {
        const user_id = req.user._id; // Ensure req.user exists and extract user ID

        const Book = await Booking.find({ userid: user_id }).sort({ createdAt: -1 });

        res.status(200).json(Book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error occurred while fetching Booking' });
    }
};

module.exports = { deleteBooking, getBooking, makeBooking };