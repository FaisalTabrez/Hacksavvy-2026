'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Fluid } from '@whatisjery/react-fluid-distortion'
import { EffectComposer } from '@react-three/postprocessing'
import { Environment, Torus } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'

function RotatingTorus() {
  const ref = useRef<any>(null)
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.2
      ref.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Torus ref={ref} args={[1, 0.4, 32, 100]}>
      <meshStandardMaterial 
        color="#8B5CF6"
        roughness={0.1}
        metalness={0.8}
        emissive="#4C1D95"
        emissiveIntensity={0.5}
      />
    </Torus>
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
  const [isMobile, setIsMobile] = useState(true) // Default to true (safe for mobile scroll)

  useEffect(() => {
    // Check detection on mount to switch to desktop mode if applicable
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={`fixed inset-0 z-0 ${isMobile ? 'pointer-events-none' : ''}`}>
      <Canvas style={{ background: '#000000' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Environment preset="city" />
        <RotatingTorus />
        <AutoFluidController />
        <EffectComposer disableNormalPass multisampling={0}>
          <Fluid 
            rainbow={true}
            intensity={0.4}
            distortion={0.2}
            showBackground={false}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
