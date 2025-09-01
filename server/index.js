const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const { displayLeetcodeUser } = require('./leetcode.js');
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    displayLeetcodeUser("phANTom2303");
    res.json({ message: 'LC AutoRevise Server is running!' });
});



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});