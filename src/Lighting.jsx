import { useEffect, useRef, useState } from 'react'
import { useHelper } from '@react-three/drei'
import { DirectionalLightHelper, SpotLightHelper, PointLightHelper } from 'three'
import { useSpring } from '@react-spring/core'

import useGame from './stores/useGame'
import { useControls } from 'leva'

export default function Lighting()
{

    const brightness = useGame((state) => state.brightness)

    const foundClueOne = useGame((state) => state.foundClueOne)
    const foundClueTwo = useGame((state) => state.foundClueTwo)
    const foundClueThree = useGame((state) => state.foundClueThree)
    const clueSelection = useGame((state) => state.clueSelection)

    const health = useGame((state) => state.health)

    const [ startTileLight, setStartTileLight ] = useState(true)
    const [ clueOneLight, setClueOneLight ] = useState(false)
    const [ clueTwoLight, setClueTwoLight ] = useState(false)
    const [ clueThreeLight, setClueThreeLight ] = useState(false)
    const [ endLight, setEndLight ] = useState(false)

    const turn = useGame((state) => state.turn)
    const [ lightDelay, setLightDelay ] = useState(0)

    useEffect(()=> {
        if(turn > 0 && foundClueOne === false) {
            setStartTileLight(true)
            setClueOneLight(false)
            setEndLight(false)
        }
        if(turn > 2 && foundClueOne === false) {
            setStartTileLight(false)
            setClueOneLight(true)
        }
        // if(lightDelay > 15 && foundClueOne && foundClueTwo === false) {
        if(foundClueOne && foundClueTwo === false) {
            setClueTwoLight(true)
            setClueOneLight(false)
        }
        if(foundClueOne && foundClueTwo && foundClueThree === false) {
            setClueThreeLight(true)
            setClueTwoLight(false)
        }
        // if(lightDelay > 20 && foundClueTwo) {
        if(foundClueThree) {
            setEndLight(true)
            setClueThreeLight(false)
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

    useEffect(()=> {
        if(foundClueThree) {
            setClueTwoLight(false)
            setLightDelay(0)
        }
    }, [ foundClueThree ])

    const convertTileToX = (tile) => {
        return tile * 2.25
    }

    const convertTileToZ = (tile) => {
        return tile * 2.25
    }

    return <>

        {/* Add a pointlight at 5, 2, 5 */}
        {startTileLight && <pointLight
            castShadow
            position-x={convertTileToX(3)}
            position-y={2.7}
            position-z={convertTileToX(6)}
            // position={[0.0, 2.7, 5.4]}
            intensity={30}
            color={'Orange'}
            distance={3.2}
        />}

        {clueOneLight && <pointLight
            castShadow
            position-x={convertTileToX(clueSelection[0][0])}
            position-y={2.7}
            position-z={convertTileToZ(clueSelection[0][1])}
            // position={[4.4, 2.7, 3.4]}
            intensity={30}
            color={'green'}
            distance={3.2}
        />}

        {clueTwoLight && <pointLight
            castShadow
            position-x={convertTileToX(clueSelection[1][0])}
            position-y={2.7}
            position-z={convertTileToZ(clueSelection[1][1])}
            // position={[-4.5, 2.7, -5.7]}
            intensity={30}
            color={'purple'}
            distance={3.2}
        />}

        {clueThreeLight && <pointLight
            castShadow
            position-x={convertTileToX(clueSelection[2][0])}
            position-y={2.7}
            position-z={convertTileToZ(clueSelection[2][1])}
            // position={[-4.5, 2.7, -5.7]}
            intensity={30}
            color={'tomato'}
            distance={3.2}
        />}

        {endLight && <pointLight
            castShadow
            position-x={convertTileToX(clueSelection[3][0])}
            position-y={2.7}
            position-z={convertTileToZ(clueSelection[3][1])}
            position={[0.0, 2.7, -1.0]}
            intensity={30}
            color={'cyan'}
            distance={3.2}
        />}

        <ambientLight intensity={0.1} />

        <directionalLight
            castShadow 
            intensity={brightness}
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