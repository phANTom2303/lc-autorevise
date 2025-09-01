# Chrome Extension Manifest.json Explanation

This document explains the Chrome extension manifest file line by line.

## Manifest Version
```json
"manifest_version": 3,
```
Specifies this uses **Manifest V3** - the latest Chrome extension format (replaces V2). V3 has stricter security, uses service workers instead of background pages, and has different permission models.

## Basic Extension Info
```json
"name": "LeetCode Helper",
"version": "0.1.0", 
"description": "A Chrome extension template for leetcode.com.",
```
- **name**: Display name shown in Chrome's extension manager
- **version**: Extension version (semantic versioning format)
- **description**: Brief explanation shown in Chrome Web Store and extension manager

## Permissions
```json
"permissions": ["activeTab"],
"host_permissions": ["https://leetcode.com/*"],
```
- **permissions**: `activeTab` allows access to the currently active tab when user clicks the extension icon (less intrusive than `tabs` permission)
- **host_permissions**: Explicitly grants access to all LeetCode pages (`https://leetcode.com/*`). In V3, host permissions are separate from general permissions.

## Background Script
```json
"background": {
  "service_worker": "background.js"
},
```
Defines a **service worker** (V3 replacement for background pages). Service workers:
- Run in the background when needed
- Handle extension lifecycle events
- Are terminated when idle (unlike persistent background pages in V2)

## Extension Action (Popup)
```json
"action": {
  "default_popup": "popup.html",
  "default_icon": {
    "16": "icons/icon16.png",
    "32": "icons/icon32.png", 
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
},
```
- **action**: Defines the extension icon/button in Chrome toolbar (replaces V2's `browser_action`)
- **default_popup**: HTML file shown when user clicks the extension icon
- **default_icon**: Multiple icon sizes for different display contexts:
  - 16px: Favicon, small contexts
  - 32px: Windows, retina 16px
  - 48px: Extension management page
  - 128px: Chrome Web Store

## Content Scripts
```json
"content_scripts": [
  {
    "matches": ["https://leetcode.com/*"],
    "js": ["interceptor.js"],
    "run_at": "document_start",
    "world": "MAIN"
  },
  {
    "matches": ["https://leetcode.com/*"],
    "js": ["content.js"], 
    "run_at": "document_end"
  }
]
```

### First Content Script (Interceptor)
```json
"matches": ["https://leetcode.com/*"],
"js": ["interceptor.js"],
"run_at": "document_start", 
"world": "MAIN"
```
- **matches**: Injects only on LeetCode pages
- **js**: The interceptor script file
- **run_at**: `document_start` means it runs before any page scripts load (crucial for intercepting fetch/XHR before LeetCode's scripts run)
- **world**: `MAIN` means it runs in the page's main context (can access `window.fetch`), not the isolated extension context

### Second Content Script (Main Logic)
```json
"matches": ["https://leetcode.com/*"],
"js": ["content.js"],
"run_at": "document_end"
```
- **matches**: Same LeetCode pages
- **js**: Main content script
- **run_at**: `document_end` runs after DOM is built but before all resources load
- **world**: Omitted, so defaults to `ISOLATED` (extension's isolated context)

## Key Architecture Points

1. **Two-script approach**: Interceptor runs early in main world to patch network APIs, content script runs later in isolated world for safe extension logic
2. **Timing coordination**: `document_start` vs `document_end` ensures proper execution order
3. **Security model**: Uses minimal permissions (`activeTab` + specific host) following V3 best practices
4. **Cross-context communication**: Main world interceptor can communicate with isolated world content script via custom events or window messaging
