import { Resource } from './Resource'
import { Tile, TileType } from './Tile'
import { Building, BuildingType } from './Building'
import { Position } from './Utils'
import { Color, SkyTowerColors } from './dictionaries/Colors'
import { Player } from './Player'

/**
 * Declare some constants here.
 * TODO: I would like to figureout how to add these to some sort of "defaults" class
 * */
const height = 10
const width = 10
const boardLayout =
[
    ['f', 'f', 'f', 'c', 'r', 'r', 'r', 'f', 'p', 'r'],
    ['m', 'm', 'c', 'r', 'r', 'm', 'c', 'p', 'c', 'r'],
    ['c', 'm', 'p', 'r', 'r', 'm', 's', 'm', 'm', 'p'],
    ['p', 'm', 'c', 's', 'm', 'm', 's', 'p', 'c', 'f'],
    ['f', 'p', 's', 'p', 'p', 'c', 'p', 's', 'p', 'c'],
    ['f', 'm', 'm', 'f', 'f', 'p', 's', 'c', 'f', 'p'],
    ['f', 'c', 'p', 'p', 'c', 'p', 's', 'p', 'c', 'p'],
    ['p', 's', 'c', 's', 'p', 'p', 'c', 'p', 'p', 'f'],
    ['c', 'p', 'p', 'r', 'r', 'p', 'm', 'm', 'c', 'f'],
    ['f', 'f', 'c', 'r', 'r', 's', 'm', 'm', 'r', 'r']
]
const lavalFlows =
[
    [{row: 1, col: 0}, {row: 1, col: 1}],
    [{row: 1, col: 5}, {row: 2, col: 5}],
    [{row: 2, col: 7}, {row: 2, col: 8}],
    [{row: 2, col: 1}, {row: 3, col: 1}],
    [{row: 3, col: 5}, {row: 3, col: 6}],
    [{row: 5, col: 1}, {row: 5, col: 2}],
    [{row: 8, col: 6}, {row: 9, col: 6}],
    [{row: 8, col: 7}, {row: 9, col: 7}]
]

export class Gameboard
{
    board: Tile[][]

    constructor()
    {
        this.board = []

        let type: TileType
        for (let row = 0; row < height; row++)
        {
            /** TODO: I don't like this but whatever */
            this.board[row] = Array<Tile>(10).fill(emptyTile())
            for (let col = 0; col < width; col++)
            {
                switch (boardLayout[row][col])
                {
                    case "p": type = TileType.Meadow; break;
                    case "s": type = TileType.Farm; break;
                    case "r": type = TileType.River; break;
                    case "f": type = TileType.Forest; break;
                    case "c": type = TileType.City; break;
                    case "m": type = TileType.Mountain; break;
                    default:  throw new Error(`Bad character in board layout: ${boardLayout[row][col]}`)
                }
                this.board[row][col] = new Tile({row, col}, type)
                /** TODO: DELETE THIS JUST FOR TESTING */
                // switch(row)
                // {
                //     case 0: this.board[row][col].building = { type: BuildingType.Camp, campNumber: 1 }; break;
                //     case 1: this.board[row][col].building = { type: BuildingType.City, numSpires: 2 }; break;
                //     case 2: this.board[row][col].building = { type: BuildingType.Resource, resource: Resource.Gold }; break;
                //     case 3: this.board[row][col].building = { type: BuildingType.SkyTower, color: SkyTowerColors.Purple}; break;
                // }
            }
        }

        for (let [pos1, pos2] of lavalFlows)
        {
            /** Right of first pos, left of second pos */
            if (pos1.row === pos2.row)
            {
                this.board[pos1.row][pos1.col].lavaRight = true;
                this.board[pos2.row][pos2.col].lavaLeft = true;
            }
            /** Bottom of first pos, top of second pos */
            else
            {
                this.board[pos1.row][pos1.col].lavaBottom = true;
                this.board[pos2.row][pos2.col].lavaTop = true;
            }
        }
    }

    placeBuilding(building: Building, {row, col}: Position): void
    {
        this.board[row][col].building = building
    }

    placeBunny({row, col}: Position, player: Player): void
    {
        let tile = this.board[row][col]
        /** if someone was squatting on this hex, remove the camp*/
        if (tile.building && tile.building.type === BuildingType.Camp)
        {
            tile.building = undefined
        }
        /** If there wasn't a camp and someone is already there, we can't place a bunny here */
        else if (tile.player) throw new Error(`Can't play bunny on (${row}, ${col}) as it is occupied`)

        /** Finally, set the playerId to the new player */
        tile.player = player
    }
}

function emptyTile(): Tile
{
    return {
        pos: {row: 0, col: 0},
        terrainType: TileType.Meadow,
        resource: Resource.Carrot,
        building: undefined,

        resources(): [Resource, Resource] {return [Resource.Carrot, Resource.Carrot]},
        power(): number { return 0 }
    }
}
