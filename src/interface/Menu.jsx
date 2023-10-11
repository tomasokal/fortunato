import { useEffect, useState } from "react"
import { addEffect } from "@react-three/fiber"

import useGame from "../stores/useGame.js"


export default function Hud()
{

    const [brightness, setBrightness] = useState(0.15);

    const restart = useGame((state) => state.restart)
    const phase = useGame((state) => state.phase)
    const menuOpen = useGame((state) => state.menuOpen)
    const toggleMenuOpen = useGame((state) => state.toggleMenuOpen)

    const handleRestart = () => {
        restart()
    }


    useEffect(() => {
        const onESC = (event) => {
            if (event.key === "Escape") {
                toggleMenuOpen()
            }
        };
        window.addEventListener("keyup", onESC, false);
        return () => {
            window.addEventListener("keyup", onESC, false);
        };
    }, []);


    return <>
        {phase=='playing' && menuOpen &&
        <div className='menuwrapper'>
            <div className="menu">
                <button onClick={toggleMenuOpen}>Resume</button>
                <button onClick={handleRestart}>Restart</button>
                <div className='brightness'>
                    <label htmlFor='brightnessrange'>Brightness</label>
                    <br></br>
                    <input
                        id='brightnessrange'
                        type="range" 
                        min={0}
                        max={0.4}
                        step={0.01}
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