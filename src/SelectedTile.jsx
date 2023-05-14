import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

export default function SelectedTile({ model, baseTile, direction })
{

    const positionAdjustment = baseTile
        ? { y: 0 }
        : { y: 0.5 }

    let rotationAdjustment = 0

    if(direction === 'up') {
        rotationAdjustment = 0
    }
    if(direction === 'down') {
        rotationAdjustment = Math.PI
    }
    if(direction === 'left') {
        rotationAdjustment = Math.PI / 2
    }
    if(direction === 'right') {
        rotationAdjustment = 3 * Math.PI / 2
    }

    return <>

        <primitive 
            object={ model.scene.clone() } 
            rotation={[Math.PI, rotationAdjustment, 0]}
            position-y={positionAdjustment.y}
        />

    </>

}