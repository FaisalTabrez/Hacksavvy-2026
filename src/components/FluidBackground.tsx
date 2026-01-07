'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Fluid } from '@whatisjery/react-fluid-distortion'
import { EffectComposer } from '@react-three/postprocessing'
import { Environment, MeshTransmissionMaterial } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'

function RotatingTorus() {
  const ref = useRef<any>(null)
  
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.005
      ref.current.rotation.y += 0.01
    }
  })

  return (
    <mesh position-z={-4} ref={ref}>
      <torusGeometry args={[2.8, 0.8, 100, 100]} />
      <MeshTransmissionMaterial 
        transmission={1}
        samples={1}
        anisotropy={0}
        chromaticAberration={0}
      />
    </mesh>
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
        <ambientLight intensity={10.1} />
        <directionalLight position={[2, 20, 10]} />
        <Environment preset="warehouse" background />
        <RotatingTorus />
        <AutoFluidController />
        <EffectComposer>
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
