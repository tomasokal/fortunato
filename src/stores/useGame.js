import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) => 
{
    return {
        phase: 'ready',
        health: 10,
        message: '',
        start: () => {
            set((state) => {
                if(state.phase === 'ready') return { phase: 'playing' }
                return {}
            })
        },
        restart: () => {
            set((state) => {
                if(state.phase === 'ready' || state.phase === 'playing' || state.phase === 'ended') return {phase: 'ready', health: 10, message: '' }
                return {}
            })
        },
        end: () => {
            set((state) => {
                if(state.phase === 'playing') return {phase: 'ended' }
                return {}
            })
        },
        setMessage: (value) => {
            set((state) => {
                return({message: value})
            })
        },
        setHealth: (value) => {
            set((state) => {
                return({health: value})
            })
        }
    }
}))