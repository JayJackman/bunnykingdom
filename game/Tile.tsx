import { Position } from "./Utils"
import { Resource } from "./Resource"
import { Building, BuildingType } from "./Building"

enum TileType
{
    Meadow,
    Farm,
    River,
    Forest,
    City,
    Mountain
}

class Tile
{
    readonly pos: Position
    readonly type: TileType
    readonly resource: Resource
    building: Building
    occupied: boolean = false /** TODO: replace this with a Player?: optional once the Player class is made */
    lavaLeft?: boolean
    lavaRight?: boolean
    lavaTop?: boolean
    lavaBottom?: boolean

    constructor(pos: Position, type: TileType)
    {
        this.pos = pos
        this.type = type

        switch (type)
        {
            case TileType.Farm:   this.resource = Resource.Carrot; break;
            case TileType.River:  this.resource = Resource.Fish;   break;
            case TileType.Forest: this.resource = Resource.Wood;   break;
            default:              this.resource = Resource.None;   break;
        }

        /** Only a City tile will have a building, in which case it will have a city with 1 spire */
        if (type === TileType.City) this.building = {type: BuildingType.City, numSpires: 1}
        else                        this.building = {type: BuildingType.None}
    }

    /**
     * This function returns the resources belonging to the Tile.
     * One can come from its inherent TileType, and one can come from
     * its Building
     * @returns a tuple of two resources
     */
    resources(): [Resource, Resource]
    {
        if (this.building.resource)
        {
            return [this.resource, this.building.resource]
        }
        return [this.resource, Resource.None]
    }

    /**
     * This function returns the power for this Tile, equal to the number
     * of spires on the city on this Tile. If there is no city, returns 0
     * @returns the number of spires for the city on this tile
     */
    power(): number
    {
        if (this.building.numSpires)
        {
            return this.building.numSpires
        }
        return 0
    }

    toString(): string
    {
        return `(${this.pos.row}, ${this.pos.col}): ${TileType[this.type]}`
    }


}

export { TileType, Tile}
