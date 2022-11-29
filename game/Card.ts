import { Position } from "./Utils"
import { Building, buildingToString } from "./Building"

export enum CardType
{
    None,
    Tile,
    Building,
    Scroll,
}

export class Card
{
    type: CardType
    tooltip: string

    constructor(type: CardType, tooltip: string)
    {
        this.type = type
        this.tooltip = tooltip
    }
}

// export interface Card
// {
//     type: CardType
//     tooltip: string
// }

// export interface TileCard extends Card
// {
//     pos: Position
// }

// export interface BuildingCard extends Card
// {
//     name: string
//     building: Building
// }

// export interface ScrollCard extends Card
// {
//     name: string
//     /**
//      * TODO: Scroll cards need to provide a function that takes a game state and a player and returns an amount of points.
//      * something like:
//      * scoringFunction: (state: gamestate, player: Player) = number
//      * */
// }

// /** TODO: deal with this better somehow */
// export interface ProvisionsCard extends Card
// {
//     name: string
// }

export class TileCard extends Card
{
    pos: Position

    constructor(row: number, col: number)
    {
        super(CardType.Tile, `This card allows you to place a bunny on tile (${row}, ${col}).`)
        this.pos = {row, col}
    }
}

export class BuildingCard extends Card
{
    name: string
    building: Building

    constructor(building: Building, tooltip: string)
    {
        super(CardType.Building, tooltip)
        this.building = building
        this.name = buildingToString(building)
    }
}

export class ScrollCard extends Card
{
    name: string
    /**
     * TODO: Scroll cards need to provide a function that takes a game state and a player and returns an amount of points.
     * something like:
     * scoringFunction: (state: gamestate, player: Player) = number
     * */

    constructor(name: string, tooltip: string)
    {
        super(CardType.Scroll, tooltip)
        this.name = name
    }
}


// export { TileCard, BuildingCard, ScrollCard }
