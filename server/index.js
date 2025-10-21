const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { mongoose } = require('mongoose');
const { displayLeetcodeUser } = require('./leetcode.js');
const cors = require('cors');
const submissionRouter = require('./routes/submissionRoutes.js');

mongoose.connect("mongodb://127.0.0.1:27017/lc-autorevise")
    .then(console.log("mongoDB Connected"))
    .catch((err) => console.log(err));
// Middleware
app.use(cors({
    
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    displayLeetcodeUser("phANTom2303");
    res.json({ message: 'LC AutoRevise Server is running!' });
});

app.use('/submissions', submissionRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});