import { OrbitControls } from '@react-three/drei'

import Interface from './Interface.jsx'
import Grid from './Grid.jsx'

export default function Experience()
{
    
    return <>
    
        <OrbitControls makeDefault />

        <ambientLight intensity={0.2} />
        <directionalLight />  

        <Interface />

        <Grid rows={7} columns={7} />

    </>

}
