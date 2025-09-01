// background.js
// This script runs in the background and can handle extension events.
// Add logic here for alarms, messaging, etc.

chrome.runtime.onInstalled.addListener(() => {
  console.log('LeetCode AutoRevise extension installed.');
  
  // Enable the sidepanel for all LeetCode tabs
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

// Handle action click to open sidepanel
chrome.action.onClicked.addListener((tab) => {
  // The sidepanel will open automatically due to setPanelBehavior above
  console.log('Extension icon clicked, sidepanel should open');
});

// Listen for tab updates to conditionally show the sidepanel
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('leetcode.com')) {
    // Optionally auto-open sidepanel when on LeetCode
    // chrome.sidePanel.open({ tabId: tabId });
  }
});
