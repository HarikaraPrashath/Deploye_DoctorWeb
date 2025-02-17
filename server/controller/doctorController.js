const Doc = require('../models/doctorList.js');

// Add new booking order
const makeDoc = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Debug log to inspect incoming data

        // Destructure required fields from request body
        const { drName, checkFor, timeSlot } = req.body;

        // Validate required fields
        if (!drName || !checkFor || !timeSlot || !timeSlot.length) {
            return res.status(400).json({ error: 'All fields (drName, checkFor, timeSlot) are required' });
        }

        // Extract user_id from authenticated user (from req.user)
        const user_id = req.user?._id; 

       


        // Create a new document with the provided data and user_id
        const newDoc = new Doc({
            drName, 
            checkFor, 
            timeSlot, 
        });

        // Save the new document to the database
        await newDoc.save();

        // Respond with the created document
        res.status(201).json({ success: true, doctor: newDoc });

    } catch (error) {
        console.error('Error:', error);
        // Respond with a 500 status and error message
        res.status(500).json({ error: 'Server error occurred while creating the document' });
    }
};


// Delete booking order
const deleteDoc = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDoc = await Doc.findByIdAndDelete(id);

        if (!deletedDoc) {
            return res.status(404).json({ success: false, message: 'Doc order not found' });
        }

        res.status(200).json({ success: true, message: 'Doc List deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Server error occurred while deleting doc order' });
    }
};
// Get all bookings for a user
const getDoc = async (req, res) => {
    try {
        // Extract document ID from request parameters (if searching by ID)
        const { id } = req.params; 

        // Find documents based on the correct filter condition
        const docs = await Doc.find(id ? { _id: id } : {}).sort({ createdAt: -1 });

        // If no documents are found, return a 404 response
        if (!docs || docs.length === 0) {
            return res.status(404).json({ message: 'No documents found' });
        }

        // Return the found documents
        res.status(200).json(docs);
    } catch (error) {
        // Log any errors to the console for debugging
        console.error('Error:', error);

        // Return a 500 server error if something goes wrong
        res.status(500).json({ error: 'Server error occurred while fetching documents' });
    }
};


module.exports = { makeDoc, deleteDoc, getDoc };
