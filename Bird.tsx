import React from 'react';

interface BirdProps {
  position: number;
  rotation: number;
}

export const Bird: React.FC<BirdProps> = ({ position, rotation }) => {
  return (
    <div
      className="absolute w-8 h-8 bg-yellow-400 rounded-full"
      style={{
        top: `${position}px`,
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.1s ease-in-out',
        left: '50px',
      }}
    >
      {/* Bird's eye */}
      <div className="absolute w-2 h-2 bg-white rounded-full top-1 right-1">
        <div className="absolute w-1 h-1 bg-black rounded-full top-0.5 right-0.5" />
      </div>
      {/* Bird's beak */}
      <div className="absolute w-4 h-2 bg-orange-500 rounded-r-lg top-3 -right-2" />
    </div>
  );
};