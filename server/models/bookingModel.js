const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    name:{
        type: String,
        required: true,
      
    },
    age: {
        type: String,
        required: true,
        
    },
    mail: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    userid: {
        type: String, 
    },
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;