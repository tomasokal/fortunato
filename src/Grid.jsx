import { useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import Tile from './Tile.jsx'
import PlayerCharacter from './PlayerCharacter.jsx'

import useGame from './stores/useGame.js'
import { useEffect } from 'react'
import { useControls } from 'leva'

export default function Grid({ rows, columns })
{

    // Pull in game state from stores
    const phase = useGame((state) => state.phase)
    const start = useGame((state) => state.start)
    const restart = useGame((state) => state.restart)
    const health = useGame((state) => state.health)
    const setHealth = useGame((state) => state.setHealth)
    const turn = useGame((state) => state.turn)
    const setTurn = useGame((state) => state.setTurn)

    // Configure grid

        // Set tile count based on row / column argument
        const totalTiles = rows * columns

        // Set tile size to space out the tiles
        const tileSize = 2.25

    // Set up states for primary tile and tile type
    const [primaryTile, setPrimaryTile] = useState([3, 7])
    const [primaryTileType, setPrimaryTileType] = useState('')

    // Update health on every primary tile change
    useEffect(()=> {
        setHealth(health - 1)
        setTurn(turn + 1)
    }, [primaryTile])

    // Create a function to check other tiles around it
    const checkNeighbors = (row, col) => {

        let neighbors = {}
        neighbors.coords = []
        neighbors.directions = []

        // Check north neighbor
        if (row > 0) {
            neighbors.coords.push([row - 1, col])
            neighbors.directions.push('up')
        }

        // Check east neighbor
        if (col < 6) {
            neighbors.coords.push([row, col + 1])
            neighbors.directions.push('right')
        }

        // Check south neighbor
        if (row < 6) {
            neighbors.coords.push([row + 1, col])
            neighbors.directions.push('down')
        }

        // Check west neighbor
        if (col > 0) {
            neighbors.coords.push([row, col - 1])
            neighbors.directions.push('left')
        }

        return neighbors

    }

    // Set up states for the tiles
    const [selectedTiles, setSelectedTiles] = useState(checkNeighbors(3,7)?.coords)

    useEffect(()=> {
        if (phase === 'playing') {
            setPrimaryTile([3, 7])
            setSelectedTiles(checkNeighbors(3,7)?.coords)
        }
    }, [phase])

    // Create tile array to store tiles
    const tiles = []

        // Loop through all the tiles
        for (let i = 0; i < totalTiles; i++)
        {

            let x = i % columns * tileSize
            let y = Math.floor(i / columns) * tileSize

            let row = x / tileSize
            let col = y / tileSize

            let neighbors = checkNeighbors(row, col)

            tiles.push(
                <Tile 
                    key={i}
                    row={row}
                    col={col}
                    positionX={x} 
                    positionZ={y}
                    neighbors={neighbors}
                    selectedTiles={selectedTiles}
                    setSelectedTiles={setSelectedTiles}
                    primaryTile={primaryTile}
                    setPrimaryTile={setPrimaryTile}
                    primaryTileType={primaryTileType}
                    setPrimaryTileType={setPrimaryTileType}
                />
            )

        }

        if(primaryTile[0] === 3 && primaryTile[1] === 7)
        {

            tiles.push(
                <Tile 
                    key={-99}
                    row={3}
                    col={7}
                    positionX={6.75} 
                    positionZ={15.75}
                    neighbors={[3, 6]}
                    selectedTiles={selectedTiles}
                    setSelectedTiles={setSelectedTiles}
                    primaryTile={primaryTile}
                    setPrimaryTile={setPrimaryTile}
                    primaryTileType={primaryTileType}
                    setPrimaryTileType={setPrimaryTileType}
                />
            )

        }

    // Pull in game board?
    const gameBoard = useLoader(GLTFLoader, './board.glb')

    const {adjustX, adjustZ} = useControls({
        adjustX: {value: 0, min: -10, max: 10},
        adjustZ: {value: 0, min: -10, max: 10}
    })

    return <>

        <group>
            {tiles}
            <PlayerCharacter primaryTile={primaryTile} />
            <primitive 
                castShadow
                receiveShadow
                object={ gameBoard.scene.clone() } 
                // rotation={[Math.PI, rotationAdjustment, 0]}
                // position-y={positionAdjustment.y}
                position-x={6.8}
                position-y={0.49}
                position-z={6.8}
            />
        </group>
    
    </>


}
