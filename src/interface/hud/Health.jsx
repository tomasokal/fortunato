import { useEffect, useState } from "react"
import { addEffect } from "@react-three/fiber"

import { range } from '../../utils';

export default function Health({healthpoints}) {

    return <>
        <div className='healthpointsWrapper'>
            {range(5).map((rowIndex) => (
                <div key={rowIndex}>
                    <svg width="206" height="633" viewBox="0 0 206 633" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_4_26)" fill={`${rowIndex * 10 < healthpoints && '#760303'}`}>
                            <path d="M102.86 619.145C123.829 619.249 150.383 619.284 165.949 619C187.908 618.6 195.432 591.5 196.449 578V345.5C197.949 328.333 193.949 289.9 165.949 273.5C137.949 257.1 138.282 214 141.949 194.5C137.949 185.167 129.949 164.1 129.949 154.5V45H75.7711V154.5C75.7711 164.1 67.7712 185.167 63.7712 194.5C67.4378 214 67.7712 257.1 39.7712 273.5C11.7712 289.9 7.77116 328.333 9.27116 345.5V578C10.2884 591.5 17.8125 618.6 39.7712 619C55.3375 619.284 81.8914 619.249 102.86 619.145ZM102.86 619.145C94.2494 619.103 86.5804 619.049 81.0009 619M102.86 619.145C111.471 619.103 119.14 619.049 124.719 619M10 351C29.5 368.5 178.5 367.5 197 351M9 519C28.5 536.5 177.5 535.5 196 519M127.5 5L124 55H81L76 5H127.5Z" stroke="#760303" stroke-width="10" shape-rendering="crispEdges"/>
                        </g>
                        <g filter="url(#filter1_d_4_26)" >
                            <path d="M196.001 353V521.227C177.518 537.75 28.4816 538.751 9 521.227L9.43453 353C28.9161 370.524 177.518 369.522 196.001 353Z" fill="#E0D0AA" fill-opacity="0.75" shape-rendering="crispEdges"/>
                            <path d="M196.001 353V521.227C177.518 537.75 28.4816 538.751 9 521.227L9.43453 353C28.9161 370.524 177.518 369.522 196.001 353Z" stroke="#760303" stroke-width="6" shape-rendering="crispEdges"/>
                        </g>
                        <g filter="url(#filter2_d_4_26)">
                            <path d="M99 426.206C103.333 410.372 119.1 384.306 147.5 406.706C175.9 429.106 127 478.02 99 499.354M99 499.354C70.9877 477.991 22.2011 429.791 50.5756 407.411C78.9756 385.011 94.7422 411.078 99.0756 426.911M99 499.354C99.0252 499.373 106.475 493.357 106.5 493.376" stroke="#760303" stroke-width="10" shape-rendering="crispEdges"/>
                        </g>
                        <defs>
                            <filter id="filter0_d_4_26" x="0.000152588" y="0" width="205.72" height="632.221" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_26"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4_26" result="shape"/>
                            </filter>
                            <filter id="filter1_d_4_26" x="1.99655" y="346.282" width="201.004" height="198.715" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_26"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4_26" result="shape"/>
                            </filter>
                            <filter id="filter2_d_4_26" x="33.0016" y="393" width="132.072" height="119.338" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_26"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4_26" result="shape"/>
                            </filter>
                        </defs>
                    </svg>
                </div>
            ))}
        </div>
    </>
}