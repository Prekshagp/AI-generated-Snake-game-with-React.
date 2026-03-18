import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const GAME_SPEED = 100;

type Point = { x: number; y: number };

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 15, y: 5 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const directionRef = useRef(direction);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // eslint-disable-next-line no-loop-func
      if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setFood(generateFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
    setHasStarted(true);
    setIsPaused(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === ' ' && hasStarted && !gameOver) {
        setIsPaused(p => !p);
        return;
      }

      if (!hasStarted || isPaused || gameOver) return;

      const { x, y } = directionRef.current;
      switch (e.key) {
        case 'ArrowUp':
          if (y === 0) directionRef.current = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          if (y === 0) directionRef.current = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          if (x === 0) directionRef.current = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          if (x === 0) directionRef.current = { x: 1, y: 0 };
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasStarted, isPaused, gameOver]);

  useEffect(() => {
    if (!hasStarted || isPaused || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + directionRef.current.x,
          y: head.y + directionRef.current.y,
        };

        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameLoop = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameLoop);
  }, [hasStarted, isPaused, gameOver, food, generateFood]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-4 flex justify-between w-full max-w-[400px] px-2 font-pixel text-sm md:text-base">
        <div className="text-cyan-glitch glitch" data-text={`SCORE:${score}`}>
          SCORE:{score}
        </div>
        <div className="text-magenta-glitch">
          {gameOver ? 'SYS_FAIL' : isPaused ? 'HALTED' : 'RUNNING'}
        </div>
      </div>

      <div 
        className="relative bg-black border-4 border-magenta-glitch overflow-hidden"
        style={{ width: 400, height: 400, maxWidth: '100%', aspectRatio: '1/1' }}
      >
        {!hasStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <button 
              onClick={resetGame}
              className="px-6 py-4 bg-cyan-glitch text-black font-pixel text-lg hover:bg-magenta-glitch hover:text-white transition-none border-4 border-white"
            >
              INIT_SEQ
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10 screen-tear">
            <div className="text-magenta-glitch font-pixel text-2xl mb-6 glitch" data-text="FATAL_ERROR">
              FATAL_ERROR
            </div>
            <button 
              onClick={resetGame}
              className="px-6 py-4 bg-magenta-glitch text-black font-pixel text-lg hover:bg-cyan-glitch hover:text-black transition-none border-4 border-white"
            >
              REBOOT
            </button>
          </div>
        )}

        {/* Grid rendering */}
        {Array.from({ length: GRID_SIZE }).map((_, y) => (
          <div key={y} className="flex h-[5%]">
            {Array.from({ length: GRID_SIZE }).map((_, x) => {
              const isSnake = snake.some(segment => segment.x === x && segment.y === y);
              const isHead = snake[0].x === x && snake[0].y === y;
              const isFood = food.x === x && food.y === y;

              return (
                <div
                  key={`${x}-${y}`}
                  className={`w-[5%] h-full border-[0.5px] border-cyan-glitch/20
                    ${isHead ? 'bg-magenta-glitch z-10 relative' : ''}
                    ${isSnake && !isHead ? 'bg-cyan-glitch' : ''}
                    ${isFood ? 'bg-white animate-pulse' : ''}
                    ${!isSnake && !isFood ? 'bg-black' : ''}
                  `}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-6 text-cyan-glitch font-pixel text-xs text-center leading-loose">
        &gt; INPUT: [ARROWS] TO NAVIGATE<br/>
        &gt; OVERRIDE: [SPACE] TO HALT
      </div>
    </div>
  );
}
