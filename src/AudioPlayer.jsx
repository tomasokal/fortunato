import { useRef, useState, useEffect } from 'react'
import useGame from './stores/useGame.js'
import { Volume, VolumeX } from 'react-feather';

export default function AudioPlayer() {

    const audioRef = useRef();

    const [isMute, setIsMute] = useState(false);
    const [volume, setVolume] = useState(0.1);

    const phase = useGame((state) => state.phase)

    const src = './sounds/8-bit-halloween-story-166454.mp3'

    useEffect(() => {
        if (isMute) {
            setVolume(0)
        } else {
            setVolume(0.1)
        }
        audioRef.current.play()
      }, [isMute, phase]);

      useEffect(()=> {
        audioRef.current.volume = volume
        if(volume==0) {
            setIsMute(true) 
        } else {
            setIsMute(false)
        }
      }, [volume])

    return(
        <div className='audioWrapper'>
            <audio
                ref={audioRef}
                src={src}
                loop
                onEnded={() => {
                    setIsPlaying(false);
                }}
            />
            <input 
                type="range" 
                orient="vertical" 
                min={0}
                max={0.25}
                step={0.01}
                value={volume}
                onChange={event => {
                    setVolume(event.target.value)
                }}
            />
            <button
                className='muteButton'
                onClick={() => {
                if (isMute) {
                    setVolume(0.15)
                } else {
                    setVolume(0)
                }
    
                setIsMute(!isMute);
                }}
            >
                {isMute ? <VolumeX /> : <Volume />}
            </button>
        </div>

    )
}