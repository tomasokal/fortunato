import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

export default function SelectedTile({ model, baseTile })
{

    const positionAdjustment = baseTile
        ? { y: 0 }
        : { y: 0.5 }

    return <>

        <primitive 
            object={ model.scene.clone() } 
            rotation={[Math.PI, 0, 0]}
            position-y={positionAdjustment.y}
        />

    </>

}