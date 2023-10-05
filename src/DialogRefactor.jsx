import dialogNodes from './dialog/dialogNodes.json'
import dialog from './dialog/dialog.json'

import useGame from './stores/useGame'
import { useEffect, useState } from 'react'

export default function DialogRefactor()
{

    const tile = useGame((state) => state.tile)

    const foundClueOne = useGame((state) => state.foundClueOne)
    const foundClueTwo = useGame((state) => state.foundClueTwo)

    const setFoundClueOne = useGame((state) => state.setFoundClueOne)
    const setFoundClueTwo = useGame((state) => state.setFoundClueTwo)

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

            if (tile === 'tileDeadBook' && foundClueOne === false)
            {   
                setCurrentDialogue(dialog[dialogNodes['gameStateClueOne']])
                setShowDialog(true)
                setFoundClueOne(true)
            } else if((tile === "tileCornerBrickLeft" || tile === "tileCornerBrickRight") && foundClueTwo === false) {
                setCurrentDialogue(dialog[dialogNodes['gameStateClueTwo']])
                setShowDialog(true)
                setFoundClueTwo(true)
            }

        }, 1000)

    }, [tile])
    
    return <>

        {showDialog && <dialog className="dialog" open={showDialog}>
            <form onSubmit={handleEvent}>
                <p>{currentDialogue.text}</p>
                <button type='submit'>{currentDialogue.button.text}</button>
            </form>
        </dialog>}

    </>

}