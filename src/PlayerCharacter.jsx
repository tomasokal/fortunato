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
    const tile = useGame((state) => state.tile)

    const shownMessageCorner = useGame((state) => state.shownMessageCorner)
    const setShownMessageCorner = useGame((state) => state.setShownMessageCorner)

    // Check health and when health reaches 0, update message state
    useEffect(() => {
        if(health === 0) {
            setMessage('End of the game.')
        }
    }, [health])

    // Tile type dialog
    useEffect(() => {
        if(tile === "tileCornerBrickLeft" || tile === "tileCornerBrickRight") {
            if(!shownMessageCorner) {
                setMessage('Fortunato stumbles upon an alcove sealed shut, its inhabitant forever lost to the depths of darkness. Within this chamber, he hears the cries and murmurs of a soul condemned to eternal torment. He recoils from the pitiable pleas, unsure whether the voices comes from the walls or echo from within his own troubled psyche.')
                setShownMessageCorner(shownMessageCorner)
            } else {
                setMessage('Fortunato presses on past the cries of the condemned.')
            }
        }
    }, [tile])

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