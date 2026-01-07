'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Fluid } from '@whatisjery/react-fluid-distortion'
import { EffectComposer } from '@react-three/postprocessing'

function ParticleSphere() {
  const pointsRef = useRef<any>(null)
  
  const originalPositions = useMemo(() => {
    const geometry = new THREE.SphereGeometry(1.8, 64, 64)
    return Float32Array.from(geometry.attributes.position.array)
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.1
      pointsRef.current.rotation.z = time * 0.05
      
      const positions = pointsRef.current.geometry.attributes.position.array
      
      for (let i = 0; i < originalPositions.length; i += 3) {
        const x = originalPositions[i]
        const y = originalPositions[i + 1]
        const z = originalPositions[i + 2]

        // Normalize
        const len = Math.sqrt(x*x + y*y + z*z)
        const nx = x/len
        const ny = y/len
        const nz = z/len

        // Sine wave distortion
        const wave = Math.sin(time * 2 + x * 3 + y * 2) * 0.1 + Math.cos(time * 1.5 + z * 3) * 0.1
        
        positions[i] = x + nx * wave
        positions[i + 1] = y + ny * wave
        positions[i + 2] = z + nz * wave
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <sphereGeometry args={[1.8, 64, 64]} />
      <pointsMaterial
        size={0.02}
        color="#00f0ff"
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
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
        camera={{ position: [0, 0, 4.5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance",
          alpha: false 
        }}
      >
        <ParticleSphere />
        <AutoFluidController />
        <EffectComposer>
          <Fluid 
            rainbow={false}
            backgroundColor="#000000"
            intensity={0.4}
            distortion={0.1}
            showBackground={false}
          />
        </EffectComposer>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50 pointer-events-none" />
    </div>
  )
}
