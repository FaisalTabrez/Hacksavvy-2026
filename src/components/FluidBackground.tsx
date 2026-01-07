'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sparkles } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Fluid } from '@whatisjery/react-fluid-distortion'
import { EffectComposer } from '@react-three/postprocessing'

function StarfieldScene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    // 1. Rotate the entire group slowly
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.05
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }

    // 2. Subtle "floating" movement to the camera
    const time = state.clock.elapsedTime
    state.camera.position.x = Math.sin(time * 0.2) * 0.2
    state.camera.position.y = Math.cos(time * 0.15) * 0.2
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={groupRef}>
      {/* Stars: Radius 300, Depth 50, Count 5000, Factor 4, Saturation 0, Fade */}
      <Stars 
        radius={300} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
      />

      {/* Sparkles (Cyan Mix): Count 50 */}
      <Sparkles 
        color="#00f0ff"
        count={50}
        scale={10}
        size={4}
        speed={0.4}
        opacity={1}
      />

      {/* Sparkles (Purple Mix): Count 50 */}
      <Sparkles 
        color="#7c3aed"
        count={50}
        scale={10}
        size={4}
        speed={0.4}
        opacity={1}
      />
    </group>
  )
}

function AutoFluidController() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useFrame((state) => {
    if (isMobile) {
      // Simulate pointer movement in a figure-8 pattern
      const t = state.clock.getElapsedTime() * 0.5
      state.pointer.x = Math.sin(t) * 0.5
      state.pointer.y = Math.cos(t * 0.8) * 0.5
    }
  })

  return null
}

export default function FluidBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 bg-[#0a0a0a]">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance",
          alpha: false 
        }}
      >
        <StarfieldScene />
        <AutoFluidController />
        <EffectComposer>
          <Fluid 
            rainbow={false}
            backgroundColor="#000000"
            blending={THREE.AdditiveBlending}
            intensity={0.4}
            distortion={0.2}
            showBackground={false}
          />
        </EffectComposer>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50 pointer-events-none" />
    </div>
  )
}
