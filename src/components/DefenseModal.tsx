import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Scale, User, AlertTriangle } from 'lucide-react';
import type { Suspect } from '../types/game';

interface DefenseModalProps {
  suspect: Suspect;
  onConvict: () => void;
  onCancel: () => void;
}

export const DefenseModal: React.FC<DefenseModalProps> = ({ suspect, onConvict, onCancel }) => {
  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Scale className="text-accent" />
            Final Defense Statement
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Accused */}
          <Card className="p-4 bg-accent/5 border-accent/30">
            <div className="flex items-center gap-3">
              <User className="text-accent" />
              <div>
                <h3 className="font-semibold text-foreground">{suspect.name}</h3>
                <p className="text-sm text-muted-foreground">{suspect.age} years old, {suspect.occupation}</p>
              </div>
            </div>
          </Card>

          {/* Defense Statement */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-primary" />
              <h3 className="font-medium text-foreground">Defense Statement</h3>
            </div>
            
            <Card className="p-4 bg-muted border-border">
              <p className="text-foreground leading-relaxed italic">
                "{suspect.defenseStatement}"
              </p>
            </Card>
          </div>

          {/* Warning */}
          <Card className="p-4 bg-destructive/10 border-destructive/30">
            <div className="flex items-start gap-2">
              <AlertTriangle className="text-destructive mt-1" />
              <div className="space-y-1">
                <h4 className="font-medium text-destructive">Warning</h4>
                <p className="text-sm text-foreground">
                  This decision is final. If you convict an innocent person, there will be severe consequences 
                  for their life. Choose carefully based on the evidence presented.
                </p>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="border-border text-foreground hover:bg-muted"
            >
              Reconsider Evidence
            </Button>
            <Button 
              onClick={onConvict}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Proceed with Conviction
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};