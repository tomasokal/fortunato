import { Center, OrbitControls, useHelper } from '@react-three/drei'


import Interface from './Interface.jsx'
import Grid from './Grid.jsx'
import { DirectionalLightHelper } from 'three'
import { useRef } from 'react'

export default function Experience()
{

    const light = useRef()
    useHelper(light, DirectionalLightHelper, 10)
    
    return <>
    
        <OrbitControls makeDefault />

        <ambientLight intensity={1.2} />

        <directionalLight ref={light} 
            castShadow 
            intensity={2}
            position={[3, 6, 3]}
            // TODO - tweak shadow map stuff and get meshes casting shadows
            // shadow-mapSize={ [ 64, 64 ] }
            // shadow-camera-near={ 1 }
            // shadow-camera-far={ 100 }
            // shadow-camera-top={ 100 }
            // shadow-camera-right={ 100 }
            // shadow-camera-bottom={ - 100 }
            // shadow-camera-left={ - 100 }
        />  

        <Interface />

        <Center>
            <Grid rows={7} columns={7} />
        </Center>

    </>

}
