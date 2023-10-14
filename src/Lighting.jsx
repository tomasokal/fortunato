import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import useGame from './stores/useGame'

export default function Lighting()
{

    const brightness = useGame((state) => state.brightness)

    const foundClueOne = useGame((state) => state.foundClueOne)
    const foundClueTwo = useGame((state) => state.foundClueTwo)
    const foundClueThree = useGame((state) => state.foundClueThree)

    const sawClueTwo = useGame((state) => state.sawClueTwo)
    const sawClueThree = useGame((state) => state.sawClueThree)
    const sawEnd = useGame((state) => state.sawEnd)

    const clueSelection = useGame((state) => state.clueSelection)

    const health = useGame((state) => state.health)

    const [ startTileLight, setStartTileLight ] = useState(true)
    const [ clueOneLight, setClueOneLight ] = useState(false)
    const [ clueTwoLight, setClueTwoLight ] = useState(false)
    const [ clueThreeLight, setClueThreeLight ] = useState(false)
    const [ endLight, setEndLight ] = useState(false)

    const turn = useGame((state) => state.turn)
    const [ lightDelay, setLightDelay ] = useState(0)

    const clueOneLightRef = useRef()

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
        if((sawClueTwo | lightDelay > 10) && foundClueOne && foundClueTwo === false) {
            setClueTwoLight(true)
            setClueOneLight(false)
        }
        if((sawClueThree | lightDelay > 15) && foundClueOne && foundClueTwo && foundClueThree === false) {
            setClueThreeLight(true)
            setClueTwoLight(false)
        }
        if((sawEnd | lightDelay > 20) && foundClueThree) {
            setEndLight(true)
            setClueThreeLight(false)
        }
        setLightDelay(lightDelay + 1)
    // }, [ turn, sawClueTwo, sawClueThree, sawEnd ])
    }, [ turn])

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
            setClueThreeLight(false)
            setLightDelay(0)
        }
    }, [ foundClueThree ])

    const convertTileToX = (tile) => {
        return tile * 2.25
    }

    const convertTileToZ = (tile) => {
        return tile * 2.25
    }

    // useFrame((state, delta) => {
    //     if(clueOneLightRef.current) {
    //         clueOneLightRef.current.intensity = THREE.MathUtils.lerp(
    //             clueOneLightRef.current.intensity,
    //             clueOneLight ? 30 : 0,
    //             0.01
    //         )
    //     }
    // })

    return <>

        {/* Add a pointlight at 5, 2, 5 */}
        {startTileLight && <pointLight
            castShadow
            position-x={convertTileToX(3)}
            position-y={2.7}
            position-z={convertTileToX(6)}
            intensity={30}
            color={'orange'}
            distance={3.2}
        />}

        {clueOneLight && <pointLight
            ref={clueOneLightRef}
            castShadow
            position-x={convertTileToX(clueSelection[0][0])}
            position-y={2.7}
            position-z={convertTileToZ(clueSelection[0][1])}
            intensity={30}
            color={'green'}
            distance={3.2}
        />}

        {clueTwoLight && <pointLight
            castShadow
            position-x={convertTileToX(clueSelection[1][0])}
            position-y={2.7}
            position-z={convertTileToZ(clueSelection[1][1])}
            intensity={30}
            color={'purple'}
            distance={3.2}
        />}

        {clueThreeLight && <pointLight
            castShadow
            position-x={convertTileToX(clueSelection[2][0])}
            position-y={2.7}
            position-z={convertTileToZ(clueSelection[2][1])}
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
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 100 }
            shadow-camera-top={ 100 }
            shadow-camera-right={ 100 }
            shadow-camera-bottom={ - 100 }
            shadow-camera-left={ - 100 }
        />  
    
    </>

}