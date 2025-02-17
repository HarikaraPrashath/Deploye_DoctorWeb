const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const docList = new Schema({
    drName: {
        type: String,
        
    },
    checkFor: {
        type: String,
       
    },
    timeSlot: {
        type: [String], // Changed from String to [String] to store multiple time slots
        default: [],
    },
});

const Doc = mongoose.model("DocList", docList);
module.exports = Doc;
