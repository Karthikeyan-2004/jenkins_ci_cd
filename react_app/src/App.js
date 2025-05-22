import React, { useState, useEffect } from 'react';

function App() {
  const [buildState, setBuildState] = useState({
    clone: false,
    build: false,
    test: false,
    deploy: false
  });
  
  const [buildLog, setBuildLog] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [buildCount, setBuildCount] = useState(0);
  const [buildTime, setBuildTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [showLogs, setShowLogs] = useState(false);
  const [buildStatus, setBuildStatus] = useState('Not Started');
  
  const addLogEntry = (message) => {
    setBuildLog(prev => [...prev, { time: new Date().toLocaleTimeString(), message }]);
  };
  
  const resetBuild = () => {
    setBuildState({ clone: false, build: false, test: false, deploy: false });
    setBuildLog([]);
    setBuildTime(0);
    setBuildStatus('Not Started');
    if (timer) clearInterval(timer);
    setTimer(null);
  };
  
  const runPipeline = () => {
    resetBuild();
    setIsRunning(true);
    setBuildStatus('Running');
    setBuildCount(prev => prev + 1);
    
    addLogEntry('Starting pipeline execution...');
    
    // Start timer
    const intervalId = setInterval(() => {
      setBuildTime(prev => prev + 1);
    }, 1000);
    setTimer(intervalId);
    
    // Clone step
    setTimeout(() => {
      setBuildState(prev => ({ ...prev, clone: true }));
      addLogEntry('Clone: Pulling repository from Github');
    }, 1000);
    
    // Build step
    setTimeout(() => {
      setBuildState(prev => ({ ...prev, build: true }));
      addLogEntry('Build: npm install completed');
      addLogEntry('Build: npm run build completed');
    }, 3000);
    
    // Test step
    setTimeout(() => {
      setBuildState(prev => ({ ...prev, test: true }));
      addLogEntry('Test: All tests passed successfully');
    }, 5000);
    
    // Deploy step
    setTimeout(() => {
      setBuildState(prev => ({ ...prev, deploy: true }));
      addLogEntry('Deploy: Application deployed to production');
      setIsRunning(false);
      setBuildStatus('Success');
      clearInterval(intervalId);
    }, 7000);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);
  
  // Progress bar calculation
  const calculateProgress = () => {
    if (!isRunning && buildStatus === 'Not Started') return 0;
    if (!isRunning && buildStatus === 'Success') return 100;
    
    let progress = 0;
    if (buildState.clone) progress += 25;
    if (buildState.build) progress += 25;
    if (buildState.test) progress += 25;
    if (buildState.deploy) progress += 25;
    return progress;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>CI/CD with Jenkins 22ITR043</h1>
      
      {/* Dashboard Stats */}
      <div style={styles.statsContainer}>
        <div style={styles.statBox}>
          <span style={styles.statLabel}>Build #</span>
          <span style={styles.statValue}>{buildCount}</span>
        </div>
        <div style={styles.statBox}>
          <span style={styles.statLabel}>Status</span>
          <span style={{
            ...styles.statValue, 
            color: buildStatus === 'Success' ? '#4caf50' : 
                  buildStatus === 'Running' ? '#2196f3' : '#f44336'
          }}>
            {buildStatus}
          </span>
        </div>
        <div style={styles.statBox}>
          <span style={styles.statLabel}>Duration</span>
          <span style={styles.statValue}>{formatTime(buildTime)}</span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div style={styles.progressBarContainer}>
        <div style={{
          ...styles.progressBar,
          width: `${calculateProgress()}%`,
          backgroundColor: buildStatus === 'Success' ? '#4caf50' : '#2196f3'
        }}></div>
      </div>
      
      {/* Pipeline Visualization */}
      <div style={styles.pipelineContainer}>
        <div style={{...styles.stage, ...(buildState.clone ? styles.stageComplete : {})}}>
          <div style={styles.stageIcon}>1</div>
          Clone
        </div>
        <div style={styles.arrow}>→</div>
        <div style={{...styles.stage, ...(buildState.build ? styles.stageComplete : {})}}>
          <div style={styles.stageIcon}>2</div>
          Build
        </div>
        <div style={styles.arrow}>→</div>
        <div style={{...styles.stage, ...(buildState.test ? styles.stageComplete : {})}}>
          <div style={styles.stageIcon}>3</div>
          Test
        </div>
        <div style={styles.arrow}>→</div>
        <div style={{...styles.stage, ...(buildState.deploy ? styles.stageComplete : {})}}>
          <div style={styles.stageIcon}>4</div>
          Deploy
        </div>
      </div>
      
      {/* Action Buttons */}
      <div style={styles.buttonContainer}>
        <button 
          style={{
            ...styles.button,
            backgroundColor: isRunning ? '#aaa' : '#61dafb',
            cursor: isRunning ? 'not-allowed' : 'pointer'
          }}
          onClick={runPipeline}
          disabled={isRunning}
        >
          {isRunning ? 'Running...' : 'Run Pipeline'}
        </button>
        
        <button 
          style={{...styles.button, backgroundColor: '#f44336'}}
          onClick={resetBuild}
          disabled={isRunning}
        >
          Reset
        </button>
        
        <button 
          style={{...styles.button, backgroundColor: '#ff9800'}}
          onClick={() => setShowLogs(!showLogs)}
        >
          {showLogs ? 'Hide Logs' : 'Show Logs'}
        </button>
      </div>
      
      {/* Build Logs */}
      {showLogs && (
        <div style={styles.logsContainer}>
          <h3 style={styles.logsHeading}>Build Logs</h3>
          <div style={styles.logEntries}>
            {buildLog.length === 0 ? (
              <p style={styles.emptyLogs}>No logs available. Run the pipeline to see logs.</p>
            ) : (
              buildLog.map((log, index) => (
                <div key={index} style={styles.logEntry}>
                  <span style={styles.logTime}>[{log.time}]</span>
                  <span style={styles.logMessage}>{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      
      {/* Footer */}
      <div style={styles.footer}>
        <p>Jenkins Pipeline Simulator • {new Date().toLocaleDateString()}</p>
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
    justifyContent: 'flex-start',
    color: 'white',
    padding: '20px',
    overflowX: 'hidden'
  },
  heading: {
    color: '#61dafb',
    marginBottom: '20px',
    textShadow: '0 0 10px rgba(97, 218, 251, 0.5)'
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    margin: '15px 0',
    width: '100%',
    maxWidth: '700px'
  },
  statBox: {
    backgroundColor: '#333',
    padding: '15px',
    borderRadius: '5px',
    minWidth: '120px',
    display: 'flex',
    flexDirection: 'column'
  },
  statLabel: {
    fontSize: '12px',
    color: '#aaa',
    marginBottom: '5px'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold'
  },
  progressBarContainer: {
    width: '100%',
    maxWidth: '700px',
    height: '10px',
    backgroundColor: '#444',
    borderRadius: '5px',
    margin: '20px 0',
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    transition: 'width 0.5s ease-in-out'
  },
  pipelineContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px 0',
    flexWrap: 'wrap',
    gap: '5px'
  },
  stage: {
    backgroundColor: '#444',
    padding: '15px',
    margin: '5px',
    borderRadius: '5px',
    minWidth: '100px',
    position: 'relative',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px'
  },
  stageIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#555',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  stageComplete: {
    backgroundColor: '#4caf50',
    transform: 'translateY(-5px)'
  },
  arrow: {
    fontSize: '24px',
    margin: '0 5px',
    color: '#777'
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    margin: '20px 0',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  button: {
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.1s ease',
    outline: 'none'
  },
  logsContainer: {
    backgroundColor: '#111',
    padding: '15px',
    borderRadius: '5px',
    width: '100%',
    maxWidth: '700px',
    margin: '20px 0',
    textAlign: 'left',
    maxHeight: '300px',
    overflowY: 'auto'
  },
  logsHeading: {
    margin: '0 0 15px 0',
    color: '#61dafb',
    borderBottom: '1px solid #333',
    paddingBottom: '10px'
  },
  logEntries: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  logEntry: {
    fontFamily: 'monospace',
    fontSize: '14px',
    margin: '0'
  },
  logTime: {
    color: '#888',
    marginRight: '10px'
  },
  logMessage: {
    color: '#eee'
  },
  emptyLogs: {
    color: '#888',
    fontStyle: 'italic'
  },
  footer: {
    marginTop: 'auto',
    padding: '20px 0',
    color: '#555',
    fontSize: '12px'
  }
};

export default App;