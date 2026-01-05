'use client'

import { Canvas } from '@react-three/fiber'
import { Fluid } from '@whatisjery/react-fluid-distortion'

export default function FluidBackground() {
  return (
    <div className="absolute inset-0 -z-10 opacity-50">
      <Canvas style={{ width: '100%', height: '100%' }}>
        <Fluid />
      </Canvas>
    </div>
  )
}
