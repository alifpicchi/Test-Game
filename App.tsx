import React from 'react';
import { Bird } from './components/Bird';
import { Pipe } from './components/Pipe';
import { GameOver } from './components/GameOver';
import { useGameLogic } from './hooks/useGameLogic';

function App() {
  const {
    birdPosition,
    birdRotation,
    pipes,
    score,
    highScore,
    isGameOver,
    gameStarted,
    jump,
    reset,
  } = useGameLogic();

  return (
    <div
      className="relative w-full h-screen bg-sky-300 overflow-hidden cursor-pointer"
      onClick={jump}
    >
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 to-sky-400" />

      {/* Clouds */}
      <div className="absolute top-10 left-1/4 w-20 h-8 bg-white rounded-full" />
      <div className="absolute top-20 right-1/3 w-24 h-10 bg-white rounded-full" />
      <div className="absolute top-40 left-1/3 w-16 h-6 bg-white rounded-full" />

      {/* Game container */}
      <div className="relative w-[800px] h-[500px] mx-auto mt-10 border-4 border-black bg-sky-300 overflow-hidden">
        {/* Score */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-white z-10 drop-shadow-lg">
          {score}
        </div>

        {/* Start message */}
        {!gameStarted && !isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-2xl font-bold text-center drop-shadow-lg">
              Click to Start
              <br />
              <span className="text-lg">Keep clicking to fly</span>
            </div>
          </div>
        )}

        {/* Bird */}
        <Bird position={birdPosition} rotation={birdRotation} />

        {/* Pipes */}
        {pipes.map((pipe, index) => (
          <React.Fragment key={index}>
            <Pipe
              height={pipe.height}
              position={pipe.position}
              isTop={true}
            />
            <Pipe
              height={500 - pipe.height - 150}
              position={pipe.position}
              isTop={false}
            />
          </React.Fragment>
        ))}

        {/* Ground */}
        <div className="absolute bottom-0 w-full h-16 bg-green-600 border-t-4 border-green-700" />

        {/* Game Over screen */}
        {isGameOver && (
          <GameOver
            score={score}
            highScore={highScore}
            onRestart={reset}
          />
        )}
      </div>
    </div>
  );
}

export default App;