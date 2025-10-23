const express = require('express');
const router = express.Router();
const { getLeetCodeProblems } = require('../leetcode.js');

// Seed endpoint to fetch all problems from LeetCode
router.get('/seed', async (req, res) => {
    try {
        console.log('Fetching all LeetCode problems...');
        const data = await getLeetCodeProblems();
        
        res.json({
            success: true,
            data: data,
            message: `Successfully fetched LeetCode problems data`
        });
    } catch (error) {
        console.error('Error in seed route:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch problems',
            error: error.message
        });
    }
});

module.exports = router;
