import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Clock, Briefcase, Eye } from 'lucide-react';
import type { Suspect } from '../types/game';
import suspectMale1 from '@/assets/suspect-male-1.jpg';
import suspectFemale1 from '@/assets/suspect-female-1.jpg';
import suspectMale2 from '@/assets/suspect-male-2.jpg';

interface SuspectCardProps {
  suspect: Suspect;
  isSelected: boolean;
  onSelect: () => void;
}

export const SuspectCard: React.FC<SuspectCardProps> = ({ suspect, isSelected, onSelect }) => {
  // Select appropriate image based on suspect characteristics
  const getSuspectImage = () => {
    if (suspect.name.toLowerCase().includes('sarah') || suspect.name.toLowerCase().includes('emily') || suspect.name.toLowerCase().includes('victoria')) {
      return suspectFemale1;
    } else if (suspect.name.toLowerCase().includes('james') || suspect.name.toLowerCase().includes('david') || suspect.name.toLowerCase().includes('robert')) {
      return suspectMale1;
    } else {
      return suspectMale2;
    }
  };

  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-suspect)] hover:scale-105 ${
        isSelected 
          ? 'bg-accent/10 border-accent shadow-[var(--shadow-suspect)] scale-105' 
          : 'bg-suspect/95 backdrop-blur-sm border-border hover:border-accent/50'
      }`}
      onClick={onSelect}
    >
      <div className="space-y-4">
        {/* Suspect Photo & Header */}
        <div className="flex items-start gap-3">
          <div className="relative w-16 h-20 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
            <img 
              src={getSuspectImage()} 
              alt={`${suspect.name} portrait`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </div>
          
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-suspect-foreground text-lg">{suspect.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User size={14} />
              <span>Age {suspect.age}</span>
            </div>
            {isSelected && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                Selected
              </Badge>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Briefcase size={14} className="text-primary" />
            <span className="text-suspect-foreground">{suspect.occupation}</span>
          </div>
          
          <div className="text-sm text-suspect-foreground">
            <strong className="text-primary">Appearance:</strong> {suspect.appearance}
          </div>
        </div>

        {/* Alibi */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary text-sm font-medium">
            <Clock size={14} />
            Alibi
          </div>
          <p className="text-sm text-suspect-foreground bg-muted p-2 rounded">
            {suspect.alibi}
          </p>
        </div>

        {/* Motive */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent text-sm font-medium">
            <Eye size={14} />
            Motive
          </div>
          <p className="text-sm text-suspect-foreground bg-accent/5 p-2 rounded border border-accent/20">
            {suspect.motive}
          </p>
        </div>

        {/* Evidence */}
        <div className="space-y-2">
          <div className="text-evidence text-sm font-medium">
            Physical Evidence
          </div>
          <p className="text-sm text-suspect-foreground bg-evidence/10 p-2 rounded border border-evidence/30">
            {suspect.evidence}
          </p>
        </div>

        {/* Background */}
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            <strong>Background:</strong> {suspect.background}
          </p>
        </div>
      </div>
    </Card>
  );
};