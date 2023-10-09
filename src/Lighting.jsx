import { useEffect, useRef, useState } from 'react'
import { DirectionalLightHelper, SpotLightHelper, PointLightHelper } from 'three'
import { SpotLight } from '@react-three/drei'
import { useHelper } from '@react-three/drei'

import useGame from './stores/useGame'
import { useControls } from 'leva'

export default function Lighting()
{

    const foundClueOne = useGame((state) => state.foundClueOne)
    const foundClueTwo = useGame((state) => state.foundClueTwo)

    const [ startTileLight, setStartTileLight ] = useState(true)
    const [ clueOneLight, setClueOneLight ] = useState(false)
    const [ clueTwoLight, setClueTwoLight ] = useState(false)
    const [ endLight, setEndLight ] = useState(false)

    const turn = useGame((state) => state.turn)
    const [ lightDelay, setLightDelay ] = useState(0)

    useEffect(()=> {
        if(turn > 2 && foundClueOne === false) {
            setStartTileLight(false)
            setClueOneLight(true)
        }
        if(lightDelay > 15 && foundClueOne && foundClueTwo === false) {
            setClueTwoLight(true)
        }
        if(lightDelay > 20 && foundClueTwo) {
            setEndLight(true)
        }
        setLightDelay(lightDelay + 1)
    }, [ turn ])

    useEffect(()=> {
        if(foundClueOne) {
            setClueOneLight(false)           
            setLightDelay(0)
        }
    }, [ foundClueOne ])

    useEffect(()=> {
        if(foundClueTwo) {
            setClueTwoLight(false)
            setLightDelay(0)
        }
    }, [ foundClueTwo ])

    const hintLightOne = useRef()
    useHelper(hintLightOne, PointLightHelper, 1, 'hotpink')

    const { 
        LightingIntensity, 
        LightPosX, LightPosY, LightPosZ,
        LightDistance
     } = useControls({
        LightingIntensity: {
            value: 1,
            min: 0,
            max: 50,
            step: 0.1
        },
        LightPosX : {
            value: 5,
            min: -10,
            max: 10,
            step: 0.1
        },
        LightPosY : {
            value: 5,
            min: -10,
            max: 10,
            step: 0.1
        },
        LightPosZ : {
            value: 5,
            min: -10,
            max: 10,
            step: 0.1
        },
        LightDistance: {
            value: 2,
            min: 0,
            max: 50,
            step: 0.1
        }
    })

    return <>

        {/* Add a pointlight at 5, 2, 5 */}
        {startTileLight && <pointLight
            castShadow
            position={[0.0, 2.7, 5.4]}
            intensity={30}
            color={'green'}
            distance={3.2}
            // decay={LightDecay}
            // shadow-camera-near={ 1 }
            // shadow-camera-far={ 100 }
            // shadow-camera-top={ 100 }
            // shadow-camera-right={ 100 }
            // shadow-camera-bottom={ - 100 }
            // shadow-camera-left={ - 100 }
        />}

        {clueOneLight && <pointLight
            castShadow
            position={[4.4, 2.7, 3.4]}
            intensity={30}
            color={'green'}
            distance={3.2}
            // decay={LightDecay}
            // shadow-camera-near={ 1 }
            // shadow-camera-far={ 100 }
            // shadow-camera-top={ 100 }
            // shadow-camera-right={ 100 }
            // shadow-camera-bottom={ - 100 }
            // shadow-camera-left={ - 100 }
        />}

        {clueTwoLight && <pointLight
            castShadow
            ref={hintLightOne}
            position={[-4.5, 2.7, -5.7]}
            intensity={30}
            color={'purple'}
            distance={3.2}
            // decay={LightDecay}
            // shadow-camera-near={ 1 }
            // shadow-camera-far={ 100 }
            // shadow-camera-top={ 100 }
            // shadow-camera-right={ 100 }
            // shadow-camera-bottom={ - 100 }
            // shadow-camera-left={ - 100 }
        />}

        {endLight && <pointLight
            castShadow
            // ref={hintLightOne}
            position={[0.0, 2.7, -1.0]}
            intensity={30}
            color={'cyan'}
            distance={3.2}
            // decay={LightDecay}
            // shadow-camera-near={ 1 }
            // shadow-camera-far={ 100 }
            // shadow-camera-top={ 100 }
            // shadow-camera-right={ 100 }
            // shadow-camera-bottom={ - 100 }
            // shadow-camera-left={ - 100 }
        />}

        <ambientLight intensity={0.1} />

        <directionalLight
            castShadow 
            intensity={1.6}
            position={[3, 6, 3]}
            // make light go longer
            shadow-mapSize={ [ 1024, 1024 ] }
            // TODO - tweak shadow map stuff and get meshes casting shadows
            // shadow-mapSize={ [ 64, 64 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 100 }
            shadow-camera-top={ 100 }
            shadow-camera-right={ 100 }
            shadow-camera-bottom={ - 100 }
            shadow-camera-left={ - 100 }
        />  
    
    </>

}