import { useEffect, useState } from "react"
import { addEffect } from "@react-three/fiber"
import useGame from "../stores/useGame.js"

export default function TitleScreen()
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
                <div className='wrapperImgGrid'>
                    <div><img className='delayOne' src='./images/bookicon.svg'></img></div>
                    <div><img className='delayOne'  src='./images/bottlefilled.svg'></img></div>
                    <div><img className='delayOne'  src='./images/bottlefilled.svg'></img></div>
                    <div><img className='delayOne'  src='./images/skullocon.svg'></img></div>
                </div>
            </div>
        </div>
    </>

}