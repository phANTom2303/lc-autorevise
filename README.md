# LeetCode Helper Chrome Extension

A template Chrome extension that activates on leetcode.com. Includes manifest v3, background script, content script, popup UI, and placeholder icons.

## Structure
- `manifest.json`: Extension configuration
- `background.js`: Background logic
- `content.js`: Runs on leetcode.com
- `popup.html`, `popup.js`, `popup.css`: Popup UI
- `icons/`: Placeholder icons (replace with your own)

## Getting Started
1. Replace icon files in `icons/` with your own PNGs.
2. Load the extension in Chrome via `chrome://extensions` (Enable Developer Mode > Load unpacked).
3. Start building features in `content.js`, `background.js`, and `popup.js`.
