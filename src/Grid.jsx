import Tile from './Tile.jsx'

export default function Grid({ rows, columns })
{

    const totalTiles = rows * columns

    const tileSize = 2.25

    const tiles = []

    for (let i = 0; i < totalTiles; i++)
    {

        const x = i % columns * tileSize
        const y = Math.floor(i / columns) * tileSize

        tiles.push(
            <Tile key={i} positionX={x} positionZ={y} />
        )

    }

    return <>

        <group>
            {tiles}
        </group>
    
    </>


}
