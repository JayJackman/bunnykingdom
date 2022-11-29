import { Position } from "./Utils"
import { Building, buildingToString } from "./Building"

export enum CardType
{
    None,
    Tile,
    Building,
    Scroll,
}

export interface Card
{
    type: CardType
    tooltip: string
}

export interface TileCard extends Card
{
    pos: Position
}

export interface BuildingCard extends Card
{
    name: string
    building: Building
}

export interface ScrollCard extends Card
{
    name: string
    /**
     * TODO: Scroll cards need to provide a function that takes a game state and a player and returns an amount of points.
     * something like:
     * scoringFunction: (state: gamestate, player: Player) = number
     * */
}

// class TileCard implements Card
// {
//     type: CardType = CardType.Tile
//     tooltip: string
//     pos: Position

//     constructor(row: number, col: number)
//     {
//         this.pos = {row, col}
//         this.tooltip = `This card allows you to place a bunny on tile (${row}, ${col}).`
//     }
// }
// class BuildingCard implements Card
// {
//     type: CardType = CardType.Building
//     tooltip: string
//     name: string
//     building: Building

//     constructor(building: Building, tooltip: string)
//     {
//         this.building = building
//         this.tooltip = tooltip
//         this.name = buildingToString(building)
//     }
// }

// class ScrollCard implements Card
// {
//     type: CardType = CardType.Scroll
//     tooltip: string
//     name: string

//     constructor(name: string, tooltip: string)
//     {
//         this.name = name
//         this.tooltip = tooltip
//     }
// }


// export { TileCard, BuildingCard, ScrollCard }
