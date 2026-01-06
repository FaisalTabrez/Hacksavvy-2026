'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Fluid } from '@whatisjery/react-fluid-distortion'
import { EffectComposer } from '@react-three/postprocessing'
import { Environment } from '@react-three/drei'
import { useEffect, useState } from 'react'

function AutoFluidController() {
  const { pointer, toggle } = useThree()
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
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={`fixed inset-0 z-0 ${isMobile ? 'pointer-events-none' : ''}`}>
      <Canvas style={{ background: '#000000' }}>
        <Environment preset="warehouse" background />
        <AutoFluidController />
        <EffectComposer>
          <Fluid 
            rainbow={true}
            intensity={0.4}
            distortion={0.5}
            blend={5}
            showBackground={false}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
