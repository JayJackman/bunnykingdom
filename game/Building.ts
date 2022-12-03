import { Resource, resourceToString } from "./Resource"
import { Color } from "./dictionaries/Colors"

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

export type Building = ResourceBuilding | SkyTowerBuilding | CampBuilding | CityBuilding

interface ResourceBuilding
{
    type: BuildingType.Resource
    resource: Resource
}

interface SkyTowerBuilding
{
    type: BuildingType.SkyTower
    color: Color
}

interface CampBuilding
{
    type: BuildingType.Camp
    campNumber: 1 | 2 | 3 | 4 | 5 | 6
}

interface CityBuilding
{
    type: BuildingType.City
    numSpires: 1 | 2 | 3
}

export function buildingToString(building: Building): string
{
    switch(building.type)
    {
        case BuildingType.City: return `City(${building.numSpires})`
        case BuildingType.Camp: return `Camp(${building.campNumber})`
        case BuildingType.Resource: return resourceToString(building.resource)
        case BuildingType.SkyTower: return `Sky Tower (${building.color})`
    }
}
