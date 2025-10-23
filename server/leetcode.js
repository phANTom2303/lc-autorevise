const { LeetCode } = require('leetcode-query');
const leetcode = new LeetCode();


async function displayLeetcodeUser(username) {
    try {
        const user = await leetcode.user(username);
        console.log(user);
        const requser = user.matchedUser.profile;
        // console.log(`Required User = ${JSON.stringify(requser, null, 2)}`);
        // console.log(`Required User = ${requser}`);
    } catch (error) {
        console.error(`Error fetching user ${username}:`, error);
        throw error;
    }
}

async function getLeetCodeProblems() {
    try {
        const apiUrl = 'https://leetcode.com/api/problems/all/';
        console.log(`Fetching problems from ${apiUrl}...`);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log(`Successfully fetched LeetCode problems data`);
        console.log(`Total problems: ${data.num_total}`);
        console.log(`Problems solved: ${data.num_solved}`);
        console.log(`Stat status pairs count: ${data.stat_status_pairs?.length || 0}`);
        
        return data;
    } catch (error) {
        console.error('Error fetching LeetCode problems:', error);
        throw error;
    }
}

module.exports = {
    displayLeetcodeUser,
    getLeetCodeProblems,
}

