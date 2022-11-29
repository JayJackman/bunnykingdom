import { Badge, AspectRatio, Box } from '@chakra-ui/react'
import { useState } from 'react'
import { BuildingType } from '../game/Building';
import { Gameboard } from "../game/Gameboard";
import { resourceToChar } from '../game/Resource';
import { Tile, TileType } from "../game/Tile";

export function UITile({tile}: {tile: Tile})
{
  return (
    <AspectRatio minW={50} ratio={1}>
      <Badge
          onClick={() => handleChange(tile)}
          bg={tileColor(tile)}>
            {buildingChar(tile)}
      </Badge>
    </AspectRatio>
  );
}

function tileColor(tile: Tile): string
{
  switch(tile.type)
  {
    case TileType.City: return "beige"
    case TileType.Farm: return "orange"
    case TileType.Forest: return "green"
    case TileType.Meadow: return "lightgreen"
    case TileType.Mountain: return "gray"
    case TileType.River: return "blue"
  }
}

function buildingChar(tile: Tile): string
{
  switch (tile.building.type)
  {
    case BuildingType.Camp: return `C(${tile.building.campNumber})`
    case BuildingType.City: return `${tile.building.numSpires}`
    case BuildingType.Resource: return tile.building.resource ? resourceToChar(tile.building.resource) : ""
    case BuildingType.SkyTower: return "ST"
    default: return ""
  }
}

function handleChange(tile: Tile): void
{
  console.log(`Wow: ${tile.pos.row}, ${tile.pos.col}`)
}
