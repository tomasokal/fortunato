import dialogNodes from './dialog/dialogNodes.json'
import dialog from './dialog/dialog.json'

import useGame from './stores/useGame'
import { useEffect, useState } from 'react'

export default function DialogRefactor()
{

    const tile = useGame((state) => state.tile)
    const phase = useGame((state) => state.phase)
    const win = useGame((state) => state.win)
    const lose = useGame((state) => state.lose)

    const foundClueOne = useGame((state) => state.foundClueOne)
    const foundClueTwo = useGame((state) => state.foundClueTwo)
    const foundClueThree = useGame((state) => state.foundClueThree)
    const foundBarrel = useGame((state) => state.foundBarrel)
    const foundBottle = useGame((state) => state.foundBottle)

    const setFoundClueOne = useGame((state) => state.setFoundClueOne)
    const setFoundClueTwo = useGame((state) => state.setFoundClueTwo)
    const setFoundClueThree = useGame((state) => state.setFoundClueThree)
    const setFoundBarrel = useGame((state) => state.setFoundBarrel)
    const setFoundBottle = useGame((state) => state.setFoundBottle)

    const health = useGame((state) => state.health)
    const setHealth = useGame((state) => state.setHealth)

    // specific stores to track if dialog is open in other places
    const dialogOpen = useGame((state) => state.dialogOpen)
    const setDialogOpen = useGame((state) => state.setDialogOpen)

    const turn = useGame((state) => state.turn)

    const [ showDialog, setShowDialog ] = useState(false)

    const [ currentDialogue, setCurrentDialogue ] = useState({})

    function handleEvent(event)
    {
        event.preventDefault()
        setShowDialog(false)
        setDialogOpen(false)
        setCurrentDialogue({})

        if(tile == 'tileEnd') {
            win()
        }
        if(health < 1) {
            lose()
        }
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
            } else if((tile === "tileClueTwo") && foundClueTwo === false) {
                setCurrentDialogue(dialog[dialogNodes['gameStateClueTwo']])
                setShowDialog(true)
                setFoundClueTwo(true)
            } else if(tile === 'tileClueThree' && foundClueThree === false) {
                setCurrentDialogue(dialog[dialogNodes['gameStateClueThree']])
                setShowDialog(true)
                setFoundClueThree(true)
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
            } else if(health<2 && phase!='ended') {
                setCurrentDialogue(dialog[dialogNodes['gameLost']])
                setShowDialog(true)
            } else if(tile==='tileEnd' && phase!='ended') {
                setCurrentDialogue(dialog[dialogNodes['gameWon']])
                setShowDialog(true)
            }

        }, 1000)

    }, [tile, phase])

    useEffect(()=> {
        if(showDialog) setDialogOpen(true)
    }, [showDialog])
    
    return <>

        {showDialog && <dialog className="dialog" open={showDialog}>
            <form onSubmit={handleEvent}>
                <p>{currentDialogue.text}</p>
                <button type='submit' autoFocus>{currentDialogue.button.text}</button>
            </form>
        </dialog>}

    </>

}