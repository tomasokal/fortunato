import { useEffect, useState } from "react"
import { addEffect } from "@react-three/fiber"

import useGame from "../stores/useGame.js"


export default function Hud()
{

    const restart = useGame((state) => state.restart)
    const phase = useGame((state) => state.phase)

    const [menuOpen, setMenuOpen] = useState(false)

    const brightness = useGame((state) => state.brightness)
    const setBrightness = useGame((state) => state.setBrightness)

    const handleRestart = () => {
        restart()
    }
    
    const handleResume = () => {
        setMenuOpen(!menuOpen)
    }


    useEffect(() => {
        const onESC = (event) => {
            if (event.key === "Escape") {
                setMenuOpen(!menuOpen)
            }
        };
        window.addEventListener("keyup", onESC, false);
        return () => {
            window.removeEventListener("keyup", onESC, false);
        };
    }, [menuOpen]);


    return <>
        {phase=='playing' && menuOpen &&
        <div className='menuwrapper'>
            <div className="menu">
                <button onClick={handleResume}>Resume</button>
                <a href="javascript:window.location.reload(true)">Restart</a>
                <div className='brightness'>
                    <label htmlFor='brightnessrange'>Brightness</label>
                    <br></br>
                    <input
                        id='brightnessrange'
                        type="range" 
                        min={0.3}
                        max={2.5}
                        step={0.05}
                        value={brightness}
                        onChange={event => {
                            setBrightness(event.target.value)
                        }}
                    />
                </div>
                <a href="javascript:window.location.reload(true)">Exit</a>
            </div>
        </div>
        }
    </>
}