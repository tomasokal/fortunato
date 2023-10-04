import dialogNodes from './dialog/dialogNodes.json'
import dialog from './dialog/dialog.json'

export default function DialogRefactor()
{

    const currentDialogue = dialog[dialogNodes['gameStateClueTwo']]

    function handleEvent(event)
    {
        event.preventDefault()

    }

    // Subscribe to game state tile
    // When on game state tile, run handleEvent using the event
    // This should pass text, button text, and set that game state to yes
    
    return <>

        <dialog className="dialog" open={true}>
            <form onSubmit={handleEvent}>
                <p>{currentDialogue.text}</p>
                <button type='submit'>{currentDialogue.button.text}</button>
            </form>
        </dialog>

    </>

}