import { Center, useAnimations, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { useControls } from 'leva'

export default function Character(props) {

    const jester = useGLTF('./jester/jester-imported-textured.gltf')
    const animations = useAnimations(jester.animations, jester.scene)

    const { animationName } = useControls({
        animationName: {options: animations.names }
    })

    useEffect(()=> {
        const action = animations.actions[animationName]
        action
          .reset()
          .fadeIn(0.5)
          .play()
        
        return() => {
            action.fadeOut(0.5)
        }

    }, [ animationName ])

    return <>
        {/* <Center> */}
            <primitive 
                // position={ [ -2.5, 0, 2.5 ] } 
                {...props} 
                object={jester.scene} 
                // rotation-y={ 0.3 }
                scale={50}
            />
        {/* </Center> */}
    </>
}