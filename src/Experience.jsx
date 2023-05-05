import { OrbitControls } from '@react-three/drei'

import Interface from './Interface.jsx'
import Tile from './Tile.jsx'

export default function Experience()
{
    
    return <>
    
        <OrbitControls makeDefault />

        <ambientLight intensity={0.2} />
        <directionalLight />  

        <Interface />

        <Tile />

    </>

}
