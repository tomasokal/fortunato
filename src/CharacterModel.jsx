import { Center, useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useControls } from 'leva'
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'

export default function Character({position, ...props}) {

    const modelPrim = useRef()

    const jester = useGLTF('./jester/jester-imported-textured.gltf')
    const animations = useAnimations(jester.animations, jester.scene)

    const { animationName } = useControls({
        animationName: {options: animations.names }
    })

    const smoothedModelPosition = new THREE.Vector3(position[0], position[1], position[2])

    useFrame((state, delta)=> {

        modelPrim.current.position.lerp(smoothedModelPosition, 0.012)

    })

    useEffect(()=> {
        const action = animations.actions['DrunkRun']

        action
          .reset()
          .fadeIn(0.1)
          .play()

        // this will make the idle animation fade from the run animation after certain amount of time
        setTimeout(()=> {
            animations.actions['DrunkIdle'].play()
            animations.actions['DrunkIdle'].crossFadeFrom(animations.actions['DrunkRun'], 1)
        }, 400)
        
        return() => {
            action.fadeOut(0.5)
        }

    }, [ position ])

    return <>
        {/* <Center> */}
            <primitive 
                ref={modelPrim}
                {...props} 
                object={jester.scene} 
                // rotation-y={ 0.3 }
                scale={50}
            />
        {/* </Center> */}
    </>
}