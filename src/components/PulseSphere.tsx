'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

type AnimationState = 'IDLE' | 'SCAN' | 'EXPLODE' | 'CONDENSE';

const POINT_COUNT = 2000;
const RADIUS = 1.5;

function SphereParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  
  // State refs 
  const stateRef = useRef<AnimationState>('IDLE');
  const timerRef = useRef(0);
  const nextTransitionRef = useRef(Math.random() * 3 + 3); // 3 to 6 seconds
  
  // Physics refs
  const velocitiesRef = useRef<Float32Array>(new Float32Array(POINT_COUNT * 3));
  const explodedRef = useRef(false); // Track if explosion initial force has been applied
  const scanIterationRef = useRef(0); // Track which scan pass we are on

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
      
      // Gentle Wobble on X
      // We perform a LERP towards the target wobble to avoid snapping if previous state left us skewed
      const targetRotX = Math.sin(t * 0.5) * 0.1;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, delta * 2.0);

      // Reset aesthetics
      materialRef.current.size = 0.02; 
      materialRef.current.vertexColors = true;
      meshRef.current.position.set(0, 0, 0);

      if (timerRef.current > nextTransitionRef.current) {
        stateRef.current = 'SCAN';
        timerRef.current = 0;
        scanIterationRef.current = 0; // Start fresh sequence
      }
    }

    // --- PHASE B: SCAN ---
    else if (currentState === 'SCAN') {
      // Accelerating durations: 8 passes total
      const scanDurations = [2.0, 1.0, 0.6, 0.4, 0.3, 0.2, 0.15, 0.1];
      const maxScans = scanDurations.length;
      const currentIdx = scanIterationRef.current;
      
      const duration = scanDurations[currentIdx] || 0.1;
      const progress = Math.min(timerRef.current / duration, 1);
      
      // Ping Pong Direction: Even=Up, Odd=Down
      const isUp = currentIdx % 2 === 0;
      const startH = isUp ? -2.5 : 2.5; 
      const endH = isUp ? 2.5 : -2.5;
      
      const scanHeight = THREE.MathUtils.lerp(startH, endH, progress);
      
      // Loop particles
      for (let i = 0; i < POINT_COUNT; i++) {
        const py = originalPositions[i * 3 + 1]; // Original Y
        const dist = Math.abs(py - scanHeight);
        
        // Band width constant
        if (dist < 0.25) {
          // Inside Band: WHITE + Push Out
          colAttr.setXYZ(i, 1, 1, 1); // White
          
          const pushScale = 1.1 + (0.05 * currentIdx); // Get more aggressive with each pass
          posAttr.setXYZ(
            i, 
            originalPositions[i*3] * pushScale,
            originalPositions[i*3 + 1] * pushScale,
            originalPositions[i*3 + 2] * pushScale
          );
        } else {
          // Outside Band: Cyan + Reset Pos
          colAttr.setXYZ(i, 0, 0.94, 1); 
          
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
      
      meshRef.current.rotation.y += delta * (0.2 + (currentIdx * 0.2)); // Spin faster too

      if (timerRef.current > duration) {
          // Next Scan or Explode?
          scanIterationRef.current += 1;
          timerRef.current = 0;
          
          if (scanIterationRef.current >= maxScans) {
              stateRef.current = 'EXPLODE';
              explodedRef.current = false; 

              // Final Cleanup: ensure all particles reset to base color/pos before explode
              for (let i = 0; i < POINT_COUNT; i++) {
                colAttr.setXYZ(i, 0, 0.94, 1);
                posAttr.setXYZ(i, originalPositions[i*3], originalPositions[i*3+1], originalPositions[i*3+2]);
              }
              posAttr.needsUpdate = true;
              colAttr.needsUpdate = true;
          }
      }
    }

    // --- PHASE C: EXPLODE (Physics-based) ---
    else if (currentState === 'EXPLODE') {
      const EXPLODE_DURATION = 5.0; // Longer duration for slow-motion effect

      // 1. Initialize velocities on first frame
      if (!explodedRef.current) {
        const velocities = velocitiesRef.current;
        for (let i = 0; i < POINT_COUNT; i++) {
          const ix = i * 3;
          const iy = i * 3 + 1;
          const iz = i * 3 + 2;

          // Direction vector (from center 0,0,0) + Jitter
          const x = posAttr.getX(i);
          const y = posAttr.getY(i);
          const z = posAttr.getZ(i);

          const noise = 0.5;
          const rx = (Math.random() - 0.5) * noise;
          const ry = (Math.random() - 0.5) * noise;
          const rz = (Math.random() - 0.5) * noise;

          const len = Math.sqrt(x*x + y*y + z*z) || 1;
          const dirX = x / len + rx;
          const dirY = y / len + ry;
          const dirZ = z / len + rz;

          // Reduced Explosion force for "slow motion" feel
          // Was 0.1 + rand*0.15 -> Now 0.05 + rand*0.10
          const force = 0.05 + Math.random() * 0.10; 

          velocities[ix] = dirX * force;
          velocities[iy] = dirY * force;
          velocities[iz] = dirZ * force;
          
          // Set color to Hot White/Cyan mix
          if (Math.random() > 0.3) {
             colAttr.setXYZ(i, 1, 1, 1); // White
          } else {
             colAttr.setXYZ(i, 0, 1, 1); // Cyan
          }
        }
        colAttr.needsUpdate = true;
        explodedRef.current = true;
        
        // Reset scale/rotation for physics phase
        meshRef.current.scale.set(1, 1, 1);
        meshRef.current.rotation.set(0,0,0);
        materialRef.current.size = 0.03;
      }

      // 2. Physics Update Loop
      const velocities = velocitiesRef.current;
      for (let i = 0; i < POINT_COUNT; i++) {
        const ix = i * 3;
        
        // Less Drag (0.95 vs 0.92) so they glide/drift longer
        velocities[ix] *= 0.95;
        velocities[ix+1] *= 0.95;
        velocities[ix+2] *= 0.95;

        const nx = posAttr.getX(i) + velocities[ix];
        const ny = posAttr.getY(i) + velocities[ix+1];
        const nz = posAttr.getZ(i) + velocities[ix+2];

        posAttr.setXYZ(i, nx, ny, nz);
      }
      posAttr.needsUpdate = true;
      
      // Rotate the entire explosion context ('Camera Perspective' shift)
      // Accelerate rotation slightly over time
      const progress = timerRef.current / EXPLODE_DURATION;
      const rotSpeed = 0.2 + (progress * 0.5); // 0.2 -> 0.7
      
      meshRef.current.rotation.y += delta * rotSpeed;
      meshRef.current.rotation.x += delta * (rotSpeed * 0.5);

      if (timerRef.current > EXPLODE_DURATION) {
        stateRef.current = 'CONDENSE';
        timerRef.current = 0;
      }
    }

    // --- PHASE D: CONDENSE (Spiral Implosion) ---
    else if (currentState === 'CONDENSE') {
      const CONDENSE_DURATION = 4.0; // More time to settle
      const ASSEMBLY_THRESHOLD = 0.005; // Strict "Complete Assembly" distance factor

      // Physics-based "Arrival" steering behavior
      const velocities = velocitiesRef.current;
      let maxDist = 0;
      
      for (let i = 0; i < POINT_COUNT; i++) {
        const ix = i * 3;
        
        const cx = posAttr.getX(i);
        const cy = posAttr.getY(i);
        const cz = posAttr.getZ(i);

        const tx = originalPositions[ix];
        const ty = originalPositions[ix+1];
        const tz = originalPositions[ix+2];

        // 1. Attraction Force (Spring)
        const dx = tx - cx;
        const dy = ty - cy;
        const dz = tz - cz;
        
        const distSq = dx*dx + dy*dy + dz*dz;
        const dist = Math.sqrt(distSq);

        // Force increases with distance (Standard Spring k*x)
        // Tune this: 0.5 is strong, 2.0 is stronger.
        const attractionStrength = 1.8; 
        
        // 2. Spiral/Tangent Force (Rotates around Y axis)
        // Cross product of Up(0,1,0) and Dir to center
        // This makes them orbit as they approach
        const spiralStrength = 0.8;
        // Tangent: (-dz, 0, dx) roughly, or (-z, 0, x) relative to center
        // Let's use position-based tangent for clear orbiting
        const spiralX = -cz * spiralStrength;
        const spiralY = 0; // Keep spiral flat-ish or let it follow sphere curve
        const spiralZ = cx * spiralStrength;

        // Apply Forces to Velocity
        // We use delta-independent logic mainly for simplicity here since frame rate is usually stable,
        // but `delta` should ideally be applied. For raw visual tweaking:
        
        // Add Attraction
        velocities[ix] += dx * attractionStrength * delta;
        velocities[ix+1] += dy * attractionStrength * delta;
        velocities[ix+2] += dz * attractionStrength * delta;

        // Add Spiral (only if far away, reduce as they get close so they can settle)
        const spiralFactor = Math.min(dist, 1.0); // fade out spiral near target
        velocities[ix] += spiralX * spiralFactor * delta;
        velocities[ix+1] += spiralY * spiralFactor * delta;
        velocities[ix+2] += spiralZ * spiralFactor * delta;

        // 3. Friction/Damping (Critical for stability)
        // Increase friction dramatically as they get very close to "catch" them in place
        // "Brake" factor for complete assembly
        const friction = dist < 0.1 ? 0.80 : 0.92; 

        velocities[ix] *= friction;
        velocities[ix+1] *= friction;
        velocities[ix+2] *= friction;

        // Update Position
        const nx = cx + velocities[ix];
        const ny = cy + velocities[ix+1];
        const nz = cz + velocities[ix+2];

        posAttr.setXYZ(i, nx, ny, nz);
        
        // Track max distance to decide when to snap
        if (dist > maxDist) maxDist = dist;

        // Visual Trail Effect Hack:
        // Stretch the "Color" or particle appearance based on velocity?
        // Since we can't stretch geometry, we brighten them when moving fast
        // simulating a "hot" entry.
        const speed = Math.sqrt(velocities[ix]**2 + velocities[ix+1]**2 + velocities[ix+2]**2);
        if (speed > 0.05) {
            colAttr.setXYZ(i, 1, 1, 1); // White hot streak
        } else {
            // Fade back to Cyan
            const oldR = colAttr.getX(i);
            const oldG = colAttr.getY(i);
            const oldB = colAttr.getZ(i);
            colAttr.setXYZ(
                i, 
                THREE.MathUtils.lerp(oldR, 0, 0.1),
                THREE.MathUtils.lerp(oldG, 0.94, 0.1),
                THREE.MathUtils.lerp(oldB, 1, 0.1)
            );
        }
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      
      // Accelerate rotation slightly to match the swirl
      const progress = timerRef.current / CONDENSE_DURATION;
      const currentRotSpeed = THREE.MathUtils.lerp(0.5, 0.1, progress); // Slow down Y spin
      meshRef.current.rotation.y += delta * currentRotSpeed;
      
      // Dampen X/Z rotation back to stable (0) so IDLE can take over cleanly
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, delta * 3.0);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, 0, delta * 3.0);

      // Transition condition
      // Allow them to spiral for a bit, don't snap too early
      const isCompleteAssembly = maxDist < ASSEMBLY_THRESHOLD; 
      const timeOut = timerRef.current > CONDENSE_DURATION;

      // Only finish if time is up AND they are practically assembled, OR if it's been way too long (safety)
      // This ensures we don't snap while still messy looking
      if (timeOut && (isCompleteAssembly || timerRef.current > CONDENSE_DURATION + 4.0)) {
        stateRef.current = 'IDLE';
        timerRef.current = 0;
        nextTransitionRef.current = Math.random() * 3 + 3;
        
        // Hard snap to perfect positions/colors
        for (let i = 0; i < POINT_COUNT; i++) {
             posAttr.setXYZ(i, originalPositions[i*3], originalPositions[i*3+1], originalPositions[i*3+2]);
             colAttr.setXYZ(i, 0, 0.94, 1);
        }
        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;
        
        // Ensure scale is unified
        meshRef.current.scale.set(1, 1, 1);
        materialRef.current.size = 0.02; // Reset size explicitly
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
