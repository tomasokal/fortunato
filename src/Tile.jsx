import { useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useSpring, animated, config } from '@react-spring/three'
import * as THREE from 'three'

export default function Tile()
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

    const [ hover, setHover ] = useState(false)
    const [ active, setActive ] = useState(false)

    const { scale } = useSpring({
        scale: active ? 1.5 : 1,
        config: config.wobbly,
      })

    return <>

        <animated.mesh 
            ref={tileRef}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            scale={scale}
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