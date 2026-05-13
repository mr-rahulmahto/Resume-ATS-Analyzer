const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    throw new Error('MONGO_URI environment variable is required');
}

mongoose.connect(
    mongoUri
)
.then(() => {
    console.log("Database Connected Successfully!!");
})
.catch((err) => {
    console.error("Database Connection Failed:", err.message);
});

