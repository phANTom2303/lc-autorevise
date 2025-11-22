// content.js (isolated world)
// Companion script for logging or future UI; interceptor lives in interceptor.js (MAIN world).
console.log('LeetCode AutoRevise content script (isolated) loaded on', window.location.href);

// Fetch and log the problems list API on every page load
fetch('https://leetcode.com/api/problems/all/')
  .then(response => response.json())
  .then(data => {
    console.log('📊 [LC-AutoRevise] /api/problems/all/ response:', data);
  })
  .catch(error => {
    console.error('❌ [LC-AutoRevise] Failed to fetch /api/problems/all/:', error);
  });

