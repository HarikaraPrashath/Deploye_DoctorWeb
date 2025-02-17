require('dotenv').config();
const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');



const userRoutes = require('./routes/useRoute')
const useBooking = require('./routes/useBooking')
const useDoc = require('./routes/docListRoute')


// express app
const app = express();

app.use(cors({
    origin: ['http://localhost:5173',"http://localhost:5174"], // Allow requests from this origin
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true, // Allow cookies if needed
}));

// middleware
app.use(express.json());


// routes
app.use('/api/users', userRoutes);
app.use('/api/booking', useBooking);
app.use('/api/doc', useDoc);

// connect to DB
const mongoAddress = process.env.MONGO_ADDRESS;

if (!mongoAddress) {
    console.error('Error: MONGO_ADDRESS is not defined in the environment variables.');
    process.exit(1); // Exit the application
}

mongoose
    .connect(process.env.MONGO_ADDRESS)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error.message);
    });