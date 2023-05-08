import { Center, OrbitControls } from '@react-three/drei'

import Interface from './Interface.jsx'
import Grid from './Grid.jsx'

export default function Experience()
{
    
    return <>
    
        <OrbitControls makeDefault />

        <ambientLight intensity={2} />
        <directionalLight />  

        <Interface />

        <Center>
            <Grid rows={7} columns={7} />
        </Center>

    </>

}
