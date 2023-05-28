import { useEffect, useRef, useState } from 'react'

import useGame from "./stores/useGame.js"

export default function PlayerCharacter({ primaryTile })
{

    // Set up states and refs
    const playerRef = useRef()
    const [ playerPosition, setPlayerPosition ] = useState([3 * 2.25, 2.5, 7 * 2.25])

    // When primaryTile updates, update the playerPosition state
    useEffect(() => {
        setPlayerPosition([primaryTile[0] * 2.25, 2.5, primaryTile[1] * 2.25])
    }, [primaryTile])

    // Import useGame hook and use it to get the health state
    // Also import message state and setMessage function
    const health = useGame((state) => state.health)
    const message = useGame((state) => state.message)
    const setMessage = useGame((state) => state.setMessage)

    // Check health and when health reaches 0, update message state
    useEffect(() => {
        if(health === 0) {
            setMessage('Your health reached 0 and you are dead. Please restart :)')
        }
    }, [health])

    return <>

        <mesh
            castShadow
            ref={playerRef}
            position={playerPosition}
        >
            <sphereBufferGeometry args={[0.5, 32, 32]} />
        </mesh>
    
    </>
}