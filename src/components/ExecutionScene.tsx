import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Cylinder } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap, Volume2, VolumeX } from 'lucide-react';
import type { Suspect } from '../types/game';
import * as THREE from 'three';

// Electric Chair 3D Model Component
function ElectricChair() {
  const chairRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (chairRef.current) {
      chairRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={chairRef} position={[0, -1, 0]}>
      {/* Chair Base */}
      <Box args={[1.5, 0.2, 1.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2d1810" />
      </Box>
      
      {/* Chair Seat */}
      <Box args={[1.2, 0.1, 1]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="#3d2820" />
      </Box>
      
      {/* Chair Back */}
      <Box args={[1.2, 1.5, 0.1]} position={[0, 0.8, -0.4]}>
        <meshStandardMaterial color="#3d2820" />
      </Box>
      
      {/* Arm Rests */}
      <Box args={[0.1, 0.3, 0.8]} position={[-0.55, 0.4, 0]}>
        <meshStandardMaterial color="#3d2820" />
      </Box>
      <Box args={[0.1, 0.3, 0.8]} position={[0.55, 0.4, 0]}>
        <meshStandardMaterial color="#3d2820" />
      </Box>
      
      {/* Metal Restraints */}
      <Cylinder args={[0.05, 0.05, 0.3]} position={[-0.55, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Cylinder args={[0.05, 0.05, 0.3]} position={[0.55, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
      </Cylinder>
      
      {/* Electrode Helmet */}
      <Sphere args={[0.4]} position={[0, 1.8, 0]}>
        <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.1} />
      </Sphere>
      
      {/* Wires */}
      <Cylinder args={[0.02, 0.02, 1]} position={[-0.3, 1.3, 0]} rotation={[0, 0, Math.PI / 4]}>
        <meshStandardMaterial color="#000000" />
      </Cylinder>
      <Cylinder args={[0.02, 0.02, 1]} position={[0.3, 1.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <meshStandardMaterial color="#000000" />
      </Cylinder>
    </group>
  );
}

// Convict Figure Component
function ConvictFigure({ suspect }: { suspect: Suspect }) {
  const figureRef = useRef<THREE.Group>(null);
  const [isExecuted, setIsExecuted] = useState(false);
  
  useFrame((state) => {
    if (figureRef.current && isExecuted) {
      figureRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 20) * 0.3;
      figureRef.current.position.y = -0.7 + Math.sin(state.clock.elapsedTime * 15) * 0.1;
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsExecuted(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <group ref={figureRef} position={[0, -0.5, 0]}>
      {/* Head */}
      <Sphere args={[0.15]} position={[0, 1.3, 0]}>
        <meshStandardMaterial color="#fdbcb4" />
      </Sphere>
      
      {/* Body */}
      <Cylinder args={[0.2, 0.25, 0.6]} position={[0, 0.7, 0]}>
        <meshStandardMaterial color="#ff4500" />
      </Cylinder>
      
      {/* Arms */}
      <Cylinder args={[0.05, 0.05, 0.4]} position={[-0.35, 0.8, 0]} rotation={[0, 0, Math.PI / 6]}>
        <meshStandardMaterial color="#fdbcb4" />
      </Cylinder>
      <Cylinder args={[0.05, 0.05, 0.4]} position={[0.35, 0.8, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <meshStandardMaterial color="#fdbcb4" />
      </Cylinder>
      
      {/* Legs */}
      <Cylinder args={[0.08, 0.08, 0.5]} position={[-0.1, 0.1, 0]}>
        <meshStandardMaterial color="#0066cc" />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 0.5]} position={[0.1, 0.1, 0]}>
        <meshStandardMaterial color="#0066cc" />
      </Cylinder>
      
      {/* Name Label */}
      <Text
        position={[0, 1.8, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/helvetiker_regular.typeface.json"
      >
        {suspect.name}
      </Text>
    </group>
  );
}

// Electric Effect Component
function ElectricEffect({ isActive }: { isActive: boolean }) {
  const effectRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (effectRef.current && isActive) {
      effectRef.current.visible = Math.random() > 0.3;
      effectRef.current.scale.setScalar(0.8 + Math.random() * 0.4);
    }
  });

  if (!isActive) return null;

  return (
    <group ref={effectRef}>
      {Array.from({ length: 20 }).map((_, i) => (
        <Sphere
          key={i}
          args={[0.02]}
          position={[
            (Math.random() - 0.5) * 3,
            Math.random() * 3,
            (Math.random() - 0.5) * 3
          ]}
        >
          <meshBasicMaterial color="#00ffff" />
        </Sphere>
      ))}
    </group>
  );
}

// Lever Component
function ExecutionLever({ onExecute }: { onExecute: () => void }) {
  const leverRef = useRef<THREE.Group>(null);
  const [isPulled, setIsPulled] = useState(false);
  
  const handleClick = () => {
    if (!isPulled) {
      setIsPulled(true);
      onExecute();
    }
  };

  useFrame(() => {
    if (leverRef.current) {
      leverRef.current.rotation.z = isPulled ? -Math.PI / 3 : 0;
    }
  });

  return (
    <group position={[3, 0, 0]} onClick={handleClick}>
      {/* Lever Base */}
      <Box args={[0.3, 1, 0.3]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#333333" />
      </Box>
      
      {/* Lever Handle */}
      <group ref={leverRef} position={[0, 0.5, 0]}>
        <Cylinder args={[0.05, 0.05, 1]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#cc0000" />
        </Cylinder>
        <Sphere args={[0.1]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#cc0000" />
        </Sphere>
      </group>
      
      {/* Warning Sign */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.15}
        color="#ff0000"
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
  const [musicEnabled, setMusicEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Show lever after dramatic pause
    const timer = setTimeout(() => setShowLever(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Create dramatic music using Web Audio API
    if (musicEnabled) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(55, audioContext.currentTime); // Low ominous tone
      oscillator.type = 'sawtooth';
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      
      oscillator.start();
      
      return () => {
        oscillator.stop();
        audioContext.close();
      };
    }
  }, [musicEnabled]);

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      onComplete();
    }, 5000);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Audio Controls */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMusicEnabled(!musicEnabled)}
          className="bg-black/50 border-white/30 text-white"
        >
          {musicEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </Button>
      </div>

      {/* Scene Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <Card className="bg-black/70 border-red-600 p-4">
          <h1 className="text-2xl font-bold text-red-500 text-center">
            EXECUTION CHAMBER
          </h1>
          <p className="text-white text-center mt-2">
            The State vs. {suspect.name}
          </p>
        </Card>
      </div>

      {/* 3D Scene */}
      <div className="flex-1">
        <Canvas
          camera={{ position: [0, 2, 8], fov: 60 }}
          style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #000000 100%)' }}
        >
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 5, 0]} intensity={0.8} color="#ff4400" />
          <spotLight
            position={[5, 5, 5]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            color="#ffffff"
            target-position={[0, 0, 0]}
          />
          
          <ElectricChair />
          <ConvictFigure suspect={suspect} />
          <ElectricEffect isActive={isExecuting} />
          
          {showLever && <ExecutionLever onExecute={handleExecute} />}
          
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Instructions */}
      {showLever && !isExecuting && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <Card className="bg-black/70 border-red-600 p-4 animate-pulse">
            <div className="flex items-center gap-2 text-red-400">
              <Zap className="w-5 h-5" />
              <p className="font-semibold">Click the red lever to execute the sentence</p>
            </div>
          </Card>
        </div>
      )}

      {isExecuting && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <Card className="bg-black/70 border-yellow-600 p-4">
            <p className="text-yellow-400 font-semibold animate-pulse">
              EXECUTING... JUSTICE SERVED
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};