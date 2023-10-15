import { useRef } from 'react'
import { DirectionalLightHelper, SpotLightHelper } from 'three'
import { Center, OrbitControls, useHelper } from '@react-three/drei'
import { Perf } from 'r3f-perf'

import Grid from './Grid.jsx'
import Lighting from './Lighting.jsx'
import Effects from './Effects.jsx'
import useGame from './stores/useGame.js'

export default function Experience()
{

    const light = useRef()
    
    return <>

        <Perf />
    
        <OrbitControls 
            makeDefault 
            maxPolarAngle={Math.PI / 2.05}
            minPolarAngle={Math.PI / 6}
        />

        <Effects />

        <Center>
            <Grid rows={7} columns={7} />
            <Lighting />
        </Center>

    </>

}
