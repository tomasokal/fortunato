import dialogNodes from './dialog/dialogNodes.json'
import dialog from './dialog/dialog.json'

import useGame from './stores/useGame'
import { useEffect, useState } from 'react'

export default function DialogRefactor()
{

    const tile = useGame((state) => state.tile)
    const phase = useGame((state) => state.phase)

    const foundClueOne = useGame((state) => state.foundClueOne)
    const foundClueTwo = useGame((state) => state.foundClueTwo)
    const foundBarrel = useGame((state) => state.foundBarrel)
    const foundBottle = useGame((state) => state.foundBottle)

    const setFoundClueOne = useGame((state) => state.setFoundClueOne)
    const setFoundClueTwo = useGame((state) => state.setFoundClueTwo)
    const setFoundBarrel = useGame((state) => state.setFoundBarrel)
    const setFoundBottle = useGame((state) => state.setFoundBottle)

    const health = useGame((state) => state.health)
    const setHealth = useGame((state) => state.setHealth)

    const turn = useGame((state) => state.turn)

    const [ showDialog, setShowDialog ] = useState(false)

    const [ currentDialogue, setCurrentDialogue ] = useState({})

    function handleEvent(event)
    {
        event.preventDefault()
        setShowDialog(false)
        setCurrentDialogue({})
    }

    useEffect(()=> {
        
        // Check if tile is tileDeadBook and whether clue has been found
        // If not, set clue found to true
        setTimeout(()=>{

            if(tile === 'tileStart') {

                if(phase==='playing') {
                    setCurrentDialogue(dialog[dialogNodes['gameStartTile']])
                    setShowDialog(true)
                }

            } else if (tile === 'tileDeadBook' && foundClueOne === false)
            {   
                setCurrentDialogue(dialog[dialogNodes['gameStateClueOne']])
                setShowDialog(true)
                setFoundClueOne(true)
            } else if((tile === "tileCornerBrickLeft" || tile === "tileCornerBrickRight") && foundClueTwo === false) {
                setCurrentDialogue(dialog[dialogNodes['gameStateClueTwo']])
                setShowDialog(true)
                setFoundClueTwo(true)
            } else if(tile==='tileBarrel') {

                if(turn - foundBarrel > 10) {
                    setHealth(health + 20)
                    setCurrentDialogue(dialog[dialogNodes['healthBarrelOne']])
                    setShowDialog(true)
                    setFoundBarrel(turn)
                } else {
                    setCurrentDialogue(dialog[dialogNodes['barrelTooSoon']])
                    setShowDialog(true)
                }
            } else if(tile=='tileBottle') {

                if(turn - foundBottle > 10) {
                    setHealth(health + 10)
                    setCurrentDialogue(dialog[dialogNodes['healthBottleOne']])
                    setShowDialog(true)
                    setFoundBottle(turn)
                } else {
                    setCurrentDialogue(dialog[dialogNodes['healthBottleTooSoon']])
                    setShowDialog(true)
                }

            } else if(turn === 2) {
                setCurrentDialogue(dialog[dialogNodes['turnTwoInstructions']])
                setShowDialog(true)
            }

        }, 1000)

    }, [tile, phase])
    
    return <>

        {showDialog && <dialog className="dialog" open={showDialog}>
            <form onSubmit={handleEvent}>
                <p>{currentDialogue.text}</p>
                <button type='submit'>{currentDialogue.button.text}</button>
            </form>
        </dialog>}

    </>

}