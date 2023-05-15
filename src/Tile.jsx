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

    const debug_pillar = useLoader(GLTFLoader, './debug-pillar.glb')
    
    const debug_corner_l = useLoader(GLTFLoader, './debug-corner-left.glb')
    const debug_corner_r = useLoader(GLTFLoader, './debug-corner-right.glb')

    const debug_wall_l = useLoader(GLTFLoader, './debug-wall-left.glb')
    const debug_wall_f = useLoader(GLTFLoader, './debug-wall-forward.glb')
    const debug_wall_r = useLoader(GLTFLoader, './debug-wall-right.glb')
    
    const debug_hall = useLoader(GLTFLoader, './debug-hall.glb')

    const debug_dead = useLoader(GLTFLoader, './debug-deadend.glb')

    const allmodels = {
        model1: model1,
        debug_pillar: debug_pillar,
        debug_corner_l: debug_corner_l,
        debug_corner_r: debug_corner_r,
        debug_wall_l: debug_wall_l,
        debug_wall_f: debug_wall_f,
        debug_wall_r: debug_wall_r,
        debug_hall: debug_hall,
        debug_dead: debug_dead
    }

    // States
    const [ selectedModel, setSelectedModel ] = useState(model1)
    const [ selectedModelName, setSelectedModelName ] = useState('model1')
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
        let models = []

        // Check if tile is on the edge
        if ( row === 0 || row === 6 || col === 0 || col === 6 ) {

            // If on the edge, we can have a corner, wall, deadend.
            models.length = 0
            models.push('debug_dead', 'debug_wall_f', 'debug_corner_l', 'debug_corner_r')

            // If primary tile is on left edge
            if (primaryTile[0] === 0) {
                models.length = 0
                primaryTile[1] > col
                        ? models.push('debug_corner_r', 'debug_hall', 'debug_wall_l')
                        : models.push('debug_corner_l', 'debug_hall', 'debug_wall_r')
            }
            // If primary tile is on right edge
            if (primaryTile[0] === 6) {
                models.length = 0
                primaryTile[1] > col
                        ? models.push('debug_corner_l', 'debug_hall', 'debug_wall_r')
                        : models.push('debug_corner_r', 'debug_hall', 'debug_wall_l')
            }
            // If primary tile is on top edge
            if (primaryTile[1] === 0) {
                models.length = 0
                primaryTile[0] > row
                        ? models.push('debug_corner_l', 'debug_hall', 'debug_wall_r')
                        : models.push('debug_corner_r', 'debug_hall', 'debug_wall_l')
            }
            // If primary tile is on bottom edge
            if (primaryTile[1] === 6) {
                models.length = 0
                primaryTile[0] > row
                        ? models.push('debug_corner_r', 'debug_hall', 'debug_wall_l')
                        : models.push('debug_corner_l', 'debug_hall', 'debug_wall_r')
            }

            // If the primary tile is in the corner, it is annoying

                // Top left
                if (primaryTile[0] === 0 && primaryTile[1] === 0) {
                    models.length = 0
                    primaryTile[1] === col
                        ? models.push('debug_corner_r', 'debug_hall', 'debug_wall_l', 'debug_dead')
                        : models.push('debug_corner_l', 'debug_hall', 'debug_wall_r', 'debug_dead')
                }
                // Bottom Left
                if (primaryTile[0] === 0 && primaryTile[1] === 6) {
                    models.length = 0
                    primaryTile[1] === col
                        ? models.push('debug_corner_l', 'debug_hall', 'debug_wall_r', 'debug_dead')
                        : models.push('debug_corner_r', 'debug_hall', 'debug_wall_l', 'debug_dead')
                }
                // Top Right
                if (primaryTile[0] === 6 && primaryTile[1] === 0) {
                    models.length = 0
                    primaryTile[0] === row
                        ? models.push('debug_corner_r', 'debug_hall', 'debug_wall_l', 'debug_dead')
                        : models.push('debug_corner_l', 'debug_hall', 'debug_wall_r', 'debug_dead')
                }
                // Bottom Right
                if (primaryTile[0] === 6 && primaryTile[1] === 6) {
                    models.length = 0
                    primaryTile[1] === col
                        ? models.push('debug_corner_r', 'debug_hall', 'debug_wall_l', 'debug_dead')
                        : models.push('debug_corner_l', 'debug_hall', 'debug_wall_r', 'debug_dead')
                }

            // If on the corner, we can have a corner or a deadend

                // Bottom left
                if (row === 0 && col === 6) {
                    models.length = 0
                    primaryTile[0] === 0
                        ? models.push('debug_corner_l', 'debug_dead')
                        : models.push('debug_corner_r', 'debug_dead')
                }
                // Bottom right
                if (row === 6 && col === 6) {
                    models.length = 0
                    primaryTile[0] === 6
                        ? models.push('debug_corner_r', 'debug_dead')
                        : models.push('debug_corner_l', 'debug_dead')
                }
                // Top left
                if (row === 0 && col === 0) {
                    models.length = 0
                    primaryTile[0] === 0
                        ? models.push('debug_corner_r', 'debug_dead')
                        : models.push('debug_corner_l', 'debug_dead')
                }
                // Top right
                if (row === 6 && col === 0) {
                    models.length = 0
                    primaryTile[0] === 6
                        ? models.push('debug_corner_l', 'debug_dead')
                        : models.push('debug_corner_r', 'debug_dead')
                }

            // Add in a condition for the first primary tile
            if (primaryTile[1] === 7) {
                models.length = 0
                models.push('debug_pillar')
            }

        // Anything not on edge can have any tile
        } else {

            models.push(
                'debug_pillar', 
                'debug_dead', 
                'debug_hall', 
                'debug_corner_l', 'debug_corner_r', 
                'debug_wall_l', 'debug_wall_f', 'debug_wall_r'
            )

        }

        return models

    }
    
    // Create a function to sample a tile
    const sampleTile = () => {

        // If base tile model, sample different one
        if (baseTile) {
            // Get valid tiles based on logic
            let models = getValidTiles()
            // index based on length of valid model names
            let modelIndex = Math.floor(Math.random() * models.length)
            // name selected from lookup of all model names
            let sampledModelName = models[modelIndex]
            // actual model object given provided name
            let modelObject = allmodels[sampledModelName]
            // state for both the actual model to get loaded and the name to get used in other calcs
            setSelectedModel(modelObject)
            setSelectedModelName(sampledModelName)
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

        let allTiles = [...selectedTiles, primaryTile]
        let currentTile = [row, col]
        let isPresent = allTiles.some(arr => arr.join(',') === currentTile.join(','))
        
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

    // TODO -- move to helper file and source or use as global state via zustand
        const validNeighbors = {
        // from top, right, bottom, left
        model1: model1,
        debug_pillar: [1, 1, 1, 1],
        debug_corner_l: [0, 0, 1, 1],
        debug_corner_r: [1,0, 0, 1],
        debug_wall_l: [1, 1, 0, 1], //good
        debug_wall_f: [1, 0, 1, 1], //good
        debug_wall_r: [0, 1, 1, 1], //good
        debug_dead: [0, 0, 0, 1],
        debug_hall: [0, 1, 0, 1],

    }

    // Creating a function for handling click, pointer over, and pointer out
    let handleClick = (e) => {
            e.stopPropagation()
            if(isPrimaryTile) return
            let currentTile = [row, col]
            let allTiles = [...selectedTiles, primaryTile]
            let isNeighbor = allTiles.some(arr => arr.join(',') === currentTile.join(','))

        // TODO -- handle based on selected model name
        if(isNeighbor) {

            // function that loops an array in either direction
            function arrayRotate(arr, reverse) {
                if (reverse) arr.unshift(arr.pop());
                else arr.push(arr.shift());
                return arr;
            }

            let newNeighbors = JSON.parse(JSON.stringify(neighbors))

            let validDirections = validNeighbors[selectedModelName]

            let newDirections = validDirections

            if(direction=='right') newDirections = [...arrayRotate(validDirections, false)]

            if(direction=='left') newDirections = [...arrayRotate(validDirections, true)]

            if(direction=='down') newDirections = [...arrayRotate([...arrayRotate(validDirections)])]


            // TODO -- use the references to neighbors.directions to handle this when the length is < 3
            // const availableNeighbors = []

            // for(let i = 0; i < neighbors.coords.length; i++) {
            //     availableNeighbors.push(newDirections[i])
            // }

            // condition
            if(neighbors.coords.length === 4) {

                newNeighbors.coords = neighbors.coords.filter((item, index) => {
                    return newDirections[index]
                })

            }

            // set new primary and the new live tiles based on the valid ones
            setPrimaryTile([row, col])
            setSelectedTiles([...newNeighbors.coords, [row, col]])

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
