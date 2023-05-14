import { useEffect, useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { animated, useSpring } from '@react-spring/three'
import * as THREE from 'three'

import SelectedTile from './SelectedTile'

export default function Tile({ row, col, positionX, positionZ, 
    neighbors, 
    // neighbors and primary
    selectedTiles, setSelectedTiles,
    // primary tile and setter
    primaryTile, setPrimaryTile
 })
{
    
    // Loading tile models
    const model1 = useLoader(GLTFLoader, './dungeon-tile-base.glb')
    const model2 = useLoader(GLTFLoader, './dungeon-tile-corner.glb')
    const model3 = useLoader(GLTFLoader, './dungeon-tile-deadend.glb')
    const model4 = useLoader(GLTFLoader, './dungeon-tile-escape.glb')
    const model5 = useLoader(GLTFLoader, './dungeon-tile-hall.glb')
    const model6 = useLoader(GLTFLoader, './dungeon-tile-markings.glb')
    const model7 = useLoader(GLTFLoader, './dungeon-tile-pillar.glb')
    const model8 = useLoader(GLTFLoader, './dungeon-tile-rubble.glb')
    const model9 = useLoader(GLTFLoader, './dungeon-tile-wall2.glb')
    const model10 = useLoader(GLTFLoader, './dungeon-tile-wine.glb')
    const model11 = useLoader(GLTFLoader, './dungeon-tile-wall-edge.glb')
    const model12 = useLoader(GLTFLoader, './dungeon-tile-hall-edge.glb')

    // TODO -- set up traversion across all models

    // model2.scene.traverse((mesh) => {
    //     mesh.receiveShadow = true
    //     mesh.castShadow = true
    // })
    // model3.scene.traverse((mesh) => {
    //     mesh.receiveShadow = true
    //     mesh.castShadow = true
    // })
    // model4.scene.traverse((mesh) => {
    //     mesh.receiveShadow = true
    //     mesh.castShadow = true
    // })

    // States
    const [ selectedModel, setSelectedModel ] = useState(model1)
    const [ baseTile, setBaseTile ] = useState(true)

    // Creating state for hover and active
    const [ hover, setHover ] = useState(false)
    const [ active, setActive ] = useState(false)

    // state to store if this tile is the primary one
    const [ isPrimaryTile, setIsPrimaryTile] = useState(false)

    // state that stores the height of the spring for hovers or unique tiles
    const [springHeight, setSpringHeight] = useState(0)

    // State for direction of tile
    const [ direction, setDirection ] = useState()

    const getValidTiles = () => {

        // Set up base set of tiles 
        const models = []

        // Check if tile is on the edge
        if ( row === 0 || row === 6 || col === 0 || col === 6 ) {

            // If on the edge, we can have a corner, wall, deadend.
            models.length = 0
            models.push(model2, model3, model9)

            // If the primary tile is on the edge as well, we can have a hall, deadend, corner, wall
            if ( primaryTile[0] === 0 || primaryTile[0] === 6 || primaryTile[1] === 0 || primaryTile[1] === 6 ) {
                models.length = 0
                models.push(model2, model3, model5, model11)
            }

            // If on the corner, we can have a corner or a deadend
            if ( (row === 0 && col === 0) || (row === 0 && col === 6) || (row === 6 && col === 0) || (row === 6 && col === 6) ) {
                models.length = 0
                models.push(model2, model3)
            }

        // Anything not on edge can have any tile, but constrain to pillars for now.
        } else {

            models.push(model7)

        }

        return models

    }
    
    // Create a function to sample a tile
    const sampleTile = () => {

        // If base tile model, sample different one
        if (baseTile) {
            // Get valid tiles based on logic
            const models = getValidTiles()
            const modelIndex = Math.floor(Math.random() * models.length)
            const sampledModel = models[modelIndex]
            setSelectedModel(sampledModel)
        } else {
            // Set back to base tile model
            setSelectedModel(model1)
        }

    }

    // When base tile changes (based on state of if the tile is in present neighbors)
    // we resample the tile
    // sampling tile with set state for the tile model and flip it
    useEffect(()=> {
        getDirection()
        sampleTile()
    }, [baseTile])

    // Run sampleTile whenever selectedTiles changes
    useEffect(() => {

        const allTiles = [...selectedTiles, primaryTile]
        const currentTile = [row, col]
        const isPresent = allTiles.some(arr => arr.join(',') === currentTile.join(','))
        
        // check if the current tile is also the primary tile
        setIsPrimaryTile(currentTile.toString()==primaryTile.toString())

        setBaseTile(isPresent)
        setActive(isPresent)

    }, [primaryTile, selectedTiles])

    // Creating a reference for the tile
    const tileRef = useRef()

    // Create a function that 
    const getDirection = () => {

        // Early return if primaryTile
        if(isPrimaryTile) return

        const currentTile = [row, col]
        const tileToPointTo = primaryTile

        // Get elements of currentTile and tileToPointTo
        const [currentTileRow, currentTileCol] = currentTile
        const [tileToPointToRow, tileToPointToCol] = tileToPointTo

        // Get the difference between the two tiles
        const dx = tileToPointToCol - currentTileCol
        const dy = tileToPointToRow - currentTileRow

        if (dx === 0 && dy === -1) {
            setDirection("left")
        } else if (dx === 0 && dy === 1) {
            setDirection("right")
        } else if (dx === -1 && dy === 0) {
            setDirection("up")
        } else if (dx === 1 && dy === 0) {
            setDirection("down")
        }

    }

    // Springs:
    
        // Creating a spring for rotation
        const springRotation = useSpring({
            rotation: active ? [Math.PI, 0, 0] : [0, 0, 0],
            config: {
                mass: 1,
                tension: 210,
                friction: 20,
                precision: 0.01,
                velocity: 0,
            }
        })

        useEffect(()=> {

            let newSpring = 0
            if(active) newSpring += 1
            if(hover && !isPrimaryTile) newSpring +=0.25
            setSpringHeight(newSpring)

        }, [primaryTile, active, hover])

        // Creating a spring for position
        const springPosition = useSpring({
            // Set position to 1 if active and 0.5 if hover and 0 if neither
            position: springHeight,
            config: {
                mass: 1,
                tension: 210,
                friction: 20,
                precision: 0.01,
                velocity: -0.005,
            }
        })

    // Creating a function for handling click, pointer over, and pointer out
        const handleClick = (e) => {
            e.stopPropagation()
            if(isPrimaryTile) return
            const currentTile = [row, col]
            const allTiles = [...selectedTiles, primaryTile]
            const isNeighbor = allTiles.some(arr => arr.join(',') === currentTile.join(','))
            
            if(isNeighbor) {
                setPrimaryTile([row, col])
                setSelectedTiles([...neighbors, [row, col]])
            }
        }

        const handlePointerOver = (e) => {
            e.stopPropagation()
            setHover(true)
        }

        const handlePointerOut = (e) => {
            e.stopPropagation()
            setHover(false)
        }

    return <>

        <animated.mesh
            castShadow
            receiveShadow
            ref={tileRef}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            position-y={springPosition.position}
            position-x={positionX}
            position-z={positionZ}
            rotation={springRotation.rotation}
        >
            <SelectedTile model={selectedModel} baseTile={baseTile} direction={direction}/>
        </animated.mesh>

    </>

}
