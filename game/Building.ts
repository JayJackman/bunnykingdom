import { Color } from "./Utils"
import { Resource, resourceToString } from "./Resource"

export enum BuildingType
{
    None,

    City,
    Camp,
    SkyTower,
    Resource,
}
export function buildingTypeToString(type: BuildingType)
{
    return BuildingType[type]
}

export interface Building
{
    type: BuildingType
    resource?: Resource
    color?: "blue" | "black" | "red"
    campNumber?: number
    numSpires?: number
}

export function buildingToString(building: Building): string
{
    switch(building.type)
    {
        case BuildingType.None: return "None"
        case BuildingType.City: return `City(${building.numSpires})`
        case BuildingType.Camp: return `Camp(${building.campNumber})`
        case BuildingType.Resource: return resourceToString(building.resource)
        case BuildingType.SkyTower: return `Sky Tower (${building.color})`
    }
}
