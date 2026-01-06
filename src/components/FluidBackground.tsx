'use client'

import { Canvas } from '@react-three/fiber'
import { Fluid } from '@whatisjery/react-fluid-distortion'
import { EffectComposer } from '@react-three/postprocessing'

export default function FluidBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas style={{ background: '#000000' }}>
        <EffectComposer>
          <Fluid 
            rainbow={true}
            intensity={0.4}
            distortion={0.5}
            backgroundColor="#000000"
            blend={5}
            showBackground={true}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
