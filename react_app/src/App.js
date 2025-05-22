import React, { useState } from 'react';

function App() {
  const [buildState, setBuildState] = useState({
    clone: false,
    build: false,
    test: false,
    deploy: false
  });

  const runPipeline = () => {
    setBuildState({ clone: false, build: false, test: false, deploy: false });
    
    setTimeout(() => setBuildState(prev => ({ ...prev, clone: true })), 500);
    setTimeout(() => setBuildState(prev => ({ ...prev, build: true })), 1000);
    setTimeout(() => setBuildState(prev => ({ ...prev, test: true })), 1500);
    setTimeout(() => setBuildState(prev => ({ ...prev, deploy: true })), 2000);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>CI/CD with Jenkins</h1>
      
      <div style={styles.pipelineContainer}>
        <div style={{...styles.stage, ...(buildState.clone ? styles.stageComplete : {})}}>
          Clone
        </div>
        <div style={styles.arrow}>→</div>
        <div style={{...styles.stage, ...(buildState.build ? styles.stageComplete : {})}}>
          Build
        </div>
        <div style={styles.arrow}>→</div>
        <div style={{...styles.stage, ...(buildState.test ? styles.stageComplete : {})}}>
          Test
        </div>
        <div style={styles.arrow}>→</div>
        <div style={{...styles.stage, ...(buildState.deploy ? styles.stageComplete : {})}}>
          Deploy
        </div>
      </div>
      
      <button 
        style={styles.button}
        onClick={runPipeline}
      >
        Run Pipeline
      </button>
      
      <div style={styles.statusBox}>
        <h3 style={styles.statusHeading}>Pipeline Status</h3>
        <p style={styles.statusItem}>Clone: <span style={buildState.clone ? styles.success : styles.pending}>
          {buildState.clone ? 'Success' : 'Pending'}
        </span></p>
        <p style={styles.statusItem}>Build: <span style={buildState.build ? styles.success : styles.pending}>
          {buildState.build ? 'Success' : 'Pending'}
        </span></p>
        <p style={styles.statusItem}>Test: <span style={buildState.test ? styles.success : styles.pending}>
          {buildState.test ? 'Success' : 'Pending'}
        </span></p>
        <p style={styles.statusItem}>Deploy: <span style={buildState.deploy ? styles.success : styles.pending}>
          {buildState.deploy ? 'Success' : 'Pending'}
        </span></p>
      </div>
    </div>
  );
}

// All styles in a single object
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    padding: '20px'
  },
  heading: {
    color: '#61dafb',
    marginBottom: '30px'
  },
  pipelineContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px 0',
    flexWrap: 'wrap'
  },
  stage: {
    backgroundColor: '#444',
    padding: '10px 20px',
    margin: '5px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease'
  },
  stageComplete: {
    backgroundColor: '#4caf50'
  },
  arrow: {
    fontSize: '20px',
    margin: '0 5px',
    color: '#777'
  },
  button: {
    backgroundColor: '#61dafb',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    margin: '20px 0',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  statusBox: {
    backgroundColor: '#333',
    padding: '15px',
    borderRadius: '5px',
    width: '300px',
    maxWidth: '90%',
    margin: '20px 0'
  },
  statusHeading: {
    margin: '0 0 15px 0',
    color: '#61dafb'
  },
  statusItem: {
    margin: '5px 0',
    textAlign: 'left',
    fontSize: '14px'
  },
  success: {
    color: '#4caf50',
    fontWeight: 'bold'
  },
  pending: {
    color: '#ffc107'
  }
};

export default App;