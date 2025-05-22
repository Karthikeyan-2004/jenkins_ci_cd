import React, { useState, useEffect } from 'react';
import { Cpu, Server, Database, Code, Zap, CheckCircle } from 'lucide-react';

const App = () => {
  const [animationState, setAnimationState] = useState(0);
  const [showPipeline, setShowPipeline] = useState(false);
  const [buildComplete, setBuildComplete] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [deployComplete, setDeployComplete] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowPipeline(true), 500);
    setTimeout(() => setBuildComplete(true), 2000);
    setTimeout(() => setTestComplete(true), 3500);
    setTimeout(() => setDeployComplete(true), 5000);
    const interval = setInterval(() => {
      setAnimationState(prev => (prev + 1) % 4);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const renderFloatingIcons = () => {
    const icons = [
      { Icon: Cpu, color: "#4C51BF", delay: "0s" },
      { Icon: Server, color: "#38B2AC", delay: "0.5s" },
      { Icon: Database, color: "#ED8936", delay: "1s" },
      { Icon: Code, color: "#9F7AEA", delay: "1.5s" },
      { Icon: Zap, color: "#F56565", delay: "2s" }
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
        }}
      >
        <Icon size={36} color={color} />
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
                  <Code size={32} className={`${buildComplete ? 'text-green-500' : 'text-gray-400'}`} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Build</h3>
                {buildComplete && (
                  <CheckCircle className="text-green-500 mt-2 animate-bounce" />
                )}
              </div>

              {/* Test Step */}
              <div className="flex flex-col items-center p-4 md:w-1/3">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 ${testComplete ? 'border-green-500 bg-green-900/30' : 'border-gray-600'} transition-all duration-500`}>
                  <Zap size={32} className={`${testComplete ? 'text-green-500' : 'text-gray-400'}`} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Test</h3>
                {testComplete && (
                  <CheckCircle className="text-green-500 mt-2 animate-bounce" />
                )}
              </div>

              {/* Deploy Step */}
              <div className="flex flex-col items-center p-4 md:w-1/3">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 ${deployComplete ? 'border-green-500 bg-green-900/30' : 'border-gray-600'} transition-all duration-500`}>
                  <Server size={32} className={`${deployComplete ? 'text-green-500' : 'text-gray-400'}`} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Deploy</h3>
                {deployComplete && (
                  <CheckCircle className="text-green-500 mt-2 animate-bounce" />
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
              <Database size={24} className="text-white" />
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