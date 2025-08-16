import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Cigarette, MapPin, Calendar, User } from 'lucide-react';
import detectiveIntro from '@/assets/detective-intro.jpg';

interface DetectiveIntroProps {
  onStartGame: () => void;
}

export const DetectiveIntro: React.FC<DetectiveIntroProps> = ({ onStartGame }) => {
  const [isReading, setIsReading] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={detectiveIntro} 
          alt="Detective in Bar" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Rain Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="rain-animation" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-6xl font-bold text-foreground drop-shadow-2xl">
              Detective Case Files
            </h1>
            <p className="text-xl text-muted-foreground">The City Never Sleeps</p>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Character Details */}
            <Card className="p-8 bg-card/95 backdrop-blur-sm border-border shadow-[var(--shadow-noir)] animate-scale-in">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <User className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">Detective Profile</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-2">Detective Sam Noir</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Twenty years on the force. Seen every kind of darkness this city has to offer. 
                      The bourbon helps dull the memories, but never quite erases them.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="outline" className="border-primary text-primary">
                          Years Active: 20
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="outline" className="border-accent text-accent">
                          Cases Solved: 847
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="outline" className="border-secondary text-secondary">
                          Rank: Senior Detective
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="outline" className="border-muted text-muted-foreground">
                          Precinct: 13th
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* World Background */}
            <Card className="p-8 bg-card/95 backdrop-blur-sm border-border shadow-[var(--shadow-noir)] animate-scale-in">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <MapPin className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">The City</h2>
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Crime runs through these streets like poison in the veins. Murder, corruption, 
                    betrayal - it's all here in the shadows between the neon lights.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span className="text-foreground">Late 1940s, Post-War Era</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Cigarette className="w-4 h-4 text-accent" />
                      <span className="text-foreground">Smoke-filled nights and rain-soaked streets</span>
                    </div>
                  </div>

                  <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                    <p className="text-destructive text-sm font-medium">
                      Crime Rate: 73% above national average
                    </p>
                    <p className="text-destructive/80 text-xs mt-1">
                      Five recent cases remain unsolved. Justice demands answers.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Story Intro */}
          <Card className="p-8 bg-card/95 backdrop-blur-sm border-border shadow-[var(--shadow-noir)] animate-fade-in">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-accent text-center">The Call Comes In</h3>
              <p className="text-foreground leading-relaxed text-center max-w-3xl mx-auto">
                The phone rings at 2:17 AM. Another body, another mystery. In this city, 
                the dead don't stay quiet for long, and the living have too many secrets. 
                Time to put that detective instinct to work.
              </p>
              <p className="text-muted-foreground text-center italic">
                "In a world where everyone lies, the truth is the most dangerous weapon."
              </p>
            </div>
          </Card>

          {/* Start Button */}
          <div className="flex justify-center">
            <Button 
              onClick={onStartGame}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xl px-12 py-6 animate-scale-in shadow-[var(--shadow-noir)]"
            >
              Begin Investigation
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        .rain-animation {
          background-image: 
            linear-gradient(transparent 0%, transparent 40%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.1) 60%, transparent 60%);
          background-size: 1px 20px;
          background-repeat: repeat;
          animation: rain 0.5s linear infinite;
        }
        
        @keyframes rain {
          0% { background-position: 0 -20px; }
          100% { background-position: 0 0; }
        }
      `}</style>
    </div>
  );
};