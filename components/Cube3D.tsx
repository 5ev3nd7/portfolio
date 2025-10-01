import React from 'react';

const Cube3D: React.FC = () => {
  return (
    <div className="cube-container">
      <div className="cube">
        <div className="face front">Jeff</div>
        <div className="face back">User</div>
        <div className="face right">Developer</div>
        <div className="face left">Designer</div>
        <div className="face top">Advocate</div>
        <div className="face bottom">Harris</div>
      </div>
    </div>
  );
};

export default Cube3D;
