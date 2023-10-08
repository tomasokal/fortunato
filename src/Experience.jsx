import { useRef } from 'react'
import { DirectionalLightHelper, SpotLightHelper } from 'three'
import { Center, OrbitControls, useHelper } from '@react-three/drei'

import Grid from './Grid.jsx'
import Lighting from './Lighting.jsx'
import useGame from './stores/useGame.js'

export default function Experience()
{

    const light = useRef()
    
    return <>
    
        <OrbitControls makeDefault />

        <Lighting />

        <Center>
            <Grid rows={7} columns={7} />
        </Center>

    </>

}
