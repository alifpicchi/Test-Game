import { useState, useEffect, useCallback } from 'react';

const GRAVITY = 0.5;
const JUMP_FORCE = -10;
const PIPE_SPEED = 3;
const PIPE_SPAWN_INTERVAL = 2000;
const GAP_SIZE = 150;

interface Pipe {
  position: number;
  height: number;
}

export const useGameLogic = () => {
  const [birdPosition, setBirdPosition] = useState(250);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [birdRotation, setBirdRotation] = useState(0);
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const jump = useCallback(() => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    if (!isGameOver) {
      setBirdVelocity(JUMP_FORCE);
      setBirdRotation(-30);
    }
  }, [isGameOver, gameStarted]);

  const reset = useCallback(() => {
    setBirdPosition(250);
    setBirdVelocity(0);
    setBirdRotation(0);
    setPipes([]);
    setScore(0);
    setIsGameOver(false);
    setGameStarted(false);
  }, []);

  // Game loop
  useEffect(() => {
    if (!gameStarted) return;

    const gameLoop = setInterval(() => {
      if (isGameOver) return;

      // Update bird
      setBirdPosition((prev) => {
        const next = prev + birdVelocity;
        if (next < 0 || next > 500) {
          setIsGameOver(true);
          return prev;
        }
        return next;
      });
      setBirdVelocity((prev) => prev + GRAVITY);
      setBirdRotation((prev) => Math.min(prev + 3, 90));

      // Update pipes
      setPipes((prevPipes) => {
        const newPipes = prevPipes
          .map((pipe) => ({
            ...pipe,
            position: pipe.position - PIPE_SPEED,
          }))
          .filter((pipe) => pipe.position > -100);

        // Check collisions
        newPipes.forEach((pipe) => {
          const birdRight = 58;
          const birdLeft = 42;
          const pipeLeft = pipe.position;
          const pipeRight = pipe.position + 64;

          if (
            birdRight > pipeLeft &&
            birdLeft < pipeRight &&
            (birdPosition < pipe.height || birdPosition > pipe.height + GAP_SIZE)
          ) {
            setIsGameOver(true);
          }
        });

        return newPipes;
      });

      // Update score
      setPipes((prevPipes) => {
        const passedPipe = prevPipes.find(
          (pipe) => pipe.position < 50 && pipe.position + PIPE_SPEED >= 50
        );
        if (passedPipe) {
          setScore((prev) => {
            const newScore = prev + 1;
            setHighScore((prevHigh) => Math.max(prevHigh, newScore));
            return newScore;
          });
        }
        return prevPipes;
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameStarted, isGameOver, birdPosition, birdVelocity]);

  // Spawn pipes
  useEffect(() => {
    if (!gameStarted || isGameOver) return;

    const spawnPipe = setInterval(() => {
      setPipes((prev) => [
        ...prev,
        {
          position: 800,
          height: Math.random() * (300 - 100) + 100,
        },
      ]);
    }, PIPE_SPAWN_INTERVAL);

    return () => clearInterval(spawnPipe);
  }, [gameStarted, isGameOver]);

  return {
    birdPosition,
    birdRotation,
    pipes,
    score,
    highScore,
    isGameOver,
    gameStarted,
    jump,
    reset,
  };
};