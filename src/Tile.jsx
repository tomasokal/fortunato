import { useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useSpring, animated, config } from '@react-spring/three'
import * as THREE from 'three'

export default function Tile({ positionX, positionZ })
{
    
    // Loading textures
    const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
        'Stylized_Stone_Floor_005_basecolor.jpg',
        'Stylized_Stone_Floor_005_height.png',
        'Stylized_Stone_Floor_005_normal.jpg',
        'Stylized_Stone_Floor_005_roughness.jpg',
        'Stylized_Stone_Floor_005_ambientOcclusion.jpg'
    ])

    // Creating a reference for the tile
    const tileRef = useRef()

    // Creating state for hover and active
    const [ hover, setHover ] = useState(false)
    const [ active, setActive ] = useState(false)

    // Springs:
    
        // Creating a spring for rotation
        const springRotation = useSpring({
            rotation: active ? [Math.PI, 0, 0] : [0, 0, 0],
            config: {
                mass: 1,
                tension: 210,
                friction: 20,
                precision: 0.01,
                velocity: 0,
            }
        })

        // Creating a spring for position
        const springPosition = useSpring({
            position: hover | active ? 0.5 : 0,
            config: {
                mass: 1,
                tension: 210,
                friction: 20,
                precision: 0.01,
                velocity: -0.005,
            }
        })

    // Creating a function for handling click, pointer over, and pointer out
        const handleClick = (e) => {
            e.stopPropagation()
            setActive(!active)
        }

        const handlePointerOver = (e) => {
            e.stopPropagation()
            setHover(true)
        }

        const handlePointerOut = (e) => {
            e.stopPropagation()
            setHover(false)
        }

    return <>

        <animated.mesh 
            ref={tileRef}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            position-y={springPosition.position}
            position-x={positionX}
            position-z={positionZ}
            rotation={springRotation.rotation}
        >
            <boxBufferGeometry args={[2, 1, 2, 10, 10, 10]} />
            <meshStandardMaterial
                displacementScale={1}
                map={colorMap}
                bumpMap={displacementMap}
                normalMap={normalMap}
                roughnessMap={roughnessMap}
                aoMap={aoMap}
            />
        </animated.mesh>

    </>

}