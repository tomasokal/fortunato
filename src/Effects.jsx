import { EffectComposer, Vignette, DepthOfField } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function Effects() {
    return <>

        <color args={['#141414']} attach='background' />

        <EffectComposer>
            <Vignette
                offset={0.75}
                darkness={0.5}
                eskil={false}
                blendFunction={BlendFunction.NORMAL}
            />
            {/* <DepthOfField /> */}
        </EffectComposer>
    </>
}