import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useControls } from 'leva'
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'

import useGame from './stores/useGame'

export default function Character({position, ...props}) {

    const modelPrim = useRef()

    const tile = useGame((state) => state.tile)
    const health = useGame((state)=> state.health)

    const jester = useGLTF('./jester/jester-imported-textured.gltf')
    const animations = useAnimations(jester.animations, jester.scene)

    const { animationName } = useControls({
        animationName: {options: animations.names }
    })

    const smoothedModelPosition = new THREE.Vector3(position[0], position[1], position[2])

    useFrame((state, delta)=> {

        modelPrim.current.position.lerp(smoothedModelPosition, delta * 1.25)

    })

    useEffect(()=> {
        const action = animations.actions['DrunkRun']
        const drinkAnimation = animations.actions['Drinking']
        const idleAnimation = animations.actions['DrunkIdle']
        const dyingAnimation = animations.actions['Dying']

        // const action = animations.actions[animationName]
        
        action
          .reset()
          .fadeIn(0.02)
          .play()

        // this will make the idle animation fade from the run animation after certain amount of time

            if(tile=='tileBarrel' || tile=='tileBottle') {
                drinkAnimation.reset().fadeIn(0.02).play()
                drinkAnimation.crossFadeFrom(action, 2.2)
            } else if(health < 1) {
                dyingAnimation.reset().fadeIn(0.02).play()
                dyingAnimation.crossFadeFrom(action, 2.2)
                dyingAnimation.clampWhenFinished = true
                dyingAnimation.setLoop(THREE.LoopOnce, 1)
            } else {
                idleAnimation.reset().fadeIn(0.02).play()
                idleAnimation.crossFadeFrom(action, 2.2)
            }


        return() => {
            action.fadeOut(0.5)
            drinkAnimation.fadeOut(0.5)
            idleAnimation.fadeOut(0.5)
            dyingAnimation.fadeOut(0.5)
        }

    }, [ position ])

    jester.scene.traverse(child => {
        child.castShadow = true
    })

    return <>
            <primitive 
                ref={modelPrim}
                {...props} 
                object={jester.scene} 
                castShadow
                scale={50}
            />
    </>
}