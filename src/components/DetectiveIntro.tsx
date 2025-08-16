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
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < 2) {
      setCurrentPage(prev => prev + 1);
    } else {
      onStartGame();
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4 animate-fade-in">
              <h1 className="text-6xl font-bold text-foreground drop-shadow-2xl">
                Detective Case Files
              </h1>
              <p className="text-xl text-muted-foreground">The City Never Sleeps</p>
            </div>

            <Card className="p-8 bg-card/95 backdrop-blur-sm border-border shadow-[var(--shadow-noir)] animate-scale-in">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary mb-6">
                  <Cigarette className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">The Detective</h2>
                </div>

                <div className="space-y-6 text-lg leading-relaxed">
                  <p className="text-foreground italic">
                    *Takes a slow sip of bourbon, rain streaking down the window behind me*
                  </p>
                  
                  <p className="text-foreground">
                    Twenty years I've been walking these streets. Twenty years of blood, lies, and broken promises. 
                    The name's Sam Noir, and this weathered face has seen enough darkness to fill a dozen lifetimes.
                  </p>

                  <p className="text-foreground">
                    Started as a beat cop with dreams of making a difference. *Adjusts the brim of my fedora* 
                    The city has a way of carving those dreams right out of your soul, one corpse at a time.
                  </p>

                  <p className="text-muted-foreground">
                    Eight hundred and forty-seven cases closed. Each one etched deeper lines into this face, 
                    deeper shadows under these eyes. Give me black coffee and straight bourbon - none of that 
                    fancy latte nonsense the younger cops waste their money on.
                  </p>

                  <p className="text-foreground">
                    *Pulls the trench coat tighter against the perpetual chill*
                  </p>

                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                    <p className="text-accent font-medium">
                      "The bourbon burns away the taste of disappointment... and drowns out the stench of bologna from Tony's deli downstairs."
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-center">
              <Button 
                onClick={nextPage}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xl px-12 py-4 animate-scale-in shadow-[var(--shadow-noir)]"
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="max-w-3xl mx-auto space-y-8">
            <Card className="p-8 bg-card/95 backdrop-blur-sm border-border shadow-[var(--shadow-noir)] animate-scale-in">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary mb-6">
                  <MapPin className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">The City That Never Forgives</h2>
                </div>

                <div className="space-y-6 text-lg leading-relaxed">
                  <p className="text-foreground italic">
                    *Swirls the amber liquid, watching it catch the neon light from the window*
                  </p>
                  
                  <p className="text-foreground">
                    This city... she's a beautiful monster. All chrome and shadows, dreams and nightmares 
                    dancing together in the rain-slicked streets. Crime runs through her veins like poison.
                  </p>

                  <p className="text-foreground">
                    Murder in the penthouses, corruption in the precincts, betrayal in every back alley. 
                    The war ended, but the real battle started right here on these streets. And don't get me 
                    started on these new coffee shops - five bucks for what they call a "macchiato." 
                  </p>

                  <p className="text-muted-foreground">
                    Seventy-three percent above the national average, they say. I say those numbers don't 
                    capture the half of it. Every shadow hides a secret, every secret hides a crime. 
                    And every deli corner reeks of that God-awful bologna smell.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                      <p className="text-destructive text-sm font-medium">Five unsolved cases this month</p>
                      <p className="text-destructive/80 text-xs mt-1">The killers are still out there</p>
                    </div>
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                      <p className="text-accent text-sm font-medium">Post-war era, 1947</p>
                      <p className="text-accent/80 text-xs mt-1">When hope died with the peace</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-center">
              <Button 
                onClick={nextPage}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xl px-12 py-4 animate-scale-in shadow-[var(--shadow-noir)]"
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-3xl mx-auto space-y-8">
            <Card className="p-8 bg-card/95 backdrop-blur-sm border-border shadow-[var(--shadow-noir)] animate-scale-in">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary mb-6">
                  <Calendar className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">The Call</h2>
                </div>

                <div className="space-y-6 text-lg leading-relaxed">
                  <p className="text-foreground italic">
                    *The phone rings. 2:17 AM. I drain the glass and reach for my coat*
                  </p>
                  
                  <p className="text-foreground">
                    Another night, another body. The city never sleeps, and neither do her monsters. 
                    Someone out there thinks they're clever enough to outsmart a weathered old detective.
                  </p>

                  <p className="text-foreground italic">
                    *Steps into the rain, collar turned up against the night, fedora pulled low*
                  </p>

                  <p className="text-foreground">
                    They're wrong. Dead wrong. These scars on my face, the lines around my eyes - 
                    they're a map of every lie I've unraveled, every truth I've dragged kicking and 
                    screaming out of the shadows.
                  </p>

                  <p className="text-muted-foreground">
                    *The rain drums against my coat like bullets on concrete*
                  </p>

                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 text-center">
                    <p className="text-primary text-xl font-semibold mb-2">
                      "Time to get to work."
                    </p>
                    <p className="text-muted-foreground italic">
                      In this city of lies, a weathered detective is the only thing standing between justice and chaos.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-center">
              <Button 
                onClick={nextPage}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xl px-12 py-6 animate-scale-in shadow-[var(--shadow-noir)]"
              >
                Begin Investigation
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
        {renderPage()}
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