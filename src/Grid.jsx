import { useState } from 'react'

import Tile from './Tile.jsx'
import PlayerCharacter from './PlayerCharacter.jsx'

export default function Grid({ rows, columns })
{

    // Configure grid

        // Set tile count based on row / column argument
        const totalTiles = rows * columns

        // Set tile size to space out the tiles
        const tileSize = 2.25

    const [primaryTile, setPrimaryTile] = useState([3, 7])

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
                />
            )

        }

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

    return <>

        <group>
            {tiles}
            <PlayerCharacter primaryTile={primaryTile} />
        </group>
    
    </>


}
