import React, { useState, useEffect } from 'react';
import './App.css';
import jsProblems from './problems/javascript.json';
import pyProblems from './problems/python.json';
import javaProblems from './problems/java.json';
import cProblems from './problems/c.json';

const categories = ['JavaScript', 'Python', 'Java', 'C'];
const maxLevel = 10;

const allProblems = {
  JavaScript: jsProblems,
  Python: pyProblems,
  Java: javaProblems,
  C: cProblems
};

const App = () => {
  const [category, setCategory] = useState('JavaScript');
  const [level, setLevel] = useState(1);
  const [problemData, setProblemData] = useState({ problem: '', fix_keywords: [] });
  const [userSolution, setUserSolution] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const data = allProblems[category][level];
    if (data) {
      setProblemData(data);
      setUserSolution('');
      setStatus('');
    } else {
      setProblemData({ problem: '🚧 No problem available.', fix_keywords: [] });
    }
  
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category, level]);
  


  const checkSolution = () => {
    if (!userSolution.trim()) {
      setStatus('❌ Please write your fix first.');
      return;
    }

    const matchCount = problemData.fix_keywords.filter(keyword =>
      userSolution.toLowerCase().includes(keyword.toLowerCase())
    ).length;

    if (matchCount >= Math.ceil(problemData.fix_keywords.length / 2)) {
      setStatus('✅ Correct fix! Moving to next level...');

      setTimeout(() => {
        if (level < maxLevel) {
          setLevel(prev => prev + 1);
        } else {
          setStatus('🎉 You completed all 10 levels. Great job!');
        }
      }, 2000);
    } else {
      setStatus('❌ Incorrect or incomplete fix. Try again.');
    }
  };

  return (
    <div className="app">
      <h1>🐞 BugHunt Game</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label>Choose Category: </label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setLevel(1);
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <span style={{ marginLeft: '1rem' }}>Level: {level}</span>
      </div>

      <div className="problem-box">
        <h2>🧩 Debug This Code:</h2>
        <pre style={{
          background: '#1e1e1e',
          color: '#fff',
          padding: '1rem',
          borderRadius: '8px',
          fontSize: '0.9rem',
          overflowX: 'auto',
          whiteSpace: 'pre-wrap'
        }}>
          {problemData.problem}
        </pre>
      </div>

      <textarea
        value={userSolution}
        onChange={(e) => setUserSolution(e.target.value)}
        placeholder="Write your fixed code here..."
        rows={10}
        cols={80}
        style={{
          width: '100%',
          marginTop: '1rem',
          padding: '1rem',
          fontFamily: 'monospace',
          fontSize: '1rem'
        }}
      />

      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <button onClick={checkSolution}>🚀 Submit Solution</button>
        <button
          onClick={() => {
            if (level > 1) {
              setLevel(prev => prev - 1);
              setStatus('');
              setUserSolution('');
            }
          }}
          disabled={level === 1}
        >
          ⬅️ Previous Level
        </button>
      </div>

      <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{status}</p>

      <footer className="footer">
        <p>
          Designed and Developed by <span className="highlight-name">Arbaazkhan</span>.
          <br />
          Built with <span className="highlight-name">ReactJS</span>
        </p>
      </footer>

    </div>  
  );
};

export default App;
