'use client';

import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

type AnimationState = 'IDLE' | 'JITTER' | 'BALLOON';

const POINT_COUNT = 4000;
const RADIUS = 1.5;

function SphereParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  
  // State refs to avoid re-renders during animation loop
  const stateRef = useRef<AnimationState>('IDLE');
  const timerRef = useRef(0);
  const nextTransitionRef = useRef(Math.random() * 3 + 3); // 3 to 6 seconds

  // 1. Generate Uniform Points on Sphere (Fibonacci Sphere Algorithm)
  const positions = useMemo(() => {
    const arr = new Float32Array(POINT_COUNT * 3);
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden Angle

    for (let i = 0; i < POINT_COUNT; i++) {
      const y = 1 - (i / (POINT_COUNT - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // Radius at y

      const theta = phi * i; // Golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Scale by desired radius
      arr[i * 3] = x * RADIUS;
      arr[i * 3 + 1] = y * RADIUS;
      arr[i * 3 + 2] = z * RADIUS;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    // Update Timer
    timerRef.current += delta;
    const t = state.clock.elapsedTime;
    const currentState = stateRef.current;

    // --- PHASE A: IDLE ---
    if (currentState === 'IDLE') {
      // Logic
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;

      // Breathing
      const scale = 1 + Math.sin(t * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);

      // Reset Visuals
      materialRef.current.color.set('#00f0ff');
      meshRef.current.position.set(0, 0, 0);

      // Transition Check
      if (timerRef.current > nextTransitionRef.current) {
        stateRef.current = 'JITTER';
        timerRef.current = 0;
      }
    }

    // --- PHASE B: JITTER ---
    else if (currentState === 'JITTER') {
      const JITTER_DURATION = 1.5;

      // No rotation, just chaos
      const noise = 0.15;
      meshRef.current.position.x = (Math.random() - 0.5) * noise;
      meshRef.current.position.y = (Math.random() - 0.5) * noise;
      meshRef.current.position.z = (Math.random() - 0.5) * noise;

      // Flickering Color (Red / White alert)
      if (Math.random() > 0.5) {
        materialRef.current.color.set('#ff003c'); // Cyberpunk Red
      } else {
        materialRef.current.color.set('#ffffff');
      }

      // Transition Check
      if (timerRef.current > JITTER_DURATION) {
        stateRef.current = 'BALLOON';
        timerRef.current = 0;
      }
    }

    // --- PHASE C: BALLOON ---
    else if (currentState === 'BALLOON') {
      const BALLOON_DURATION = 0.8;
      
      // Progress 0 -> 1
      const progress = Math.min(timerRef.current / BALLOON_DURATION, 1);

      // 1. Rapid Rotation
      meshRef.current.rotation.y += delta * 15; // Super fast spin

      // 2. Expansion (Lerp 1.0 -> 2.5) with ease-in expo feel
      const scale = THREE.MathUtils.lerp(1.0, 3.5, progress * progress); // 2.5 was small, bumped to 3.5
      meshRef.current.scale.set(scale, scale, scale);

      // Visuals
      materialRef.current.color.set('#00f0ff'); // Reset color during explosion

      // Transition Check
      if (timerRef.current > BALLOON_DURATION) {
        // RESET
        stateRef.current = 'IDLE';
        timerRef.current = 0;
        nextTransitionRef.current = Math.random() * 3 + 3; // New random time
        meshRef.current.scale.set(1, 1, 1);
        meshRef.current.position.set(0, 0, 0);
        meshRef.current.rotation.set(0, 0, 0);
      }
    }
  });

  return (
    <Points ref={meshRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        ref={materialRef}
        transparent
        color="#00f0ff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
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
        <ambientLight intensity={1} />
      </Canvas>
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] pointer-events-none opacity-80" />
    </div>
  );
}
