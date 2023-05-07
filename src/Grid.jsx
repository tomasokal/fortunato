import Tile from './Tile.jsx'

export default function Grid({ rows, columns })
{

    const totalTiles = rows * columns
    console.log(getNeighboringCells(7, 7, 1, 0))

    const tileSize = 2.25

    const tiles = []

    for (let i = 0; i < totalTiles; i++)
    {

        const x = i % columns * tileSize
        const y = Math.floor(i / columns) * tileSize

        tiles.push(<Tile key={i} positionX={x} positionZ={y} />)

    }

    return <>

        <gridHelper />

        <group>
            {tiles}
        </group>
    
    </>


}

function getNeighboringCells(m, n, m_index, n_index) {

    const neighbors = []

    // Iterate over neighboring rows
    for (let i = Math.max(0, m_index - 1); i <= Math.min(m - 1, m_index + 1); i++) {
        // Iterate over neighboring columns
        for (let j = Math.max(0, n_index - 1); j <= Math.min(n - 1, n_index + 1); j++) {
            // Skip the current cell
            if (i === m_index && j === n_index) {
                continue
            }
            neighbors.push([i, j])
        }
    }

    return neighbors
}

