import React, { useEffect, useState } from 'react';
import ProblemsList from './components/ProblemsList.jsx';

export default function App() {
  const [problems, setProblems] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    chrome.storage?.local.get(['trackedProblems'], (result) => {
      setProblems(result.trackedProblems || []);
    });

    const listener = (message) => {
      if (message.type === 'PROBLEM_SOLVED') {
        chrome.storage?.local.get(['trackedProblems'], (result) => {
          setProblems(result.trackedProblems || []);
        });
      }
    };
    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>LeetCode AutoRevise</h2>
      <button style={styles.button} onClick={() => setStatus('Button clicked! React sidepanel working.')}>Test Button</button>
      <p style={styles.status}>{status}</p>
      <ProblemsList problems={problems} />
    </div>
  );
}

const styles = {
  container: { fontFamily: 'system-ui, sans-serif', padding: 12 },
  title: { margin: '0 0 12px 0', fontSize: 18 },
  button: { padding: '6px 10px', borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer' },
  status: { fontSize: 12, color: '#555' }
};
