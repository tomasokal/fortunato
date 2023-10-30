import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { a, useSpring } from '@react-spring/three'
import { useControls } from 'leva'
import { DirectionalLightHelper } from 'three'
import { useHelper } from '@react-three/drei'
import * as THREE from 'three'

import useGame from './stores/useGame'

export default function Lighting()
{

    // Set up usecontrols for x, y, z position of light
    const { myFooColor, intensity } = useControls({
        // add color picker
        myFooColor: '#3e2ed1',
        intensity: 0.3
    })

    // set up ref to light and add directional light helper
    const light = useRef()
    // useHelper(light, DirectionalLightHelper, 0.2, 'cyan')

    // Global ambient light
    const brightness = useGame((state) => state.brightness)

    // State for which clues have been found
    const foundClueOne = useGame((state) => state.foundClueOne)
    const foundClueTwo = useGame((state) => state.foundClueTwo)
    const foundClueThree = useGame((state) => state.foundClueThree)

    // State for which clues have been seen
    const sawClueTwo = useGame((state) => state.sawClueTwo)
    const sawClueThree = useGame((state) => state.sawClueThree)
    const sawEnd = useGame((state) => state.sawEnd)

    // State for objective layout
    const clueSelection = useGame((state) => state.clueSelection)

    // State for light intensity for each clue
    const [ startTileLight, setStartTileLight ] = useState(true)
    const [ clueOneLight, setClueOneLight ] = useState(false)
    const [ clueTwoLight, setClueTwoLight ] = useState(false)
    const [ clueThreeLight, setClueThreeLight ] = useState(false)
    const [ endLight, setEndLight ] = useState(false)

    // State for turn increments
    const turn = useGame((state) => state.turn)
    const [ lightDelay, setLightDelay ] = useState(0)

    // State for pulsing light effect
    const [ lightPulse, setLightPulse ] = useState(-10)

    // Set up spring for light intensity for each clue
    const { lightStartIntensity } = useSpring({
        lightStartIntensity: startTileLight ? lightPulse + 30 : 0,
        config: { mass: 1, tension: 280, friction: 60, precision: 0.001, velocity: 0 }
    })

    const { lightOneIntensity } = useSpring({
        lightOneIntensity: clueOneLight ? lightPulse + 30 : 0,
        config: { mass: 1, tension: 280, friction: 60, precision: 0.001, velocity: 0 }
    })

    const { lightTwoIntensity } = useSpring({
        lightTwoIntensity: clueTwoLight ? lightPulse + 30 : 0,
        config: { mass: 1, tension: 280, friction: 60, precision: 0.001, velocity: 0 }
    })

    const { lightThreeIntensity } = useSpring({
        lightThreeIntensity: clueThreeLight ? lightPulse + 30 : 0,
        config: { mass: 1, tension: 280, friction: 60, precision: 0.001, velocity: 0 }
    })

    const { lightEndIntensity } = useSpring({
        lightEndIntensity: endLight ? lightPulse + 30 : 0,
        config: { mass: 1, tension: 280, friction: 60, precision: 0.001, velocity: 0 }
    })

    // On every turn, increment the light delay
    // If second turn, also turn on first clue light and turn off start tile light
    useEffect(()=> {

        setLightDelay(lightDelay + 1)

        // Make sure to turn off start tile light on turn 1 which is actually turn 2
        if(turn > 2 && foundClueOne === false) {
            setStartTileLight(false)
            setClueOneLight(true)
        }

    }, [ turn ])

    // Turn off clue lights when they are found
    // Reset light delay to 0
    // Clue one
    useEffect(()=> {
        if(foundClueOne) {
            setClueOneLight(false)
            setLightDelay(0)
        }
    }, [ foundClueOne ])

    // Clue two
    useEffect(()=> {
        if(foundClueTwo) {
            setClueTwoLight(false)
            setLightDelay(0)
        }
    }, [ foundClueTwo ])

    // Clue three
    useEffect(()=> {
        if(foundClueThree) {
            setClueThreeLight(false)
            setLightDelay(0)
        }
    }, [ foundClueThree ])

    // When clue tile is seen by player, turn on light
    // Also turn on if light delay is greater than 4
    // This corresponds to turn 5
    useEffect(()=> {
        if((sawClueTwo | lightDelay > 4) && foundClueOne && foundClueTwo === false) {
            setClueTwoLight(true)
        }
    }, [ sawClueTwo, lightDelay ])

    // When clue tile is seen by player, turn on light
    // Also turn on if light delay is greater than 9
    // This corresponds to turn 10
    useEffect(()=> {
        if((sawClueThree | lightDelay > 9) && foundClueTwo && foundClueThree === false) {
            setClueThreeLight(true)
        }
    }, [ sawClueThree, lightDelay ])

    // When clue tile is seen by player, turn on light
    // Also turn on if light delay is greater than 14
    // This corresponds to turn 15
    useEffect(()=> {
        if((sawEnd | lightDelay > 14) && foundClueThree) {
            setEndLight(true)
        }
    }, [ sawEnd, lightDelay ])

    // Pulsing light effect
    useFrame((state, delta)=> {
        const newVal = -10 * Math.sin(2 * state.clock.elapsedTime)
        setLightPulse(newVal)
    })

    // Functions to convert tile coordinates to world coordinates

        // X is the horizontal axis
        const convertTileToX = (tile) => {
            return tile * 2.25
        }

        // Z is the vertical axis
        const convertTileToZ = (tile) => {
            return tile * 2.25
        }

    return <>

        <a.pointLight
            // castShadow
            position-x={convertTileToX(3)}
            position-y={2.7}
            position-z={convertTileToX(6)}
            intensity={lightStartIntensity}
            color={'orange'}
            distance={3.2}
        />

        <a.pointLight
            // castShadow
            position-x={clueSelection[0] ? convertTileToX(clueSelection[0][0]) : 0}
            position-y={2.7}
            position-z={clueSelection[0] ? convertTileToZ(clueSelection[0][1]) : 0}
            intensity={lightOneIntensity}
            color={'green'}
            distance={3.2}
        />

        <a.pointLight
            // castShadow
            position-x={clueSelection[1] ? convertTileToX(clueSelection[1][0]) : 0}
            position-y={2.7}
            position-z={clueSelection[1] ? convertTileToZ(clueSelection[1][1]) : 0}
            intensity={lightTwoIntensity}
            color={'purple'}
            distance={3.2}
        />

        <a.pointLight
            // castShadow
            position-x={clueSelection[2] ? convertTileToX(clueSelection[2][0]) : 0}
            position-y={2.7}
            position-z={clueSelection[2] ? convertTileToZ(clueSelection[2][1]) : 0}
            intensity={lightThreeIntensity}
            color={'tomato'}
            distance={3.2}
        />

        <a.pointLight
            // castShadow
            position-x={clueSelection[3] ? convertTileToX(clueSelection[3][0]) : 0}
            position-y={2.7}
            position-z={clueSelection[3] ? convertTileToZ(clueSelection[3][1]) : 0}
            intensity={lightEndIntensity}
            color={'cyan'}
            distance={3.2}
        />

        <ambientLight intensity={0.1} />

        <directionalLight
            ref={light}
            castShadow 
            color={'white'}
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

        <directionalLight
            color={'#3e2ed1'}
            intensity={0.3}
            position-x={convertTileToX(3)}
            position-y={-2}
            position-z={convertTileToZ(9)}
        />

        <directionalLight
            color={'#3e2ed1'}
            intensity={0.3}
            position-x={convertTileToX(3)}
            position-y={-2}
            position-z={convertTileToZ(-3)}
        />

        <directionalLight
            color={'#3e2ed1'}
            intensity={0.3}
            position-x={convertTileToX(9)}
            position-y={-2}
            position-z={convertTileToZ(3)}
        />

        <directionalLight
            color={'#3e2ed1'}
            intensity={0.3}
            position-x={convertTileToX(-3)}
            position-y={-2}
            position-z={convertTileToZ(-3)}
        />
    
    </>

}