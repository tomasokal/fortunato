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
        console.log('Health:', health)
    }, [primaryTile])

    // Import useGame hook and use it to get the health state
    // Also import message state and setMessage function
    const health = useGame((state) => state.health)
    const message = useGame((state) => state.message)
    const setMessage = useGame((state) => state.setMessage)
    const tile = useGame((state) => state.tile)

    const shownMessageCorner = useGame((state) => state.shownMessageCorner)
    const setShownMessageCorner = useGame((state) => state.setShownMessageCorner)

    const shownBookCase = useGame((state) => state.shownBookCase)
    const setShownBookCase = useGame((state) => state.setShownBookCase)

    const foundClue = useGame((state) => state.foundClue)
    const setFoundClue = useGame((state) => state.setFoundClue)

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

        if(tile === "tileDeadBook") {
            if(!shownBookCase) {
                setMessage('Fortunato stumbles upon a series of books. He reaches out to grasp them, hoping to find solace in their pages. But as he opens them, his heart sinks. The words upon the pages writhe and shift, the letters dancing and rearranging themselves. They form a language that is alien to him, something beyond human comprehension. Though he cannot read the words, he hears the voices of the books whispering to him, guiding him towards an unseen path.')
                setShownBookCase(shownBookCase)
                setFoundClue(foundClue)
            } else {
                setMessage('The voices grow louder and more urgent, urging him onward.')
            }
        }

        if(tile === "tileEnd") {
            setMessage('At last, he stumbles upon a staircase, bathed in an eerie glow. The voices fall silent, leaving Fortunato standing before the enigmatic staircase. A surge of uncertainty grips him.')
        }

        if(tile === 'tileBottle') {
            setMessage('Fortunato stumbles upon a bottle of Amontillado. Clinging to the only solace he can find in this stygian abyss, he drinks deeply, seeking respite from the encroaching shadows that gnaw at his sanity. The wine fuels his resolve, granting him a momentary reprieve from the mounting terror.')
        }

        if(tile === 'tileBarrel') {
            setMessage('Amidst the shifting catacombs, Fortunatos sees a hidden alcove, veiled in darkness. There, in the gloom, barrels of Amontillado stand before him, their wooden exteriors weathered and worn. A fragile smile dances upon his lips as he realizes the temporary respite that lies within his grasp. With trembling hands, he reaches out to uncork one of the barrels, the sweet aroma of the prized wine wafting to his nostrils.')
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