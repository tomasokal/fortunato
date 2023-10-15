import { useRef } from 'react'
import { DirectionalLightHelper, SpotLightHelper } from 'three'
import { Center, OrbitControls, useHelper } from '@react-three/drei'

import Grid from './Grid.jsx'
import Lighting from './Lighting.jsx'
import Effects from './Effects.jsx'

export default function Experience()
{

    const light = useRef()
    
    return <>
    
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
