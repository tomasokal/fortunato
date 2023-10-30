import { EffectComposer, Vignette, DepthOfField, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import useGame from './stores/useGame'

export default function Effects() {

    const health = useGame((state)=> state.health)

    const hpMax = 51;
    const hpMin = 0;

    const chromMax = 0.001;
    const chromMin = 0.00002;
    const percentScale = 1 - (health - hpMin) / (hpMax - hpMin);
    const outputChrom = percentScale * (chromMax - chromMin) + chromMin;

    // console.log(outputChrom)

    return <>

        <color args={['#141414']} attach='background' />

        <EffectComposer>
            <Vignette
                offset={0.75}
                darkness={0.5}
                eskil={false}
                blendFunction={BlendFunction.NORMAL}
            />
            <ChromaticAberration
                blendFunction={BlendFunction.NORMAL} // blend mode
                offset={[outputChrom, outputChrom]} // color offset
            />
            {/* <DepthOfField /> */}
        </EffectComposer>
    </>
}