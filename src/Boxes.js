
import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const tempBoxes = new THREE.Object3D()

export default function Boxes({ i, j })
{
    const material = new THREE.MeshLambertMaterial({ color: "red" })
    const boxesGeometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5)
    const ref = useRef()

    useFrame(({ clock }) => {
        let counter = 0
        const t = clock.oldTime * 0.001
        for (let x = 0; x < i; x++) {
          for (let z = 0; z < j; z++) {
            const id = counter++
            tempBoxes.position.set(i / 2 - x, 0, j / 2 - z)
            tempBoxes.rotation.y = t
            tempBoxes.updateMatrix()
            ref.current.setMatrixAt(id, tempBoxes.matrix)
          }
        }
        ref.current.instanceMatrix.needsUpdate = true
      })

    return <>   

        <instancedMesh ref={ref} args={[boxesGeometry, material, i * j]} />
            
    </>
}