import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Eye, User, FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';
import { SuspectCard } from './SuspectCard';
import { EvidenceBoard } from './EvidenceBoard';
import { DefenseModal } from './DefenseModal';
import { ConvictionResult } from './ConvictionResult';
import { generateCrimeScenario } from '../lib/gameData';
import type { CrimeScenario, Suspect } from '../types/game';

export const CrimeGuessr: React.FC = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [scenario, setScenario] = useState<CrimeScenario | null>(null);
  const [selectedSuspect, setSelectedSuspect] = useState<number | null>(null);
  const [showDefense, setShowDefense] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    loadNewScenario();
  }, [currentRound]);

  const loadNewScenario = () => {
    const newScenario = generateCrimeScenario();
    setScenario(newScenario);
    setSelectedSuspect(null);
    setShowDefense(false);
    setShowResult(false);
  };

  const handleSuspectSelect = (suspectIndex: number) => {
    setSelectedSuspect(suspectIndex);
  };

  const handleAccuse = () => {
    if (selectedSuspect !== null) {
      setShowDefense(true);
    }
  };

  const handleFinalConviction = () => {
    setShowDefense(false);
    setShowResult(true);
    
    if (scenario && selectedSuspect === scenario.guiltyParty) {
      setScore(prev => prev + 100);
    }
  };

  const handleNextRound = () => {
    if (currentRound >= 5) {
      setGameComplete(true);
    } else {
      setCurrentRound(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setCurrentRound(1);
    setScore(0);
    setGameComplete(false);
    loadNewScenario();
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background p-4 flex items-center justify-center">
        <Card className="max-w-2xl mx-auto p-8 text-center bg-card border-border shadow-[var(--shadow-noir)]">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-foreground">Case Closed</h1>
              <p className="text-muted-foreground text-lg">Detective, your investigation is complete</p>
            </div>
            
            <div className="space-y-4">
              <div className="text-6xl font-bold text-primary">{score}</div>
              <p className="text-xl text-foreground">Final Score</p>
              <div className="text-muted-foreground">
                {score >= 400 ? "Outstanding Detective Work!" : 
                 score >= 300 ? "Solid Investigation Skills" :
                 score >= 200 ? "Room for Improvement" :
                 "Time to Review the Evidence"}
              </div>
            </div>

            <Button onClick={resetGame} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Start New Investigation
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!scenario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center">
        <div className="text-primary text-xl">Loading case files...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Eye className="text-primary" />
              CrimeGuessr
            </h1>
            <p className="text-muted-foreground">Detective Investigation Game</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-primary border-primary">
              Round {currentRound}/5
            </Badge>
            <Badge variant="secondary" className="text-foreground">
              Score: {score}
            </Badge>
          </div>
        </div>

        {/* Crime Scene */}
        <Card className="p-6 bg-card border-border shadow-[var(--shadow-noir)]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-accent">
              <FileText />
              <h2 className="text-xl font-semibold">Crime Scene Report</h2>
            </div>
            <div className="text-foreground leading-relaxed">
              {scenario.story}
            </div>
            <div className="text-sm text-muted-foreground">
              Location: {scenario.location} | Time: {scenario.timeOfCrime}
            </div>
          </div>
        </Card>

        {/* Evidence Board */}
        <EvidenceBoard evidence={scenario.evidence} />

        {/* Suspects */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-accent">
            <User />
            <h2 className="text-xl font-semibold">Suspects</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scenario.suspects.map((suspect, index) => (
              <SuspectCard
                key={index}
                suspect={suspect}
                isSelected={selectedSuspect === index}
                onSelect={() => handleSuspectSelect(index)}
              />
            ))}
          </div>
        </div>

        {/* Action Button */}
        {selectedSuspect !== null && (
          <div className="flex justify-center">
            <Button 
              onClick={handleAccuse}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
            >
              <Scale className="mr-2" />
              Accuse {scenario.suspects[selectedSuspect].name}
            </Button>
          </div>
        )}

        {/* Defense Modal */}
        {showDefense && selectedSuspect !== null && (
          <DefenseModal
            suspect={scenario.suspects[selectedSuspect]}
            onConvict={handleFinalConviction}
            onCancel={() => setShowDefense(false)}
          />
        )}

        {/* Conviction Result */}
        {showResult && selectedSuspect !== null && (
          <ConvictionResult
            isCorrect={selectedSuspect === scenario.guiltyParty}
            accusedSuspect={scenario.suspects[selectedSuspect]}
            actualGuilty={scenario.suspects[scenario.guiltyParty]}
            explanation={scenario.solution}
            onNext={handleNextRound}
          />
        )}
      </div>
    </div>
  );
};