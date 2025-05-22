import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [rotating, setRotating] = useState(false);
  
  // Simple animation effect on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setRotating(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const incrementCounter = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CI/CD with Jenkins</h1>
        
        <div className={`logo-container ${rotating ? 'spin' : ''}`}>
          <div className="circle bg-red"></div>
          <div className="circle bg-blue"></div>
          <div className="circle bg-green"></div>
        </div>
        
        <p>
          Continuous Integration and Deployment Pipeline
        </p>
        
        <div className="counter-container">
          <p>Build count: {count}</p>
          <button 
            onClick={incrementCounter}
            className="button-animate"
          >
            Trigger Build
          </button>
        </div>
        
        <div className="pipeline">
          <div className="pipeline-step">Clone</div>
          <div className="pipeline-arrow">→</div>
          <div className="pipeline-step">Build</div>
          <div className="pipeline-arrow">→</div>
          <div className="pipeline-step">Test</div>
          <div className="pipeline-arrow">→</div>
          <div className="pipeline-step">Deploy</div>
        </div>
      </header>
    </div>
  );
}

export default App;