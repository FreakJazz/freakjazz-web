import { useRef, useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };

type Position = { x: number; y: number };
type Direction = { x: number; y: number };

// ----------------------------------------------------------------------

export function SnakeGame() {
  const theme = useTheme();
  const { t } = useTranslate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [nextDirection, setNextDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [error, setError] = useState<Position | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(150);
  const [highScore, setHighScore] = useState(0);

  // Calculate canvas colors based on theme
  const canvasColors = useMemo(
    () => ({
      background: theme.palette.mode === 'dark' ? '#121212' : '#ffffff',
      grid: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    }),
    [theme.palette.mode]
  );

  // Generate random position for food/error
  const generatePosition = useCallback(
    (avoidSnake = true): Position => {
      let newPos: Position;
      do {
        newPos = {
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        };
      } while (
        avoidSnake &&
        snake.some((segment) => segment.x === newPos.x && segment.y === newPos.y)
      );
      return newPos;
    },
    [snake]
  );

  // Initialize game
  const startGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setNextDirection(INITIAL_DIRECTION);
    setFood(generatePosition(false));
    setError(Math.random() > 0.7 ? generatePosition(false) : null);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  }, [generatePosition]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setNextDirection({ x: 0, y: -1 });
          e.preventDefault();
          break;
        case 'ArrowDown':
          if (direction.y === 0) setNextDirection({ x: 0, y: 1 });
          e.preventDefault();
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setNextDirection({ x: -1, y: 0 });
          e.preventDefault();
          break;
        case 'ArrowRight':
          if (direction.x === 0) setNextDirection({ x: 1, y: 0 });
          e.preventDefault();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, direction]);

  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver) {
      return undefined;
    }

    const gameInterval = setInterval(() => {
      setDirection(nextDirection);

      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead: Position = {
          x: head.x + nextDirection.x,
          y: head.y + nextDirection.y,
        };

        // Check wall collision
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        // Check error collision
        if (error && newHead.x === error.x && newHead.y === error.y) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((prev) => {
            const newScore = prev + 10;
            setHighScore((hs) => Math.max(hs, newScore));
            return newScore;
          });
          setFood(generatePosition());
          // Spawn error occasionally
          if (Math.random() > 0.6) {
            setError(generatePosition());
          }
          return newSnake;
        }

        // Remove tail if no food eaten
        newSnake.pop();
        return newSnake;
      });
    }, speed);

    return () => clearInterval(gameInterval);
  }, [isPlaying, gameOver, nextDirection, food, error, speed, generatePosition]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    // Clear canvas with theme color
    ctx.fillStyle = canvasColors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = canvasColors.grid;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
      const gradient = ctx.createLinearGradient(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        (segment.x + 1) * CELL_SIZE,
        (segment.y + 1) * CELL_SIZE
      );

      if (index === 0) {
        // Head
        gradient.addColorStop(0, theme.palette.primary.main);
        gradient.addColorStop(1, theme.palette.primary.dark);
      } else {
        // Body
        gradient.addColorStop(0, theme.palette.primary.light);
        gradient.addColorStop(1, theme.palette.primary.main);
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );

      // Add shadow for depth
      if (index === 0) {
        ctx.shadowColor = theme.palette.primary.main;
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }
    });

    // Reset shadow
    ctx.shadowBlur = 0;

    // Draw food (request)
    if (food) {
      const foodGradient = ctx.createRadialGradient(
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        2,
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2
      );
      foodGradient.addColorStop(0, '#4caf50');
      foodGradient.addColorStop(1, '#2e7d32');

      ctx.fillStyle = foodGradient;
      ctx.beginPath();
      ctx.arc(
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        0,
        2 * Math.PI
      );
      ctx.fill();

      // Glow effect
      ctx.shadowColor = '#4caf50';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Draw error
    if (error) {
      const errorGradient = ctx.createRadialGradient(
        error.x * CELL_SIZE + CELL_SIZE / 2,
        error.y * CELL_SIZE + CELL_SIZE / 2,
        2,
        error.x * CELL_SIZE + CELL_SIZE / 2,
        error.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2
      );
      errorGradient.addColorStop(0, '#f44336');
      errorGradient.addColorStop(1, '#c62828');

      ctx.fillStyle = errorGradient;
      ctx.beginPath();
      ctx.arc(
        error.x * CELL_SIZE + CELL_SIZE / 2,
        error.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        0,
        2 * Math.PI
      );
      ctx.fill();

      // Glow effect
      ctx.shadowColor = '#f44336';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }, [snake, food, error, theme, canvasColors]);

  const speedMarks = [
    { value: 200, label: t('snakeGame.slow') },
    { value: 150, label: t('snakeGame.normal') },
    { value: 100, label: t('snakeGame.fast') },
    { value: 50, label: t('snakeGame.veryFast') },
  ];

  return (
    <Card
      sx={{
        p: 4,
        backdropFilter: 'blur(8px)',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      }}
    >
      <Stack spacing={3}>
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Iconify icon={'mdi:snake' as any} width={28} color="primary.main" />
            </Box>
            <Box>
              <Typography variant="h6">{t('snakeGame.title')}</Typography>
              <Typography variant="body2" color="text.secondary">
                {t('snakeGame.subtitle')}
              </Typography>
            </Box>
          </Stack>

          {/* Stats */}
          <Stack direction="row" spacing={2}>
            <Chip
              icon={<Iconify icon={'solar:cup-star-bold-duotone' as any} />}
              label={`${t('snakeGame.score')}: ${score}`}
              color="primary"
              variant="filled"
            />
            <Chip
              icon={<Iconify icon={'solar:star-bold-duotone' as any} />}
              label={`${t('snakeGame.highScore')}: ${highScore}`}
              color="warning"
              variant="outlined"
            />
          </Stack>
        </Stack>

        {/* Game Info */}
        <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
          <Chip
            icon={<Iconify icon={'solar:check-circle-bold-duotone' as any} />}
            label={t('snakeGame.collectRequests')}
            size="small"
            sx={{ bgcolor: alpha('#4caf50', 0.15) }}
          />
          <Chip
            icon={<Iconify icon={'solar:close-circle-bold-duotone' as any} />}
            label={t('snakeGame.avoidErrors')}
            size="small"
            sx={{ bgcolor: alpha('#f44336', 0.15) }}
          />
          <Chip
            icon={<Iconify icon={'solar:keyboard-bold-duotone' as any} />}
            label={t('snakeGame.useArrows')}
            size="small"
            variant="outlined"
          />
        </Stack>

        {/* Game Canvas */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            mx: 'auto',
            width: GRID_SIZE * CELL_SIZE,
          }}
        >
          <Box
            sx={{
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          >
            <Box
              component="canvas"
              ref={canvasRef}
              width={GRID_SIZE * CELL_SIZE}
              height={GRID_SIZE * CELL_SIZE}
              sx={{
                display: 'block',
              }}
            />
          </Box>

          {/* Game Status */}
          {gameOver && (
            <Typography variant="h6" color="error.main" sx={{ fontWeight: 600 }}>
              {t('snakeGame.gameOver')} - {t('snakeGame.finalScore')}: {score}
            </Typography>
          )}
          {!isPlaying && !gameOver && (
            <Typography variant="body1" color="text.secondary">
              {t('snakeGame.instructions')}
            </Typography>
          )}
        </Box>

        {/* Speed Control */}
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {t('snakeGame.speed')}
          </Typography>
          <Slider
            value={speed}
            onChange={(_, value) => setSpeed(value as number)}
            min={50}
            max={200}
            marks={speedMarks}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${201 - value}%`}
            disabled={isPlaying}
            sx={{
              '& .MuiSlider-markLabel': {
                fontSize: '0.75rem',
              },
            }}
          />
        </Box>

        {/* Control Buttons */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={startGame}
            disabled={isPlaying && !gameOver}
            startIcon={
              <Iconify
                icon={(isPlaying ? 'solar:refresh-bold-duotone' : 'solar:play-bold-duotone') as any}
              />
            }
            sx={{
              py: 1.5,
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            {gameOver ? t('snakeGame.playAgain') : t('snakeGame.startGame')}
          </Button>

          {isPlaying && (
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                setIsPlaying(false);
                setGameOver(true);
              }}
              startIcon={<Iconify icon={'solar:pause-bold-duotone' as any} />}
              sx={{ py: 1.5 }}
            >
              {t('snakeGame.pause')}
            </Button>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
