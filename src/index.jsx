import './style.css'

import { StrictMode, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { createRoot } from 'react-dom/client'

import Experience from './Experience'
import Interface from './Interface.jsx'
import AudioPlayer from './AudioPlayer.jsx'

const root = createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
        <Canvas
            shadows
            camera={{
                fov: 45,
                near: 0.1,
                far: 100,
                position: [0, 12, 18]
            }}
        >
            <Suspense fallback={null}>
                <Experience />
            </Suspense>
        </Canvas>
        <Interface />
        <AudioPlayer />
    </StrictMode>
)