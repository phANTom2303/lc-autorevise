import React from 'react';

export default function ProblemsList({ problems }) {
  if (!problems.length) return <p style={{ fontSize: 12, color: '#777' }}>No problems tracked yet.</p>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {problems.map(p => (
        <div key={p.id || p.title} style={itemStyle}>
          <strong style={{ fontSize: 14 }}>{p.title}</strong>
          <div style={metaRow}>Difficulty: {p.difficulty}</div>
          <div style={metaRow}>Last solved: {new Date(p.lastSolved).toLocaleDateString()}</div>
          <div style={metaRow}>Next revision: {new Date(p.nextRevision).toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  );
}

const itemStyle = {
  background: '#fff',
  border: '1px solid #ddd',
  borderRadius: 6,
  padding: 10,
  fontSize: 12,
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
};
const metaRow = { marginTop: 2 };
