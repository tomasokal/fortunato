import { useEffect, useState } from "react"
import { addEffect } from "@react-three/fiber"
import useGame from "../stores/useGame.js"

export default function Interface()
{

    const phase = useGame((state) => state.phase)
    const health = useGame((state)=> state.health)
    const start = useGame((state) => state.start)
    const restart = useGame((state) => state.restart)
    const end = useGame((state) => state.end)

    useEffect(()=>{
        // lets us tap into framerate of r3f even outside of canvas
        // get the unsubscriber
        const unsubscribeEffect = addEffect(()=> {
            // need to get current state, not state at beginning of render
            const state = useGame.getState()

        })

        return () => {
            unsubscribeEffect()
        }
    }, [])

    return <>
        <div className='titleScreenWrapper'>
            <div className='titleScreen'>
                <h1>The Fate of Fortunato</h1>
                <button onClick={start}>Start</button>
            </div>
        </div>
    </>

}