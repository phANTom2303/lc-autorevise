const { LeetCode } = require('leetcode-query');
const leetcode = new LeetCode();


async function displayLeetcodeUser(username) {
    try {
        const user = await leetcode.user(username);
        console.log(user);
        const requser = user.matchedUser.profile;
        console.log(`Required User = ${JSON.stringify(requser, null, 2)}`);
        // console.log(`Required User = ${requser}`);
    } catch (error) {
        console.error(`Error fetching user ${username}:`, error);
        throw error;
    }
}

module.exports = {
    displayLeetcodeUser,
}

