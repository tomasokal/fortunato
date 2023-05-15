import { useEffect, useRef, useState } from 'react'

export default function PlayerCharacter({ primaryTile })
{

    // Set up states and refs
    const playerRef = useRef()
    const [ playerPosition, setPlayerPosition ] = useState([3 * 2.25, 2.5, 7 * 2.25])

    // When primaryTile updates, update the playerPosition state
    useEffect(() => {
        setPlayerPosition([primaryTile[0] * 2.25, 2.5, primaryTile[1] * 2.25])
    }, [primaryTile])

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