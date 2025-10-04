import React from 'react';
import ZoomEffect from './ZoomEffect';

const Cube3D: React.FC = () => {
  return (
    <div className="cube-container">
      <div className="cube">
        <div className="face front">
          <div className="flex flex-col items-center">
            Jeff<br /><br />
            <ZoomEffect />
            {/* <a href="https://www.gocomics.com/calvinandhobbes">
              <button className="text-sm py-2 px-4 bg-[#1e3a8a] border rounded hover:bg-white hover:text-[#1e3a8a]">
                Calvin<br />and<br />Hobbes
              </button>
            </a> */}
          </div>
        </div>
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
