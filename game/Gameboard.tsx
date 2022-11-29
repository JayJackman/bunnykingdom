import { Resource } from './Resource'
import { Tile, TileType } from './Tile'
import { Building, BuildingType } from './Building'
import { Position } from './Utils'

/**
 * Declare some constants here.
 * TODO: I would like to figureout how to add these to some sort of "defaults" class
 * */
let height = 10
let width = 10
let boardLayout =
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
let lavalFlows =
[
    [{row: 1, col: 0}, {row: 1, col: 0}],
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
                switch(row)
                {
                    case 0: this.board[row][col].building = { type: BuildingType.Camp, campNumber: 1 }; break;
                    case 1: this.board[row][col].building = { type: BuildingType.City, numSpires: 2 }; break;
                    case 2: this.board[row][col].building = { type: BuildingType.Resource, resource: Resource.Mushroom }; break;
                    case 3: this.board[row][col].building = { type: BuildingType.SkyTower, color: "red"}; break;
                }
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

    placeBuilding(building: Building, {row, col}: Position): boolean
    {
        if (this.board[row][col].building.type === BuildingType.None)
        {
            this.board[row][col].building = building
            return true
        }
        return false
    }
}

function emptyTile()
{
    return {
        pos: {row: 0, col: 0},
        type: TileType.Meadow,
        resource: Resource.Carrot,
        building: {type: BuildingType.City},
        occupied: false,

        resources(): [Resource, Resource] {return [Resource.Carrot, Resource.Carrot]},
        power(): number { return 0 }
    }
}
