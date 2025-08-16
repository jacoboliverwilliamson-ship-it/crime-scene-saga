import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, AlertCircle } from 'lucide-react';
import type { Evidence } from '../types/game';

interface EvidenceBoardProps {
  evidence: Evidence[];
}

export const EvidenceBoard: React.FC<EvidenceBoardProps> = ({ evidence }) => {
  return (
    <Card className="p-6 bg-card border-border shadow-[var(--shadow-noir)]">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-evidence">
          <Search />
          <h2 className="text-xl font-semibold">Evidence Board</h2>
          <Badge variant="secondary" className="bg-evidence/20 text-evidence-foreground">
            {evidence.length} Items
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {evidence.map((item, index) => (
            <div 
              key={index}
              className="bg-evidence/5 border border-evidence/30 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="text-evidence mt-1 flex-shrink-0" />
                <div className="space-y-2 flex-1">
                  <h3 className="font-medium text-evidence text-sm">
                    {item.item}
                  </h3>
                  
                  <p className="text-sm text-foreground">
                    {item.description}
                  </p>
                  
                  <div className="pt-2 border-t border-evidence/20">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-evidence">Significance:</strong> {item.significance}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};