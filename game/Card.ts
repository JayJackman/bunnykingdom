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

export class TileCard extends Card
{
    pos: Position

    constructor(row: number, col: number)
    {
        super(`Tile: ${row}-${col}`, CardType.Tile, `This card allows you to place a bunny on tile (${row}, ${col}).`)
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
