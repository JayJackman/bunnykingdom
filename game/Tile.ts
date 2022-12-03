import { Position } from "./Utils"
import { Resource } from "./Resource"
import { Building, BuildingType } from "./Building"
import { Color, PlayerColors } from "./dictionaries/Colors"
import { Player } from "./Player"

enum TileType
{
    Meadow = "Meadow",
    Farm = "Farm",
    River = "River",
    Forest = "Forest",
    City = "City",
    Mountain = "Mountain",
}

export function tileTypeToString(type: TileType): string
{
    return TileType[type]
}

class Tile
{
    readonly pos: Position                    /** The tile's position on the game board TODO: do we need this? */
    readonly terrainType: TileType            /** The type of terrain on this tile */
    readonly resource: Resource               /** The resource that this tile inherently produces */
    building?: Building                       /** The building that is on the tile */
    player?: Player                            /** The player that is on the tile */
    lavaLeft?: boolean                        /** Whether or not lava borders on the left */
    lavaRight?: boolean                       /** Whether or not lava borders on the right */
    lavaTop?: boolean                         /** Whether or not lava borders on the top */
    lavaBottom?: boolean                      /** Whether or not lava borders on the bottom */

    constructor(pos: Position, type: TileType)
    {
        this.pos = pos
        this.terrainType = type

        /** Add the default resources for the right tiles */
        switch (type)
        {
            case TileType.Farm:   this.resource = Resource.Carrot; break;
            case TileType.River:  this.resource = Resource.Fish;   break;
            case TileType.Forest: this.resource = Resource.Wood;   break;
            default:              this.resource = Resource.None;   break;
        }

        /** Only a City tile will have a building, in which case it will have a city with 1 spire */
        if (type === TileType.City) this.building = {type: BuildingType.City, numSpires: 1}
    }

    /**
     * This function returns the resources belonging to the Tile.
     * One can come from its inherent TileType, and one can come from
     * its Building
     * @returns a tuple of two resources
     */
    resources(): [Resource, Resource]
    {
        if (this.building && this.building.type === BuildingType.Resource)
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
        if (this.building && this.building.type === BuildingType.City)
        {
            return this.building.numSpires
        }
        return 0
    }

    toString(): string
    {
        return `(${this.pos.row}, ${this.pos.col}): ${TileType[this.terrainType]}`
    }


}

export { TileType, Tile }
