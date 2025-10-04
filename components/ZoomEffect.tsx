import React, { useState } from 'react';

interface ZoomEffectProps {
  onComplete?: () => void;
}

const ZoomEffect: React.FC<ZoomEffectProps> = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const triggerZoom = () => {
    setIsAnimating(true);
    
    // Reset after animation completes
    setTimeout(() => {
      setIsAnimating(false);
      setIsZoomed(true);
      onComplete?.();
    }, 2000); // 2 second animation
  };

  const closeZoom = () => {
    setIsZoomed(false);
  };

  return (
    <>
      {!isZoomed && (
        <button
          onClick={triggerZoom}
          disabled={isAnimating}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200"
        >
          {isAnimating ? 'Zooming...' : 'Trigger Zoom Effect'}
        </button>
      )}

      {/* Zoom overlay */}
      {isAnimating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="bg-blue-500 zoom-box"
            style={{
              width: '1px',
              height: '1px',
              animation: 'zoomGrow 2s ease-out forwards'
            }}
          />
        </div>
      )}

      {/* Zoomed state with close button */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-blue-500 flex items-center justify-center">
          <button
            onClick={closeZoom}
            className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-bold text-xl rounded-lg shadow-xl transition-colors duration-200"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default ZoomEffect;
