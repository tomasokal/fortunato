import { useEffect, useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { animated, useSpring } from '@react-spring/three'
import * as THREE from 'three'

import SelectedTile from './SelectedTile'
import useGame from './stores/useGame'

export default function Tile({ row, col, positionX, positionZ, 
    neighbors, 
    // neighbors and primary
    selectedTiles, setSelectedTiles,
    // primary tile and setter
    primaryTile, setPrimaryTile,
    // info about the primary tile type for controlling game flow
    primaryTileType, setPrimaryTileType
 })
{
    
    // Loading in all of the tiles

        // Base model
        const model1 = useLoader(GLTFLoader, './dungeon-tile-base.glb')

        // Start model
        const tileStart = useLoader(GLTFLoader, './tile-start.glb')

        // End model
        const tileEnd = useLoader(GLTFLoader, './tile-end.glb')

        // Pillar model
        const tilePillar = useLoader(GLTFLoader, './tile-pillar.glb')   

        // Corner models
        const tileCornerLeft = useLoader(GLTFLoader, './tile-corner-l.glb')
        const tileCornerBrickLeft = useLoader(GLTFLoader, './tile-corner-l-brick.glb')
        const tileCornerRight = useLoader(GLTFLoader, './tile-corner-r.glb')
        const tileCornerBrickRight = useLoader(GLTFLoader, './tile-corner-r-brick.glb')

        // Wall models
        const tileWallLeft = useLoader(GLTFLoader, './tile-wall-left.glb')
        const tileWallForward = useLoader(GLTFLoader, './tile-wall-forward.glb')
        const tileWallRight = useLoader(GLTFLoader, './tile-wall-right.glb')

        // Hall models
        const tileHall = useLoader(GLTFLoader, './tile-hall.glb') 

        // Deadend models
        const tileDead = useLoader(GLTFLoader, './tile-deadend.glb') 
        const tileDeadBook = useLoader(GLTFLoader, './tile-deadend-book.glb')

        // Health models
        const tileBottle = useLoader(GLTFLoader, './tile-bottle.glb')
        const tileBarrel = useLoader(GLTFLoader, './tile-barrel.glb')

    // Set up mappings for models
    const allmodels = {
        model1: model1,
        tilePillar: tilePillar,
        tileCornerLeft: tileCornerLeft,
        tileCornerBrickLeft: tileCornerBrickLeft,
        tileCornerRight: tileCornerRight,
        tileCornerBrickRight: tileCornerBrickRight,
        tileWallLeft: tileWallLeft,
        tileWallForward: tileWallForward,
        tileWallRight: tileWallRight,
        tileHall: tileHall,
        tileDead: tileDead,
        tileDeadBook: tileDeadBook,
        tileBottle: tileBottle,
        tileBarrel: tileBarrel,
        tileStart: tileStart,
        tileEnd: tileEnd,
    }

    // States
    const [ selectedModel, setSelectedModel ] = useState(model1)
    const [ selectedModelName, setSelectedModelName ] = useState('model1')
    const [ baseTile, setBaseTile ] = useState(true)

    // Creating state for hover and active
    const [ hover, setHover ] = useState(false)
    const [ active, setActive ] = useState(false)

    // Import the useGame hook and use it to get the message state and setMessage function
    const tile = useGame((state) => state.tile)
    const setTile = useGame((state) => state.setTile)

    const turn = useGame((state) => state.turn)
    const setTurn = useGame((state) => state.setTurn)

    // checks if dialog is open to prevent click when there is dialog
    const dialogOpen = useGame((state) => state.dialogOpen)

    // States for clues and objectives
    const foundClueOne = useGame((state) => state.foundClueOne)
    const foundClueTwo = useGame((state) => state.foundClueTwo)
    
    // Import state for foundClue
    const foundClue = useGame((state) => state.foundClue)

    // Import state for health
    const health = useGame((state) => state.health)

    // Import state for foundBarrel
    const foundBarrel = useGame((state) => state.foundBarrel)
    const foundBottle = useGame((state) => state.foundBottle)

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
            models.push('tileDead', 'tileWallForward', 'tileCornerLeft', 'tileCornerRight')

            // If primary tile is on left edge
            if (primaryTile[0] === 0) {
                models.length = 0
                primaryTile[1] > col
                        ? models.push('tileCornerRight', 'tileHall', 'tileWallLeft', 'tileDead')
                        : models.push('tileCornerLeft', 'tileHall', 'tileWallRight', 'tileDead')
            }
            // If primary tile is on right edge
            if (primaryTile[0] === 6) {
                models.length = 0
                primaryTile[1] > col
                        ? models.push('tileCornerLeft', 'tileCornerBrickLeft', 'tileHall', 'tileWallRight', 'tileDead')
                        : models.push('tileCornerRight', 'tileCornerBrickRight', 'tileHall', 'tileWallLeft', 'tileDead')
            }
            // If primary tile is on top edge
            if (primaryTile[1] === 0) {
                models.length = 0
                primaryTile[0] > row
                        ? models.push('tileCornerLeft', 'tileHall', 'tileWallRight', 'tileDead')
                        : models.push('tileCornerRight', 'tileHall', 'tileWallLeft', 'tileDead')
            }
            // If primary tile is on bottom edge
            if (primaryTile[1] === 6) {
                models.length = 0
                primaryTile[0] > row
                        ? models.push('tileCornerRight', 'tileHall', 'tileWallLeft', 'tileDead')
                        : models.push('tileCornerLeft', 'tileHall', 'tileWallRight', 'tileDead')
            }

            // If the primary tile is in the corner, it is annoying

                // Top left
                if (primaryTile[0] === 0 && primaryTile[1] === 0) {
                    models.length = 0
                    primaryTile[1] === col
                        ? models.push('tileCornerRight', 'tileHall', 'tileWallLeft', 'tileDead')
                        : models.push('tileCornerLeft', 'tileHall', 'tileWallRight', 'tileDead')
                }
                // Bottom Left
                if (primaryTile[0] === 0 && primaryTile[1] === 6) {
                    models.length = 0
                    primaryTile[1] === col
                        ? models.push('tileCornerLeft', 'tileHall', 'tileWallRight', 'tileDead')
                        : models.push('tileCornerRight', 'tileHall', 'tileWallLeft', 'tileDead')
                }
                // Top Right
                if (primaryTile[0] === 6 && primaryTile[1] === 0) {
                    models.length = 0
                    primaryTile[0] === row
                        ? models.push('tileCornerRight', 'tileHall', 'tileWallLeft', 'tileDead')
                        : models.push('tileCornerLeft', 'tileHall', 'tileWallRight', 'tileDead')
                }
                // Bottom Right
                if (primaryTile[0] === 6 && primaryTile[1] === 6) {
                    models.length = 0
                    primaryTile[1] === col
                        ? models.push('tileCornerRight', 'tileHall', 'tileWallLeft', 'tileDead')
                        : models.push('tileCornerLeft', 'tileHall', 'tileWallRight', 'tileDead')
                }

            // If on the corner, we can have a corner or a deadend

                // Bottom left
                if (row === 0 && col === 6) {
                    models.length = 0
                    primaryTile[0] === 0
                        ? models.push('tileCornerLeft', 'tileDead')
                        : models.push('tileCornerRight', 'tileDead')
                }
                // Bottom right
                if (row === 6 && col === 6) {
                    models.length = 0
                    primaryTile[0] === 6
                        ? models.push('tileCornerRight', 'tileDead')
                        : models.push('tileCornerLeft', 'tileDead')
                }
                // Top left
                if (row === 0 && col === 0) {
                    models.length = 0
                    primaryTile[0] === 0
                        ? models.push('tileCornerRight', 'tileDead')
                        : models.push('tileCornerLeft', 'tileDead')
                }
                // Top right
                if (row === 6 && col === 0) {
                    models.length = 0
                    primaryTile[0] === 6
                        ? models.push('tileCornerLeft', 'tileDead')
                        : models.push('tileCornerRight', 'tileDead')
                }

            // Add in a condition for the first primary tile
            if (primaryTile[1] === 7) {
                models.length = 0
                models.push('tilePillar')
            }

        // Anything not on edge can have any tile
        } else {

            models.push(
                'tilePillar', 
                'tileDead',
                'tileHall', 
                'tileCornerLeft', 'tileCornerRight',
                'tileWallLeft', 'tileWallForward', 'tileWallRight'
            )

        }

        // If we have not found the barrel yet, we add in tileBarrel, but only if health is below 5
        if ((turn - foundBarrel > 10) && health < 25 && !( row === 0 || row === 6 || col === 0 || col === 6 )) {
            models.push('tileBarrel')
        }

        // If we have not found the barrel yet, we add in tileBarrel, but only if health is below 5
        if ((turn - foundBottle > 10) && health < 40 && !( row === 0 || row === 6 || col === 0 || col === 6 )) {
            models.push('tileBottle')
        }

        return models

    }
    
    // Create a function to sample a tile
    const sampleTile = () => {

        // If base tile model, sample different one
        if (baseTile) {

            // Specific start tile
            if (row === 3 && col === 7) 
            {
                let modelObject = allmodels['tileStart']
                setSelectedModel(modelObject)
                setSelectedModelName('tileStart')
            } 
            
            // Specific clue one tile
            else if (row === 5 && col === 5)
            {
                let modelObject = allmodels['tileDeadBook']
                setSelectedModel(modelObject)
                setSelectedModelName('tileDeadBook')
            }

            // Specific clue two tile
            else if (foundClueOne && row === 1 && col === 1 )
            {
                let modelObject = allmodels['tileCornerBrickLeft']
                setSelectedModel(modelObject)
                setSelectedModelName('tileCornerBrickLeft')
            }

            // End tile
            else if (foundClueOne && foundClueTwo && row === 3 && col === 3 )
            {
                let modelObject = allmodels['tileEnd']
                setSelectedModel(modelObject)
                setSelectedModelName('tileEnd')
            }

            else {
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
            }
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
        tilePillar: [1, 1, 1, 1],
        tileCornerLeft: [0, 0, 1, 1],
        tileCornerBrickLeft: [0, 0, 1, 1],
        tileCornerRight: [1, 0, 0, 1],
        tileCornerBrickRight: [1, 0, 0, 1],
        tileWallLeft: [1, 1, 0, 1], //good
        tileWallForward: [1, 0, 1, 1], //good
        tileWallRight: [0, 1, 1, 1], //good
        tileDead: [0, 0, 0, 1],
        tileDeadBook: [0, 0, 0, 1],
        tileBottle: [1, 1, 1, 1],
        tileBarrel: [0, 0, 0, 1],
        tileHall: [0, 1, 0, 1],
        tileEnd: [0, 0, 0, 1],

    }

    // Creating a function for handling click, pointer over, and pointer out
    let handleClick = (e) => {
            e.stopPropagation()
            setHover(false)
            if(dialogOpen) return
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

            
            // Handling guide
            // If you are on bottom left corner (6, 6)
            // you reset your newDirections to [1, 1, 0]
            if(col==6 && row==6) {
                newDirections = [1, 1, 0]
                // Now you will always correctly show both tile to left and tile above
                // However, if your selected tile is a deadend, need to not show one 
                // tile depending on direction you are coming from.
                if (selectedModelName === 'tileDead' || selectedModelName === 'tileDeadBook' || selectedModelName === 'tileEnd' || selectedModelName === 'tileBarrel') {
                    if (direction==='up') newDirections = [0, 1, 0]
                    if (direction==='left') newDirections = [1, 0, 0]
                }
            // If you are on the right most row
            // We need to splice the 2nd element of new directions.
            } else if(row==6) {
                newDirections.splice(2, 1)
            } else if(neighbors.coords.length < 4) {
                if(!neighbors.directions.includes('right')) newDirections.splice(1, 1) //good
                if(!neighbors.directions.includes('down')) newDirections.splice(4, 1) //good
                if(!neighbors.directions.includes('left')) newDirections.splice(3, 1) //good
                if(!neighbors.directions.includes('up')) newDirections.splice(0, 1) // good
            }

            newNeighbors.coords = newNeighbors.coords.filter((item, index) => {
                return newDirections[index]
            })

            // set new primary and the new live tiles based on the valid ones
            setPrimaryTile([row, col])
            setPrimaryTileType(selectedModelName)
            setTile(selectedModelName)
            setSelectedTiles([...newNeighbors.coords, [row, col]])

            }
        }

        const handlePointerOver = (e) => {
            e.stopPropagation()
            const doc = document.querySelector('body')
            doc.style.cursor = 'pointer'
            setHover(true)
        }

        const handlePointerOut = (e) => {
            e.stopPropagation()
            const doc = document.querySelector('body')
            doc.style.cursor = 'initial'
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
