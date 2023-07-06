import { useEffect, useState } from "react"
import { addEffect } from "@react-three/fiber"

import useGame from "../stores/useGame.js"
import { range } from '../utils';

import Health from './hud/Health.jsx'

export default function Hud()
{

    const phase = useGame((state) => state.phase)
    const health = useGame((state)=> state.health)

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
        <Health healthpoints={health}/>
    </>
}