import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Car, Zap, AlertTriangle, Target } from 'lucide-react';
import type { Suspect } from '../types/game';

interface CarChaseProps {
  suspect: Suspect;
  onCaught: () => void;
  onEscaped: () => void;
}

export const CarChase: React.FC<CarChaseProps> = ({ suspect, onCaught, onEscaped }) => {
  const [distance, setDistance] = useState(100); // Distance between cars (0-100)
  const [speed, setSpeed] = useState(50);
  const [obstacles, setObstacles] = useState<{ id: number; position: number }[]>([]);
  const [gameActive, setGameActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);
  const [playerPosition, setPlayerPosition] = useState(50);
  const [suspectPosition, setSuspectPosition] = useState(50);

  // Generate random obstacles
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameActive) return;
      
      setObstacles(prev => [
        ...prev.filter(obs => obs.position > -10),
        { id: Date.now(), position: 100 }
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, [gameActive]);

  // Move obstacles
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameActive) return;
      
      setObstacles(prev => 
        prev.map(obs => ({ ...obs, position: obs.position - 2 }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, [gameActive]);

  // Game timer
  useEffect(() => {
    if (!gameActive || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false);
          onEscaped();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, timeLeft, onEscaped]);

  // Update distance based on speed
  useEffect(() => {
    if (!gameActive) return;
    
    const interval = setInterval(() => {
      setDistance(prev => {
        const newDistance = prev - (speed - 45) / 10;
        
        if (newDistance <= 0) {
          setGameActive(false);
          onCaught();
          return 0;
        }
        
        if (newDistance >= 100) {
          setGameActive(false);
          onEscaped();
          return 100;
        }
        
        return newDistance;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [speed, gameActive, onCaught, onEscaped]);

  const accelerate = useCallback(() => {
    if (!gameActive) return;
    setSpeed(prev => Math.min(80, prev + 10));
    setTimeout(() => setSpeed(prev => Math.max(30, prev - 5)), 500);
  }, [gameActive]);

  const steerLeft = useCallback(() => {
    if (!gameActive) return;
    setPlayerPosition(prev => Math.max(10, prev - 15));
  }, [gameActive]);

  const steerRight = useCallback(() => {
    if (!gameActive) return;
    setPlayerPosition(prev => Math.min(90, prev + 15));
  }, [gameActive]);

  const ram = useCallback(() => {
    if (!gameActive || distance > 20) return;
    setDistance(prev => Math.max(0, prev - 20));
    setSpeed(prev => Math.max(20, prev - 15));
  }, [gameActive, distance]);

  // Check for collisions with obstacles
  useEffect(() => {
    obstacles.forEach(obstacle => {
      if (
        obstacle.position < 20 && 
        obstacle.position > 0 && 
        Math.abs(playerPosition - 50) < 20
      ) {
        setSpeed(prev => Math.max(20, prev - 20));
      }
    });
  }, [obstacles, playerPosition]);

  const getDistanceColor = () => {
    if (distance < 20) return 'text-success';
    if (distance < 50) return 'text-warning';
    return 'text-destructive';
  };

  const getSpeedColor = () => {
    if (speed > 60) return 'text-success';
    if (speed > 40) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="text-primary" />
            <h2 className="text-xl font-bold text-foreground">High-Speed Pursuit</h2>
          </div>
          <div className="text-sm text-muted-foreground">
            Time: {timeLeft}s
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Distance to suspect:</span>
            <span className={`text-sm font-bold ${getDistanceColor()}`}>
              {Math.round(distance)}m
            </span>
          </div>
          <Progress value={100 - distance} className="h-2" />
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Speed:</span>
            <span className={`text-sm font-bold ${getSpeedColor()}`}>
              {Math.round(speed)} mph
            </span>
          </div>
          <Progress value={speed} className="h-2" />
        </div>
      </div>

      {/* Chase Scene */}
      <div className="flex-1 relative bg-gradient-to-b from-sky-400 to-sky-600 overflow-hidden">
        {/* Road */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gray-800">
          {/* Road markings */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-yellow-400 animate-pulse"></div>
          
          {/* Player car */}
          <div 
            className="absolute bottom-8 w-8 h-12 bg-blue-600 rounded-sm transition-all duration-200"
            style={{ left: `${playerPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-full h-2 bg-blue-400 rounded-t-sm"></div>
          </div>
          
          {/* Suspect car */}
          <div 
            className="absolute w-8 h-12 bg-red-600 rounded-sm"
            style={{ 
              left: `${suspectPosition}%`, 
              bottom: `${Math.min(240, 120 + distance * 1.2)}px`,
              transform: 'translateX(-50%)' 
            }}
          >
            <div className="w-full h-2 bg-red-400 rounded-t-sm"></div>
          </div>
          
          {/* Obstacles */}
          {obstacles.map(obstacle => (
            <div
              key={obstacle.id}
              className="absolute w-6 h-10 bg-gray-600 rounded-sm"
              style={{
                left: '45%',
                bottom: `${obstacle.position * 2}px`,
                transform: 'translateX(-50%)'
              }}
            >
              <div className="w-full h-2 bg-gray-400 rounded-t-sm"></div>
            </div>
          ))}
        </div>

        {/* Status Message */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <Card className="p-3 bg-card/90 backdrop-blur-sm">
            <p className="text-sm text-center text-foreground">
              <strong className="text-destructive">{suspect.name}</strong> is trying to escape!
            </p>
          </Card>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-card border-t border-border p-4">
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <div className="space-y-2">
            <Button 
              onClick={steerLeft}
              disabled={!gameActive}
              variant="outline"
              size="lg"
              className="w-full"
            >
              ← Steer Left
            </Button>
            <Button 
              onClick={steerRight}
              disabled={!gameActive}
              variant="outline"
              size="lg"
              className="w-full"
            >
              Steer Right →
            </Button>
          </div>
          
          <div className="space-y-2">
            <Button 
              onClick={accelerate}
              disabled={!gameActive}
              variant="default"
              size="lg"
              className="w-full"
            >
              <Zap className="mr-2 w-4 h-4" />
              Accelerate
            </Button>
            <Button 
              onClick={ram}
              disabled={!gameActive || distance > 20}
              variant="destructive"
              size="lg"
              className="w-full"
            >
              <Target className="mr-2 w-4 h-4" />
              Ram Vehicle
            </Button>
          </div>
        </div>
        
        {distance <= 20 && gameActive && (
          <div className="text-center mt-4">
            <p className="text-sm text-success animate-pulse">
              <Target className="inline w-4 h-4 mr-1" />
              RAMMING RANGE - Hit the Ram button!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};