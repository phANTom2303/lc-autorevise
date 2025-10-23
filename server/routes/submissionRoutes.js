const { Router } = require('express');
const submissionRouter = Router();
const User = require('../models/userModel');
const Submission = require('../models/submissionModel');


submissionRouter.post('/', async (req, res) => {
    try {
        const submissionData = req.body;

        // Create or find user
        let user = await User.findOne({ username: submissionData.username });
        if (!user) {
            user = await User.create({ username: submissionData.username });
        }

        // Create submission
        const submission = await Submission.create(submissionData);

        res.status(201).json({
            success: true,
            data: {
                user,
                submission
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = submissionRouter;
