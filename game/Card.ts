import { Position } from "./Utils"
import { Building, buildingToString } from "./Building"

export enum CardType
{
    None,
    Tile,
    Building,
    Scroll,
    Provisions,
}

export class Card
{
    name: string
    type: CardType
    tooltip: string

    constructor(name: string, type: CardType, tooltip: string)
    {
        this.name = name
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
        super(`${row}-${col}`, CardType.Tile, `This card allows you to place a bunny on tile (${row}, ${col}).`)
        this.pos = {row, col}
    }
}

export class BuildingCard extends Card
{
    building: Building

    constructor(building: Building, tooltip: string)
    {
        super(buildingToString(building), CardType.Building, tooltip)
        this.building = building
    }
}

export class ScrollCard extends Card
{
    /**
     * TODO: Scroll cards need to provide a function that takes a game state and a player and returns an amount of points.
     * something like:
     * scoringFunction: (state: gamestate, player: Player) = number
     * */

    constructor(name: string, tooltip: string)
    {
        super(name, CardType.Scroll, tooltip)
    }
}

export class ProvisionsCard extends Card
{
    constructor()
    {
        super("Provisions", CardType.Provisions, "Immediately draw and play 2 cards")
    }
}
