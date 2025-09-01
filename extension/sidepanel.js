// sidepanel.js
// Handles sidepanel UI logic and communication with content scripts

document.addEventListener('DOMContentLoaded', () => {
  // Initialize sidepanel
  loadRevisionData();
  
  document.getElementById('doSomething').addEventListener('click', () => {
    document.getElementById('status').textContent = 'Button clicked! Sidepanel is working.';
    // Add feature logic here
  });
});

function loadRevisionData() {
  // Load and display tracked problems
  chrome.storage.local.get(['trackedProblems'], (result) => {
    const problems = result.trackedProblems || [];
    displayProblems(problems);
  });
}

function displayProblems(problems) {
  const problemsList = document.getElementById('problemsList');
  
  if (problems.length === 0) {
    problemsList.innerHTML = '';
    return;
  }
  
  problemsList.innerHTML = problems.map(problem => `
    <div class="problem-item">
      <h4>${problem.title}</h4>
      <p>Difficulty: ${problem.difficulty}</p>
      <p>Last solved: ${new Date(problem.lastSolved).toLocaleDateString()}</p>
      <p>Next revision: ${new Date(problem.nextRevision).toLocaleDateString()}</p>
    </div>
  `).join('');
}

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PROBLEM_SOLVED') {
    loadRevisionData(); // Refresh the display
  }
});

// Add CSS for problem items
const style = document.createElement('style');
style.textContent = `
  .problem-item {
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 8px;
    text-align: left;
  }
  .problem-item h4 {
    margin: 0 0 8px 0;
    color: #2c3e50;
    font-size: 14px;
  }
  .problem-item p {
    margin: 4px 0;
    font-size: 12px;
    color: #6c757d;
  }
`;
document.head.appendChild(style);
