import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Cylinder } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap, Volume2, VolumeX } from 'lucide-react';
import type { Suspect } from '../types/game';
import * as THREE from 'three';

// Simple Electric Chair Component
function ElectricChair() {
  return (
    <group position={[0, -1, 0]}>
      {/* Chair Base */}
      <Box args={[1.5, 0.2, 1.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      
      {/* Chair Seat */}
      <Box args={[1.2, 0.1, 1]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="#A0522D" />
      </Box>
      
      {/* Chair Back */}
      <Box args={[1.2, 1.5, 0.1]} position={[0, 0.8, -0.4]}>
        <meshStandardMaterial color="#A0522D" />
      </Box>
      
      {/* Arm Rests */}
      <Box args={[0.1, 0.3, 0.8]} position={[-0.55, 0.4, 0]}>
        <meshStandardMaterial color="#A0522D" />
      </Box>
      <Box args={[0.1, 0.3, 0.8]} position={[0.55, 0.4, 0]}>
        <meshStandardMaterial color="#A0522D" />
      </Box>
      
      {/* Metal Restraints */}
      <Box args={[0.3, 0.05, 0.05]} position={[-0.55, 0.3, 0]}>
        <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
      </Box>
      <Box args={[0.3, 0.05, 0.05]} position={[0.55, 0.3, 0]}>
        <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
      </Box>
      
      {/* Electrode Helmet */}
      <Sphere args={[0.4]} position={[0, 1.8, 0]}>
        <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.1} />
      </Sphere>
    </group>
  );
}

// Simple Convict Figure
function ConvictFigure({ suspect, isExecuting }: { suspect: Suspect; isExecuting: boolean }) {
  const figureRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (figureRef.current && isExecuting) {
      figureRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 10) * 0.2;
    }
  });

  return (
    <group ref={figureRef} position={[0, -0.5, 0]}>
      {/* Head */}
      <Sphere args={[0.15]} position={[0, 1.3, 0]}>
        <meshStandardMaterial color="#FFDBAC" />
      </Sphere>
      
      {/* Body */}
      <Box args={[0.4, 0.6, 0.2]} position={[0, 0.7, 0]}>
        <meshStandardMaterial color="#FF4500" />
      </Box>
      
      {/* Arms */}
      <Box args={[0.1, 0.4, 0.1]} position={[-0.3, 0.8, 0]}>
        <meshStandardMaterial color="#FFDBAC" />
      </Box>
      <Box args={[0.1, 0.4, 0.1]} position={[0.3, 0.8, 0]}>
        <meshStandardMaterial color="#FFDBAC" />
      </Box>
      
      {/* Legs */}
      <Box args={[0.15, 0.5, 0.15]} position={[-0.1, 0.1, 0]}>
        <meshStandardMaterial color="#0066CC" />
      </Box>
      <Box args={[0.15, 0.5, 0.15]} position={[0.1, 0.1, 0]}>
        <meshStandardMaterial color="#0066CC" />
      </Box>
      
      {/* Name Label */}
      <Text
        position={[0, 2.2, 0]}
        fontSize={0.3}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        {suspect.name}
      </Text>
    </group>
  );
}

// Electric Sparks Effect
function ElectricSparks({ isActive }: { isActive: boolean }) {
  const sparksRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (sparksRef.current && isActive) {
      sparksRef.current.visible = Math.random() > 0.5;
    }
  });

  if (!isActive) return null;

  return (
    <group ref={sparksRef}>
      {Array.from({ length: 10 }).map((_, i) => (
        <Sphere
          key={i}
          args={[0.03]}
          position={[
            (Math.random() - 0.5) * 2,
            Math.random() * 2 + 1,
            (Math.random() - 0.5) * 2
          ]}
        >
          <meshBasicMaterial color="#00FFFF" />
        </Sphere>
      ))}
    </group>
  );
}

// Execution Lever
function ExecutionLever({ onExecute, isPulled }: { onExecute: () => void; isPulled: boolean }) {
  const leverRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (leverRef.current) {
      leverRef.current.rotation.z = isPulled ? -Math.PI / 4 : 0;
    }
  });

  return (
    <group position={[3, 0, 0]} onClick={onExecute}>
      {/* Lever Base */}
      <Box args={[0.3, 1, 0.3]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#333333" />
      </Box>
      
      {/* Lever Handle */}
      <group ref={leverRef} position={[0, 0.5, 0]}>
        <Box args={[0.1, 1, 0.1]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#CC0000" />
        </Box>
        <Sphere args={[0.1]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#CC0000" />
        </Sphere>
      </group>
      
      {/* Warning Sign */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.2}
        color="#FF0000"
        anchorX="center"
        anchorY="middle"
      >
        DANGER
      </Text>
    </group>
  );
}

// Main Execution Scene Component
interface ExecutionSceneProps {
  suspect: Suspect;
  onComplete: () => void;
}

export const ExecutionScene: React.FC<ExecutionSceneProps> = ({ suspect, onComplete }) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [showLever, setShowLever] = useState(false);
  const [leverPulled, setLeverPulled] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    // Show lever after delay
    const timer = setTimeout(() => setShowLever(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Simple audio using Web Audio API
    if (musicEnabled && !audioContextRef.current) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(60, audioContext.currentTime);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        
        oscillator.start();
        
        audioContextRef.current = audioContext;
        oscillatorRef.current = oscillator;
      } catch (error) {
        console.log('Audio context not available');
      }
    }
    
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [musicEnabled]);

  const handleExecute = () => {
    setLeverPulled(true);
    setIsExecuting(true);
    
    // Complete execution after animation
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  const toggleMusic = () => {
    setMusicEnabled(!musicEnabled);
    if (!musicEnabled && audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
      oscillatorRef.current = null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-black z-50 flex flex-col">
      {/* Audio Controls */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMusic}
          className="bg-black/50 border-white/30 text-white hover:bg-black/70"
        >
          {musicEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </Button>
      </div>

      {/* Scene Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <Card className="bg-black/80 border-red-600 p-4">
          <h1 className="text-2xl font-bold text-red-400 text-center">
            EXECUTION CHAMBER
          </h1>
          <p className="text-white text-center mt-2">
            State vs. {suspect.name}
          </p>
        </Card>
      </div>

      {/* 3D Scene */}
      <div className="flex-1 relative">
        <Canvas
          camera={{ position: [0, 2, 6], fov: 60 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 5, 0]} intensity={0.8} color="#FF4400" />
          <spotLight
            position={[5, 5, 5]}
            angle={0.5}
            penumbra={1}
            intensity={1}
            color="#FFFFFF"
          />
          
          <ElectricChair />
          <ConvictFigure suspect={suspect} isExecuting={isExecuting} />
          <ElectricSparks isActive={isExecuting} />
          
          {showLever && (
            <ExecutionLever onExecute={handleExecute} isPulled={leverPulled} />
          )}
          
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
        </Canvas>
      </div>

      {/* Instructions */}
      {showLever && !isExecuting && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <Card className="bg-black/80 border-red-600 p-4 animate-pulse">
            <div className="flex items-center gap-2 text-red-400">
              <Zap className="w-5 h-5" />
              <p className="font-semibold">Click the red lever to execute</p>
            </div>
          </Card>
        </div>
      )}

      {isExecuting && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <Card className="bg-black/80 border-yellow-600 p-4">
            <p className="text-yellow-400 font-semibold animate-pulse text-center">
              ⚡ EXECUTING SENTENCE ⚡
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};