import { useEffect, useRef, useState } from 'react'

import Character from "./CharacterModel.jsx"

import useGame from "./stores/useGame.js"

export default function PlayerCharacter({ primaryTile })
{

    // Set up states and refs
    const playerRef = useRef()
    const [ playerPosition, setPlayerPosition ] = useState([3 * 2.25, 1, 7 * 2.25])

    const [ playerRotation, setPlayerRotation ] = useState(Math.PI)

    const [ playerTile, setPlayerTile ] = useState([0, 0])

    const tile = useGame((state) => state.tile)
    const dialogOpen = useGame((state) => state.dialogOpen)

    // When primaryTile updates, update the playerPosition state
    // also update the rotation of the play based on comparision between current and previous tile
    useEffect(() => {
        setPlayerPosition([primaryTile[0] * 2.25, 1, primaryTile[1] * 2.25])

        let xDiff = primaryTile[0] - playerTile[0]
        let yDiff = primaryTile[1] - playerTile[1]

        if(!xDiff==0) { 
            if(Math.abs(xDiff)==1) setPlayerRotation(Math.PI / 2 * xDiff)
        } else if(!yDiff==0) {
            setPlayerRotation(yDiff==1 ? 0 : Math.PI)
        }

        setPlayerTile(primaryTile)

    }, [primaryTile])

    // Import useGame hook and use it to get the health state
    // Also import message state and setMessage function
    const health = useGame((state) => state.health)
    const message = useGame((state) => state.message)
    const setMessage = useGame((state) => state.setMessage)

    // Check health and when health reaches 0, update message state
    useEffect(() => {

        if(health === 0) {
            // TODO -- any death related things here ?
        }

    }, [health])

    useEffect(()=> {
        setTimeout(()=> {
            // TODO -- game logic based on dialog being closed
        }, 1000)
    }, [tile, dialogOpen])

    return <>

        <Character position={playerPosition} rotation-y={playerRotation} />
    
    </>
}