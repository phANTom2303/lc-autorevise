// background.js
// This script runs in the background and can handle extension events.
// Add logic here for alarms, messaging, etc.

chrome.runtime.onInstalled.addListener(() => {
  console.log('LeetCode AutoRevise extension installed.');
});
