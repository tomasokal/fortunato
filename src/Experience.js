import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

import useIcon from './stores/useIcon'
import Lights from './Lights'
import Boxes from './Boxes'

export default function Experience()
{
  const ref = useRef()

  const clicked = useIcon((state) => state.iconRotate)

  return <>   

    <OrbitControls />
    <Lights />

    <Boxes i={350} j={350} />
          
  </>
}