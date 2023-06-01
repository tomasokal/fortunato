import { useEffect, useState } from "react"
import { addEffect } from "@react-three/fiber"

import useGame from "./stores/useGame.js"
import Dialog from "./Dialog.jsx"
import TitleScreen from "./interface/TitleScreen.jsx"

import './styles/interface.css'


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

        {phase==='ready' && <TitleScreen />}
        <div className="interface">
            {/* <button onClick={restart}>Restart</button>
            <button onClick={end}>End</button> */}
        </div>
        <Dialog />

    </>

}