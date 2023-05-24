import { useState } from 'react'

import Tile from './Tile.jsx'
import PlayerCharacter from './PlayerCharacter.jsx'

import useGame from './stores/useGame.js'
import { useEffect } from 'react'

export default function Grid({ rows, columns })
{

    // Pull in game state from stores
    const phase = useGame((state) => state.phase)
    const start = useGame((state) => state.start)
    const health = useGame((state) => state.health)
    const setHealth = useGame((state) => state.setHealth)

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
        if (phase === 'ended') {
            setPrimaryTile([3, 7])
            setSelectedTiles(checkNeighbors(3,7)?.coords)
        }
    }, [phase])
    console.log(phase)

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
                />
            )

        }

    return <>

        <group>
            {tiles}
            <PlayerCharacter primaryTile={primaryTile} />
        </group>
    
    </>


}
