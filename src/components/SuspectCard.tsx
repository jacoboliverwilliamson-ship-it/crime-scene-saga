import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Clock, Briefcase, Eye } from 'lucide-react';
import type { Suspect } from '../types/game';

interface SuspectCardProps {
  suspect: Suspect;
  isSelected: boolean;
  onSelect: () => void;
}

export const SuspectCard: React.FC<SuspectCardProps> = ({ suspect, isSelected, onSelect }) => {
  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-suspect)] ${
        isSelected 
          ? 'bg-accent/10 border-accent shadow-[var(--shadow-suspect)]' 
          : 'bg-suspect border-border hover:border-accent/50'
      }`}
      onClick={onSelect}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-suspect-foreground text-lg">{suspect.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User size={14} />
              <span>Age {suspect.age}</span>
            </div>
          </div>
          {isSelected && (
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              Selected
            </Badge>
          )}
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