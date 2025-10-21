const mongoose = require('mongoose');

const userSubmissionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        ref: 'User'
    },
    submission_id: {
        type: String,
        required: true,
        ref: 'Submission'
    }
}, {
    timestamps: true
});

// Create a compound index to ensure a user can't have duplicate submissions
userSubmissionSchema.index({ username: 1, submission_id: 1 }, { unique: true });

const UserSubmission = mongoose.model('UserSubmission', userSubmissionSchema);

module.exports = UserSubmission;
