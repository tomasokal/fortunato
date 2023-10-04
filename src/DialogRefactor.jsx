import dialogNodes from './dialog/dialogNodes.json'
import dialog from './dialog/dialog.json'

export default function DialogRefactor()
{

    const currentDialogue = dialog[dialogNodes['gameStateClueTwo']]

    function handleEvent(event)
    {
        event.preventDefault()
        // console.log('event handled:', currentDialogue.button.action)
        currentDialogue.button.action()
    }

    return <>

        <dialog className="dialog" open={true}>
            <form onSubmit={handleEvent}>
                <p>{currentDialogue.text}</p>
                <button type='submit'>{currentDialogue.button.text}</button>
            </form>
        </dialog>

    </>

}