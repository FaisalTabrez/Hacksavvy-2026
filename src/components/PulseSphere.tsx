'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

type AnimationState = 'IDLE' | 'SCAN' | 'EXPLODE' | 'RECOIL';

const POINT_COUNT = 2000;
const RADIUS = 1.5;

function SphereParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  
  // State refs 
  const stateRef = useRef<AnimationState>('IDLE');
  const timerRef = useRef(0);
  const nextTransitionRef = useRef(Math.random() * 3 + 3); // 3 to 6 seconds

  // Initialize data
  const { positions, originalPositions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(POINT_COUNT * 3);
    const origPos = new Float32Array(POINT_COUNT * 3);
    const cols = new Float32Array(POINT_COUNT * 3);
    const szs = new Float32Array(POINT_COUNT);

    const phi = Math.PI * (3 - Math.sqrt(5)); 
    const cyan = new THREE.Color('#00f0ff');

    for (let i = 0; i < POINT_COUNT; i++) {
      const y = 1 - (i / (POINT_COUNT - 1)) * 2; 
      const radiusAtY = Math.sqrt(1 - y * y); 
      const theta = phi * i; 
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Position
      pos[i * 3] = x * RADIUS;
      pos[i * 3 + 1] = y * RADIUS;
      pos[i * 3 + 2] = z * RADIUS;
      
      origPos[i * 3] = x * RADIUS;
      origPos[i * 3 + 1] = y * RADIUS;
      origPos[i * 3 + 2] = z * RADIUS;

      // Color (Cyan default)
      cols[i * 3] = cyan.r;
      cols[i * 3 + 1] = cyan.g;
      cols[i * 3 + 2] = cyan.b;
      
      // Sizes (not strictly used if sizeAttenuation is uniform, but good for custom size effects)
      szs[i] = 1.0; 
    }
    return { positions: pos, originalPositions: origPos, colors: cols, sizes: szs };
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    timerRef.current += delta;
    const t = state.clock.elapsedTime;
    const currentState = stateRef.current;
    
    // Access buffers
    const geom = meshRef.current.geometry;
    const posAttr = geom.attributes.position;
    const colAttr = geom.attributes.color;
    
    // --- PHASE A: IDLE ---
    if (currentState === 'IDLE') {
      meshRef.current.rotation.y += delta * 0.1;
      
      // Gentle Scale Sine Wave
      const scale = 1 + Math.sin(timerRef.current * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
      
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
      
      // Reset aesthetics
      materialRef.current.size = 0.02; 
      materialRef.current.vertexColors = true;
      meshRef.current.position.set(0, 0, 0);

      // Ensure colors are Cyan
      
      if (timerRef.current > nextTransitionRef.current) {
        stateRef.current = 'SCAN';
        timerRef.current = 0;
      }
    }

    // --- PHASE B: SCAN (Replaces JITTER) ---
    else if (currentState === 'SCAN') {
      const SCAN_DURATION = 4.0;
      const progress = Math.min(timerRef.current / SCAN_DURATION, 1);
      
      // Scan goes from -2.0 (bottom) to +2.0 (top)
      const scanHeight = THREE.MathUtils.lerp(-2.5, 2.5, progress);
      
      // Loop particles
      for (let i = 0; i < POINT_COUNT; i++) {
        const py = originalPositions[i * 3 + 1]; // Original Y
        const dist = Math.abs(py - scanHeight);
        
        // Band width 0.2
        if (dist < 0.2) {
          // Inside Band: WHITE + Push Out + Size Up
          colAttr.setXYZ(i, 1, 1, 1); // White
          
          // Push out by 10%
          posAttr.setXYZ(
            i, 
            originalPositions[i*3] * 1.1,
            originalPositions[i*3 + 1] * 1.1,
            originalPositions[i*3 + 2] * 1.1
          );
        } else {
          // Outside Band: Cyan + Reset Pos
          colAttr.setXYZ(i, 0, 0.94, 1); // Cyan #00f0ff
          
          posAttr.setXYZ(
            i, 
            originalPositions[i*3],
            originalPositions[i*3 + 1],
            originalPositions[i*3 + 2]
          );
        }
      }
      colAttr.needsUpdate = true;
      posAttr.needsUpdate = true;
      
      // Slight rotation during scan
      meshRef.current.rotation.y += delta * 0.2;

      if (timerRef.current > SCAN_DURATION) {
        stateRef.current = 'EXPLODE';
        timerRef.current = 0;
        
        // Reset particles to clean state before explosion
        for (let i = 0; i < POINT_COUNT; i++) {
           colAttr.setXYZ(i, 0, 0.94, 1);
           posAttr.setXYZ(i, originalPositions[i*3], originalPositions[i*3+1], originalPositions[i*3+2]);
        }
        colAttr.needsUpdate = true;
        posAttr.needsUpdate = true;
      }
    }

    // --- PHASE C: EXPLODE (Was BALLOON) ---
    else if (currentState === 'EXPLODE') {
      const EXPLODE_DURATION = 3.5; 
      const progress = Math.min(timerRef.current / EXPLODE_DURATION, 1);
      
      meshRef.current.position.set(0, 0, 0); 
      meshRef.current.rotation.y += delta * 3; 

      // Rapid Expansion: 1.0 -> 3.5
      const scale = THREE.MathUtils.lerp(1.0, 3.5, progress * progress); 
      meshRef.current.scale.set(scale, scale, scale);

      // HDR Color for Bloom (Hot Cyan) - updating material uniform is faster than loop
      materialRef.current.color.setRGB(4, 10, 10); 
      materialRef.current.vertexColors = false; // Disable vertex colors to let material color take over
      materialRef.current.size = 0.03;

      if (timerRef.current > EXPLODE_DURATION) {
        stateRef.current = 'RECOIL';
        timerRef.current = 0;
      }
    }

    // --- PHASE D: RECOIL (Implosion) ---
    else if (currentState === 'RECOIL') {
      const RECOIL_DURATION = 2.0;
      const progress = Math.min(timerRef.current / RECOIL_DURATION, 1);
      
      // Elastic Bounce: 3.5 -> 0.8 -> 1.0
      let targetScale = 1.0;
      if (progress < 0.5) {
        const p = progress * 2; 
        const eased = 1 - Math.pow(1 - p, 3);
        targetScale = THREE.MathUtils.lerp(3.5, 0.8, eased); 
      } else {
        const p = (progress - 0.5) * 2; 
        targetScale = THREE.MathUtils.lerp(0.8, 1.0, p * (2 - p)); 
      }
      
      meshRef.current.scale.set(targetScale, targetScale, targetScale);
      
      const rotationSpeed = THREE.MathUtils.lerp(3.0, 0.1, progress); 
      meshRef.current.rotation.y += delta * rotationSpeed;
      
      // Cooldown color
      materialRef.current.color.set('#00f0ff');
      materialRef.current.size = 0.02; 
      materialRef.current.vertexColors = true; // Re-enable for next cycle

      if (timerRef.current > RECOIL_DURATION) {
        stateRef.current = 'IDLE';
        timerRef.current = 0;
        nextTransitionRef.current = Math.random() * 3 + 3;
      }
    }
  });

  return (
    <Points 
      ref={meshRef} 
      positions={positions} 
      colors={colors}
      stride={3} 
      frustumCulled={false}
    >
      <PointMaterial
        ref={materialRef}
        transparent
        vertexColors
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
