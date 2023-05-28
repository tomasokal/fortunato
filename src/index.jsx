import './style.css'

import { StrictMode, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { createRoot } from 'react-dom/client'

import Experience from './Experience'
import Interface from './Interface.jsx'
import Dialog from './Dialog.jsx'

const root = createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
        <Canvas
            shadows
            shadowMap
            shadowCameraNear={0.5}
            shadowCameraFar={50}
            camera={ {
                fov: 45,
                near: 0.1,
                far: 100,
                position: [ 0, 15, 20 ]
            } }>
            <Suspense fallback={null}>
                <Experience />
            </Suspense>  
        </Canvas>
        <Interface />
        <Dialog />
    </StrictMode>
)