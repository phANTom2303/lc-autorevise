const { Router } = require('express');
const submissionRouter = Router();
const User = require('../models/userModel');
const Submission = require('../models/submissionModel');
const UserSubmission = require('../models/userSubmissionModel');


submissionRouter.post('/', async (req, res) => {
    try {
        const { username, submissionData } = req.body;

        // Create or find user
        let user = await User.findOne({ username });
        if (!user) {
            user = await User.create({ username });
        }

        // Create submission
        const submission = await Submission.create(submissionData);

        // Link user and submission
        const userSubmission = await UserSubmission.create({
            username: user.username,
            submission_id: submission.submission_id
        });

        res.status(201).json({
            success: true,
            data: {
                user,
                submission,
                userSubmission
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
