import { useEffect, useState } from "react"
import { addEffect } from "@react-three/fiber"

import useGame from "./stores/useGame.js"
import Dialog from "./Dialog.jsx"
import TitleScreen from "./interface/TitleScreen.jsx"
import EndGameScreen from "/interface/EndGameScreen.jsx"
import Hud from "/interface/Hud.jsx"
import Menu from "/interface/Menu.jsx"

import './styles/interface.css'
import DialogRefactor from "./DialogRefactor.jsx"


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
        {phase==='ended' && <EndGameScreen />}
        {phase==='playing' && <Menu />}
        {phase==='playing' && <Hud />}
        <DialogRefactor />

    </>

}