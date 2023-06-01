import { useEffect, useState } from 'react'

import useGame from "./stores/useGame.js"

import './styles/dialog.css'

export default function Dialog()
{

    // Import the useGame hook and use it to get the message state and setMessage function
    const message = useGame((state) => state.message)
    const setMessage = useGame((state) => state.setMessage)

    // Import the useGame hook and use it to get the restart function
    const restart = useGame((state) => state.restart)

    // Create a state for the message and button label
    const [ dialogMessage, setDialogMessage ] = useState('')
    const [ buttonLabel, setButtonLabel ] = useState('OK')

    // Create a state for whether the dialog is open or not
    const [ dialogOpen, setDialogOpen ] = useState(false)

    // Create a function that will handle the event when button is pressed
    function handleEvent(event) {

        // Prevent default behavior
        event.preventDefault()

        // Make dialog disappear
        setDialogOpen(false)

        // Clear the message
        useGame.setState({ message: '' })

        if(buttonLabel === '...') return

        if(buttonLabel === 'OK') {
            restart()
        }

    }

    // Check when message updates and update the message and button label states
    useEffect(() => {

        // Early return if message is empty
        if(message === '') return

        // Update the message and button label states
        setDialogMessage(message)
        if (message === 'End of the game.') {
            setButtonLabel('OK')
        } else {
            setButtonLabel('...')
        }

        // Show dialog by updating 
        setDialogOpen(true)

    }, [message])

    return <>

        {/* Return a dialog div where there is a message and a button with a label that when pressed will remove dialog */}
        <dialog className="dialog" open={dialogOpen}>
            <form onSubmit={handleEvent}>
                <div>{message}</div>
                <button type='submit'>{buttonLabel}</button>
            </form>
        </dialog>

    </>

}