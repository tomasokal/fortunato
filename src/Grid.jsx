import { useState } from 'react'

import Tile from './Tile.jsx'

export default function Grid({ rows, columns })
{

    // Configure grid

        // Set tile count based on row / column argument
        const totalTiles = rows * columns

        // Set tile size to space out the tiles
        const tileSize = 2.25

    // Set up states for the tiles
    const [selectedTiles, setSelectedTiles] = useState([])

    // Create a function to set the selected tile
    function handleTileClick(row, col) {
        const neighbors = checkNeighbors(row, col)
        setSelectedTiles([...neighbors, [row, col]])
        console.log(neighbors)
      }

    // Create a function to check other tiles around it
    const checkNeighbors = (row, col) => {

        var neighbors = []

        // Check north neighbor
        if (row > 0) {
            neighbors.push([row - 1, col])
        }

        // Check south neighbor
        if (row < 6) {
            neighbors.push([row + 1, col])
        }

        // Check west neighbor
        if (col > 0) {
            neighbors.push([row, col - 1])
        }

        // Check east neighbor
        if (col < 6) {
            neighbors.push([row, col + 1])
        }

        return neighbors

    }


    // Create tile array to store tiles
    // const tiles = []

    //     // Loop through all the tiles
    //     for (let i = 0; i < totalTiles; i++)
    //     {

    //         const x = i % columns * tileSize
    //         const y = Math.floor(i / columns) * tileSize

    //         const row = x / tileSize
    //         const col = y / tileSize

    //         tiles.push(
    //             <Tile 
    //                 key={i}
    //                 row={row}
    //                 col={col}
    //                 positionX={x} 
    //                 positionZ={y}
    //                 status={selectedTiles.some(
    //                     (tile) => tile[0] === row && tile[1] === col
    //                 )}
    //                 onClick={() => handleTileClick(row, col)}
    //             />
    //         )

    //     }

    return <>

        <group>
            {Array.from({ length: 7 }, (_, row) =>
                Array.from({ length: 7 }, (_, col) => (
                    <Tile
                        key={`${row}-${col}`}
                        row={row}
                        col={col}
                        positionX={row * tileSize}
                        positionZ={col * tileSize}
                        status={selectedTiles.some(
                            (tile) => tile[0] === row && tile[1] === col
                        )}
                        onClick={() => handleTileClick(row, col)}
                    />
                ))
            )}
        </group>
    
    </>


}
