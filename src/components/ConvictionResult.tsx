import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, User, FileText, ArrowRight, AlertTriangle, Zap, Car } from 'lucide-react';
import { ExecutionScene } from './ExecutionScene';
import { CarChase } from './CarChase';
import type { Suspect } from '../types/game';

interface ConvictionResultProps {
  isCorrect: boolean;
  accusedSuspect: Suspect;
  actualGuilty: Suspect;
  explanation: string;
  onNext: () => void;
}

export const ConvictionResult: React.FC<ConvictionResultProps> = ({ 
  isCorrect, 
  accusedSuspect, 
  actualGuilty, 
  explanation,
  onNext 
}) => {
  const [showExecution, setShowExecution] = useState(false);
  const [showCarChase, setShowCarChase] = useState(false);
  const [executionComplete, setExecutionComplete] = useState(false);
  const [chaseResult, setChaseResult] = useState<'caught' | 'escaped' | null>(null);

  const handleProceedToExecution = () => {
    // 30% chance of car chase before execution
    if (Math.random() < 0.3) {
      setShowCarChase(true);
    } else {
      setShowExecution(true);
    }
  };

  const handleChaseCaught = () => {
    setShowCarChase(false);
    setChaseResult('caught');
    setShowExecution(true);
  };

  const handleChaseEscaped = () => {
    setShowCarChase(false);
    setChaseResult('escaped');
    setExecutionComplete(true);
  };

  const handleExecutionComplete = () => {
    setShowExecution(false);
    setExecutionComplete(true);
  };

  // Show car chase scene
  if (showCarChase) {
    return (
      <CarChase 
        suspect={accusedSuspect} 
        onCaught={handleChaseCaught}
        onEscaped={handleChaseEscaped}
      />
    );
  }

  // Show execution scene
  if (showExecution) {
    return (
      <ExecutionScene 
        suspect={accusedSuspect} 
        onComplete={handleExecutionComplete}
      />
    );
  }
  return (
    <Dialog open={true}>
      <DialogContent className="max-w-3xl bg-card border-border max-h-[90vh] overflow-y-auto relative">
        {/* Detective Contemplation Background */}
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: 'url(/lovable-uploads/95a8e041-4a8e-4aa1-996e-74e0b6d299cc.png)' }}
        />
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isCorrect ? (
              <>
                <CheckCircle className="text-success" />
                <span className="text-success">Correct Conviction!</span>
              </>
            ) : (
              <>
                <XCircle className="text-destructive" />
                <span className="text-destructive">Wrongful Conviction</span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Result Summary */}
          <Card className={`p-4 ${isCorrect ? 'bg-success/10 border-success/30' : 'bg-destructive/10 border-destructive/30'}`}>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User />
                <span className="font-medium">You accused: {accusedSuspect.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight />
                <span className="font-medium">Actually guilty: {actualGuilty.name}</span>
              </div>
              {isCorrect && (
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  +100 Points
                </Badge>
              )}
            </div>
          </Card>

          {/* Case Solution */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="text-primary" />
              <h3 className="font-semibold text-foreground">Case Solution</h3>
            </div>
            <Card className="p-4 bg-muted border-border">
              <p className="text-foreground leading-relaxed">
                {explanation}
              </p>
            </Card>
          </div>

          {/* Consequences (if wrong) */}
          {!isCorrect && accusedSuspect.consequences && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-destructive" />
                <h3 className="font-semibold text-destructive">Consequences of Wrongful Conviction</h3>
              </div>
              <Card className="p-4 bg-destructive/5 border-destructive/30">
                <p className="text-foreground leading-relaxed">
                  <strong className="text-destructive">{accusedSuspect.name}'s life after conviction:</strong>
                </p>
                <p className="text-foreground leading-relaxed mt-2">
                  {accusedSuspect.consequences}
                </p>
              </Card>
            </div>
          )}

          {/* True Criminal's Fate */}
          {!isCorrect && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="text-muted-foreground" />
                <h3 className="font-semibold text-foreground">Meanwhile...</h3>
              </div>
              <Card className="p-4 bg-muted border-border">
                <p className="text-foreground">
                  <strong>{actualGuilty.name}</strong> goes free, having successfully framed an innocent person. 
                  The real criminal continues their life while {accusedSuspect.name} pays the price for a crime they didn't commit.
                </p>
              </Card>
            </div>
          )}

          {/* Chase Result Notice */}
          {chaseResult === 'escaped' && (
            <Card className="p-4 bg-warning/20 border-warning text-center">
              <div className="space-y-2">
                <Car className="text-warning w-8 h-8 mx-auto" />
                <p className="text-warning font-bold">SUSPECT ESCAPED</p>
                <p className="text-sm text-muted-foreground">
                  {accusedSuspect.name} managed to flee during the high-speed chase
                </p>
              </div>
            </Card>
          )}

          {/* Execution Notice */}
          {executionComplete && chaseResult !== 'escaped' && (
            <Card className="p-4 bg-destructive/20 border-destructive text-center">
              <div className="space-y-2">
                <Zap className="text-destructive w-8 h-8 mx-auto" />
                <p className="text-destructive font-bold">
                  {chaseResult === 'caught' ? 'CAPTURED AND EXECUTED' : 'SENTENCE EXECUTED'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {chaseResult === 'caught' 
                    ? `${accusedSuspect.name} was caught after a dramatic chase and executed`
                    : `${accusedSuspect.name} has paid the ultimate price`
                  }
                </p>
              </div>
            </Card>
          )}

          {/* Action Buttons - Different based on correctness */}
          <div className="flex justify-center gap-4 pt-4">
            {isCorrect && !executionComplete && (
              <Button 
                onClick={handleProceedToExecution}
                size="lg"
                variant="destructive"
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                <Zap className="mr-2 w-4 h-4" />
                Proceed to Execution
              </Button>
            )}
            
            {!isCorrect && !executionComplete && (
              <div className="flex flex-col gap-3 items-center">
                <p className="text-sm text-muted-foreground text-center">
                  What happens to the wrongly convicted?
                </p>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => {
                      // Show life sentence instead of execution
                      setExecutionComplete(true);
                    }}
                    size="lg"
                    variant="outline"
                    className="border-muted-foreground text-foreground hover:bg-muted"
                  >
                    Life in Prison
                  </Button>
                  <Button 
                    onClick={handleProceedToExecution}
                    size="lg"
                    variant="destructive"
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    <AlertTriangle className="mr-2 w-4 h-4" />
                    Execute Anyway
                  </Button>
                </div>
              </div>
            )}
            
            {executionComplete && (
              <Button 
                onClick={onNext}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Continue Investigation
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};