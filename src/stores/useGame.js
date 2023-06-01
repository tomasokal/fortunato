import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create((set) => 
{
    return {

        // Game Phase Management
        phase: 'ready',
        start: () => {
            set((state) => {
                if(state.phase === 'ready') return { phase: 'playing' }
                return {}
            })
        },
        restart: () => {
            set((state) => {
                if(state.phase === 'ready' || state.phase === 'playing' || state.phase === 'ended') return {
                    phase: 'ready', 
                    health: 10, 
                    message: '',
                    tile: '', 
                    shownMessageCorner: false,
                    shownBookCase: false,
                    foundClue: false
                }
                return {}
            })
        },
        end: () => {
            set((state) => {
                if(state.phase === 'playing') return {phase: 'ended' }
                return {}
            })
        },

        // Player Health Management
        health: 10,
        setHealth: (value) => {
            set((state) => {
                return({health: value})
            })
        },

        // Player Tile Type Management
        tile: '',
        setTile: (value) => {  
            set((state) => {
                return({tile: value})
            })
        },

        // Message Management
        message: '',
        setMessage: (value) => {
            set((state) => {
                return({message: value})
            })
        },

        // Dialog Options
            // When a tile is hit for the first time
            // the full message is displayed
            // When a tile is hit for the second and subsequent times
            // the short message is displayed
            // There are dialog options for the following tiles:
                // Immured corner
        
        shownMessageCorner: false,
        setShownMessageCorner: (value) => {
            set((state) => {
                if(value === false) return {shownMessageCorner: true}
                return {}
            })
        },

        shownBookCase: false,
        setShownBookCase: (value) => {
            set((state) => {
                if(value === false) return {shownBookCase: true}
                return {}
            })
        },

        foundClue: false,
        setFoundClue: (value) => {
            set((state) => {
                if(value === false) return {foundClue: true}
                return {}
            })
        }

    }
})