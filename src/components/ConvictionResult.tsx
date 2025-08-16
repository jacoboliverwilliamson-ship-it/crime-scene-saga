import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, User, FileText, ArrowRight, AlertTriangle, Zap } from 'lucide-react';
import { ExecutionScene } from './ExecutionScene';
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
  const [executionComplete, setExecutionComplete] = useState(false);

  const handleProceedToExecution = () => {
    setShowExecution(true);
  };

  const handleExecutionComplete = () => {
    setShowExecution(false);
    setExecutionComplete(true);
  };

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
      <DialogContent className="max-w-3xl bg-card border-border max-h-[90vh] overflow-y-auto">
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

          {/* Execution Notice */}
          {executionComplete && (
            <Card className="p-4 bg-destructive/20 border-destructive text-center">
              <div className="space-y-2">
                <Zap className="text-destructive w-8 h-8 mx-auto" />
                <p className="text-destructive font-bold">SENTENCE EXECUTED</p>
                <p className="text-sm text-muted-foreground">
                  {accusedSuspect.name} has paid the ultimate price
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