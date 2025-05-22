import React, { useState, useEffect } from 'react';

// Custom icon components to replace lucide-react
const CustomIcons = {
  Cpu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="2" x2="9" y2="4" />
      <line x1="15" y1="2" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="22" />
      <line x1="15" y1="20" x2="15" y2="22" />
      <line x1="20" y1="9" x2="22" y2="9" />
      <line x1="20" y1="14" x2="22" y2="14" />
      <line x1="2" y1="9" x2="4" y2="9" />
      <line x1="2" y1="14" x2="4" y2="14" />
    </svg>
  ),
  Server: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  Database: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  Code: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Zap: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  CheckCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
};

const App = () => {
  const [animationState, setAnimationState] = useState(0);
  const [showPipeline, setShowPipeline] = useState(false);
  const [buildComplete, setBuildComplete] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [deployComplete, setDeployComplete] = useState(false);

  useEffect(() => {
    // Trigger initial animations
    setTimeout(() => setShowPipeline(true), 500);
    
    // Build step animation
    setTimeout(() => setBuildComplete(true), 2000);
    
    // Test step animation
    setTimeout(() => setTestComplete(true), 3500);
    
    // Deploy step animation
    setTimeout(() => setDeployComplete(true), 5000);
    
    // Animation loop
    const interval = setInterval(() => {
      setAnimationState(prev => (prev + 1) % 4);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Floating icons animation
  const renderFloatingIcons = () => {
    const icons = [
      { Icon: CustomIcons.Cpu, color: "#4C51BF", delay: "0s" },
      { Icon: CustomIcons.Server, color: "#38B2AC", delay: "0.5s" },
      { Icon: CustomIcons.Database, color: "#ED8936", delay: "1s" },
      { Icon: CustomIcons.Code, color: "#9F7AEA", delay: "1.5s" },
      { Icon: CustomIcons.Zap, color: "#F56565", delay: "2s" }
    ];
    
    return icons.map(({ Icon, color, delay }, index) => (
      <div 
        key={index} 
        className="absolute"
        style={{
          animation: `float 10s ease-in-out infinite ${delay}`,
          top: `${Math.random() * 60 + 20}%`,
          left: `${Math.random() * 60 + 20}%`,
          opacity: 0.7,
          color: color
        }}
      >
        <div style={{ width: '36px', height: '36px' }}>
          <Icon />
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl" 
          style={{
            transform: `translate(${50 + Math.sin(animationState) * 20}px, ${-50 + Math.cos(animationState) * 20}px)`,
            transition: "transform 2s ease-in-out"
          }}
        />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl"
          style={{
            transform: `translate(${-50 + Math.cos(animationState) * 20}px, ${50 + Math.sin(animationState) * 20}px)`,
            transition: "transform 2s ease-in-out"
          }}
        />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-600 rounded-full filter blur-3xl"
          style={{
            transform: `translate(${-50 + Math.sin(animationState + 2) * 30}px, ${-50 + Math.cos(animationState + 2) * 30}px)`,
            transition: "transform 2s ease-in-out"
          }}
        />
      </div>

      {/* Floating icons */}
      {renderFloatingIcons()}

      {/* Main content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            CI/CD with Jenkins
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            An automated pipeline for continuous integration and deployment
          </p>
        </div>

        {/* Pipeline visualization */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 transform ${showPipeline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Build Step */}
              <div className="flex flex-col items-center p-4 md:w-1/3">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 ${buildComplete ? 'border-green-500 bg-green-900/30' : 'border-gray-600'} transition-all duration-500`}>
                  <div className={`${buildComplete ? 'text-green-500' : 'text-gray-400'}`}>
                    <CustomIcons.Code />
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-semibold">Build</h3>
                {buildComplete && (
                  <div className="text-green-500 mt-2 animate-bounce">
                    <CustomIcons.CheckCircle />
                  </div>
                )}
              </div>

              {/* Test Step */}
              <div className="flex flex-col items-center p-4 md:w-1/3">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 ${testComplete ? 'border-green-500 bg-green-900/30' : 'border-gray-600'} transition-all duration-500`}>
                  <div className={`${testComplete ? 'text-green-500' : 'text-gray-400'}`}>
                    <CustomIcons.Zap />
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-semibold">Test</h3>
                {testComplete && (
                  <div className="text-green-500 mt-2 animate-bounce">
                    <CustomIcons.CheckCircle />
                  </div>
                )}
              </div>

              {/* Deploy Step */}
              <div className="flex flex-col items-center p-4 md:w-1/3">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 ${deployComplete ? 'border-green-500 bg-green-900/30' : 'border-gray-600'} transition-all duration-500`}>
                  <div className={`${deployComplete ? 'text-green-500' : 'text-gray-400'}`}>
                    <CustomIcons.Server />
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-semibold">Deploy</h3>
                {deployComplete && (
                  <div className="text-green-500 mt-2 animate-bounce">
                    <CustomIcons.CheckCircle />
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-8 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000" 
                style={{ 
                  width: `${buildComplete ? (testComplete ? (deployComplete ? 100 : 66) : 33) : 0}%` 
                }}
              />
            </div>
          </div>
        </div>

        {/* Pulse animation at bottom */}
        <div className="mt-16 flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center z-10 relative">
              <div className="text-white">
                <CustomIcons.Database />
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20"></div>
            <div className="absolute inset-0 rounded-full bg-blue-500 animate-pulse opacity-40" style={{ animationDelay: "0.5s" }}></div>
          </div>
        </div>
      </div>

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
      `}</style>
    </div>
  );
};

export default App;