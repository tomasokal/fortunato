import { useEffect, useState } from 'react'

import useGame from "./stores/useGame.js"

import './styles/dialog.css'

export default function Dialog()
{

    // Import the useGame hook and use it to get the message state and setMessage function
    const message = useGame((state) => state.message)
    const setMessage = useGame((state) => state.setMessage)

    // Import health and setHealth from useGame
    const health = useGame((state) => state.health)
    const setHealth = useGame((state) => state.setHealth)

    // Import the useGame hook and use it to get the restart function
    const end = useGame((state) => state.end)
    const win = useGame((state) => state.win)
    const lose = useGame((state) => state.lose)

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

        if(buttonLabel === 'Walk up the stairs...') {
            win()
        }

        if(buttonLabel === 'Press on...') {
            setHealth(health + 1)
        }

        if(buttonLabel === 'A flicker of renewed strength stirs...') {
            setHealth(10)
        }

        if(buttonLabel === 'OK') {
            lose()
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
        } else if (message.startsWith('At last')) {
            setButtonLabel('Walk up the stairs...')
        } else if (message.startsWith('Fortunato stumbles upon a bottle of Amontillado.')) {
            setButtonLabel('Press on...')
        } else if (message.startsWith('Amidst the shifting catacombs')) {
            setButtonLabel('A flicker of renewed strength stirs...')
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