'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

type AnimationState = 'IDLE' | 'JITTER' | 'BALLOON' | 'RECOIL';

const POINT_COUNT = 2000;
const RADIUS = 1.5;

function SphereParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  
  // State refs 
  const stateRef = useRef<AnimationState>('IDLE');
  const timerRef = useRef(0);
  const nextTransitionRef = useRef(Math.random() * 3 + 3); // 3 to 6 seconds

  const positions = useMemo(() => {
    const arr = new Float32Array(POINT_COUNT * 3);
    const phi = Math.PI * (3 - Math.sqrt(5)); 

    for (let i = 0; i < POINT_COUNT; i++) {
      const y = 1 - (i / (POINT_COUNT - 1)) * 2; 
      const radiusAtY = Math.sqrt(1 - y * y); 
      const theta = phi * i; 
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      arr[i * 3] = x * RADIUS;
      arr[i * 3 + 1] = y * RADIUS;
      arr[i * 3 + 2] = z * RADIUS;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    timerRef.current += delta;
    const t = state.clock.elapsedTime;
    const currentState = stateRef.current;

    // --- PHASE A: IDLE ---
    if (currentState === 'IDLE') {
      meshRef.current.rotation.y += delta * 0.1;
      // Gently introduce Scale Sine Wave starting from 0 (Scale 1.0)
      const scale = 1 + Math.sin(timerRef.current * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
      
      // X Rot: Continue global time sine wave
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
      
      materialRef.current.color.set('#00f0ff');
      materialRef.current.size = 0.02; 
      meshRef.current.position.set(0, 0, 0);

      if (timerRef.current > nextTransitionRef.current) {
        stateRef.current = 'JITTER';
        timerRef.current = 0;
      }
    }

    // --- PHASE B: JITTER ---
    else if (currentState === 'JITTER') {
      const JITTER_DURATION = 1.5;

      const noise = 0.15;
      meshRef.current.position.set(
        (Math.random() - 0.5) * noise,
        (Math.random() - 0.5) * noise,
        (Math.random() - 0.5) * noise
      );

      // Flashing Colors (Red/White) & Size Glitch
      if (Math.random() > 0.5) {
        materialRef.current.color.set('#ff0055'); // Red
        materialRef.current.size = 0.035; // Randomly bigger
      } else {
        materialRef.current.color.set('#ffffff'); // White
        materialRef.current.size = 0.02;
      }

      if (timerRef.current > JITTER_DURATION) {
        stateRef.current = 'BALLOON';
        timerRef.current = 0;
      }
    }

    // --- PHASE C: BALLOON ---
    else if (currentState === 'BALLOON') {
      const BALLOON_DURATION = 3.5; 
      const progress = Math.min(timerRef.current / BALLOON_DURATION, 1);
      
      meshRef.current.position.set(0, 0, 0); // Ensure centered
      meshRef.current.rotation.y += delta * 3; 

      // Rapid Expansion: 1.0 -> 3.5
      const scale = THREE.MathUtils.lerp(1.0, 3.5, progress * progress); // 3.5 max scale
      meshRef.current.scale.set(scale, scale, scale);

      // HDR Color for Bloom (Hot Cyan)
      materialRef.current.color.setRGB(4, 10, 10); 
      materialRef.current.size = 0.03;

      if (timerRef.current > BALLOON_DURATION) {
        stateRef.current = 'RECOIL';
        timerRef.current = 0;
      }
    }

    // --- PHASE D: RECOIL (Implosion) ---
    else if (currentState === 'RECOIL') {
      const RECOIL_DURATION = 2.0;
      const progress = Math.min(timerRef.current / RECOIL_DURATION, 1);
      
      // Bounce logic: 3.5 -> 0.8 -> 1.0
      let targetScale = 1.0;
      if (progress < 0.5) {
        // First half: Shrink 3.5 -> 0.8
        const p = progress * 2; // 0 to 1
        // Ease out cubic for shrinkage
        const eased = 1 - Math.pow(1 - p, 3);
        targetScale = THREE.MathUtils.lerp(3.5, 0.8, eased); 
      } else {
        // Second half: Settle 0.8 -> 1.0
        const p = (progress - 0.5) * 2; // 0 to 1
        targetScale = THREE.MathUtils.lerp(0.8, 1.0, p * (2 - p)); // Ease out quad
      }
      
      meshRef.current.scale.set(targetScale, targetScale, targetScale);
      
      // Rotation: Ease speed from 3.0 (Balloon end) to 0.1 (Idle start)
      const rotationSpeed = THREE.MathUtils.lerp(3.0, 0.1, progress); 
      meshRef.current.rotation.y += delta * rotationSpeed;
      
      // Cooldown color
      materialRef.current.color.set('#00f0ff');
      materialRef.current.size = 0.02; // Reset size to match IDLE
      meshRef.current.position.set(0, 0, 0);

      if (timerRef.current > RECOIL_DURATION) {
        stateRef.current = 'IDLE';
        timerRef.current = 0;
        nextTransitionRef.current = Math.random() * 3 + 3;
      }
    }
  });

  return (
    <Points ref={meshRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        ref={materialRef}
        transparent
        color="#00f0ff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false} 
      />
    </Points>
  );
}

export default function PulseSphereBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 bg-black">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: false,
          powerPreference: "high-performance" 
        }}
      >
        <color attach="background" args={['#050505']} />
        
        <SphereParticles />
        
        <EffectComposer>
            <Bloom 
                luminanceThreshold={1}
                mipmapBlur
                intensity={2}
            />
        </EffectComposer>
        
        <ambientLight intensity={1} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] pointer-events-none opacity-80" />
    </div>
  );
}
