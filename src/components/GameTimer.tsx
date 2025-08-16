import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import timerIcon from '@/assets/timer-icon.jpg';

interface GameTimerProps {
  timeLimit: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
  onReset?: boolean;
}

export const GameTimer: React.FC<GameTimerProps> = ({ 
  timeLimit, 
  onTimeUp, 
  isActive, 
  onReset 
}) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (onReset) {
      setTimeLeft(timeLimit);
    }
  }, [onReset, timeLimit]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / timeLimit) * 100;
  const isUrgent = timeLeft <= 30;
  const isCritical = timeLeft <= 10;

  return (
    <Card className={`p-4 transition-all duration-300 ${
      isCritical ? 'bg-destructive/20 border-destructive animate-pulse' :
      isUrgent ? 'bg-accent/20 border-accent' :
      'bg-card border-border'
    }`}>
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 overflow-hidden rounded-full">
          <img 
            src={timerIcon} 
            alt="Timer" 
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isCritical ? 'animate-spin' : ''
            }`}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"
            style={{
              clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((percentage / 100) * 2 * Math.PI - Math.PI / 2)}% ${50 - 50 * Math.sin((percentage / 100) * 2 * Math.PI - Math.PI / 2)}%, 50% 50%)`
            }}
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {isCritical ? (
              <AlertTriangle className="w-4 h-4 text-destructive animate-pulse" />
            ) : (
              <Clock className="w-4 h-4 text-muted-foreground" />
            )}
            <span className={`text-sm font-medium ${
              isCritical ? 'text-destructive' :
              isUrgent ? 'text-accent' :
              'text-muted-foreground'
            }`}>
              Time Remaining
            </span>
          </div>
          
          <div className={`text-2xl font-bold ${
            isCritical ? 'text-destructive' :
            isUrgent ? 'text-accent' :
            'text-foreground'
          }`}>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
          
          <div className="w-full bg-muted rounded-full h-2 mt-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${
                isCritical ? 'bg-destructive' :
                isUrgent ? 'bg-accent' :
                'bg-primary'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
      
      {isCritical && (
        <div className="mt-2 text-xs text-destructive font-medium animate-pulse">
          CRITICAL: Time almost up!
        </div>
      )}
      {isUrgent && !isCritical && (
        <div className="mt-2 text-xs text-accent font-medium">
          Hurry! Less than 30 seconds left
        </div>
      )}
    </Card>
  );
};