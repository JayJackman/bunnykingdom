import { Badge, AspectRatio, Box } from '@chakra-ui/react'
import React, { createRef } from 'react';
import { useState } from 'react'
import { BuildingType } from '../game/Building';
import { Gameboard } from "../game/Gameboard";
import { Resource, resourceToChar } from '../game/Resource';
import { Tile, TileType } from "../game/Tile";
import { Color, PlayerColors, ResourceColors, TileColors } from '../game/dictionaries/Colors'
import { parseConfigFileTextToJson } from 'typescript';

interface TileProps
{
  tile: Tile
}

interface TileState
{
  tile: Tile
}


export class UITile extends React.Component<TileProps, TileState>
{
  private canvasRef: React.RefObject<HTMLCanvasElement>

  constructor(props: TileProps)
  {
    super(props)
    this.state = { tile: props.tile }
    this.canvasRef = createRef()

    this.drawSomething = this.drawSomething.bind(this);
  }

  componentDidMount(): void
  {
    const canvas = this.canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    // context.fillStyle = Colors.Red
    // context.fillRect(0,0,canvas.width,canvas.height)
    this.drawSomething()
  }

  render()
  {
    return <AspectRatio minW={50} ratio={1}>
      <canvas onClick = {this.drawSomething} ref={this.canvasRef} width={100} height={100}>
        {/* {buildingChar(this.state.tile)} */}
        {/* {this.drawSomething()} */}
      </canvas>
    </AspectRatio>
  }

  drawSomething()
  {
    const canvas = this.canvasRef.current
    if (!canvas) {console.log("not canvas"); return }
    const context = canvas.getContext('2d')
    if( !context ) { console.log("not context");return}

    const tile = this.state.tile
    /** These are for outlines */
    context.strokeStyle = Color.Black
    context.lineWidth = 5

    /** Draw the background */
    switch (tile.terrainType)
    {
      case TileType.City: context.fillStyle = TileColors.City; break;
      case TileType.Farm: context.fillStyle = TileColors.Farm; break;
      case TileType.Mountain: context.fillStyle = TileColors.Mountain; break;
      case TileType.Forest: context.fillStyle = TileColors.Forest; break;
      case TileType.River: context.fillStyle = TileColors.River; break;
      case TileType.Meadow: context.fillStyle = TileColors.Meadow; break;
    }
    context.fillRect(0,0,canvas.width, canvas.height)

    /** Draw the text for the resources */
    let [base, luxury] = tile.resources()
    context.font = "20px Arial"
    let baseText = resourceToChar(base)
    let luxuryText = resourceToChar(luxury)
    let baseWidth = context.measureText(baseText).width
    let luxuryWidth = context.measureText(luxuryText).width

    context.fillStyle = TileColors.TextBackground
    if (base != Resource.None)
    {
      context.fillRect(0,75, baseWidth + 10, 25)
    }
    if (luxury != Resource.None) context.fillRect(canvas.width - luxuryWidth - 10, 75, luxuryWidth + 10, 25)

    context.fillStyle = TileColors.TextForeground
    context.fillText(baseText, 5, 95)
    context.fillText(luxuryText, canvas.width - luxuryWidth - 5, 95)

    /** Draw the Building */
    switch (tile.building?.type)
    {
      case BuildingType.Resource:
      {
        let luxury = true
        switch (tile.building.resource)
        {
          case Resource.Carrot: context.fillStyle = ResourceColors.Carrot; luxury = false; break;
          case Resource.Wood: context.fillStyle = ResourceColors.Wood;luxury = false; break;
          case Resource.Fish: context.fillStyle = ResourceColors.Fish; luxury = false; break;
          case Resource.Variable: luxury = false; break;
          case Resource.CarrotSpice: context.fillStyle = ResourceColors.CarrotSpice; break;
          case Resource.Mushroom: context.fillStyle = ResourceColors.Mushroom; break;
          case Resource.Pearl: context.fillStyle = ResourceColors.Pearl; break;
          case Resource.Copper: context.fillStyle = ResourceColors.Copper; break;
          case Resource.Iron: context.fillStyle = ResourceColors.Iron; break;
          case Resource.Gold: context.fillStyle = ResourceColors.Gold; break;
          case Resource.Diamond: context.fillStyle = ResourceColors.Diamond; break;
        }
        /** if luxury resource, draw a shuriken thingy */
        if (luxury)
        {
          context.beginPath()
          context.moveTo(8,50)
          context.lineTo(37,37)
          context.lineTo(50,8)
          context.lineTo(63,37)
          context.lineTo(92,50)
          context.lineTo(63,63)
          context.lineTo(50,92)
          context.lineTo(37,63)
          context.closePath()
          context.lineWidth = 5
          context.stroke()
          context.fill()
        }
        /** Else, draw a triangle */
        else
        {
          context.beginPath()
          context.moveTo(20,31)
          context.lineTo(80,31)
          context.lineTo(50,87)
          context.closePath()
          context.lineWidth = 5
          context.stroke()
          context.fill()
        }

        break;
      }
      case BuildingType.City:
      {
        context.fillStyle = TileColors.Lava
        context.beginPath()
        context.arc(canvas.width/2, canvas.height/2, canvas.width/4.5, 0, 2*Math.PI)
        context.fill()
        // context.fillStyle = "fill"
        if (tile.building.numSpires === 1 || tile.building.numSpires === 3)
        {
          context.beginPath()
          context.moveTo(50,2)
          context.lineTo(60,18)
          context.lineTo(40,18)
          context.fill()
          context.fillRect(canvas.width/2 - canvas.width/32, canvas.height/16, canvas.width/16, canvas.width/2)
        }
        if (tile.building.numSpires === 2 || tile.building.numSpires === 3)
        {
          context.beginPath()
          context.moveTo(10,10)
          context.lineTo(30,15)
          context.lineTo(15,30)
          context.closePath()
          // context.strokeStyle = "black"
          // context.lineWidth = 2
          // context.stroke()
          context.fill()
          context.beginPath()
          context.moveTo(20,15)
          context.lineTo(50,45)
          context.lineTo(45,50)
          context.lineTo(15,20)
          context.fill()
          context.beginPath()
          context.moveTo(90,10)
          context.lineTo(70,15)
          context.lineTo(85,30)
          context.fill()
          context.beginPath()
          context.moveTo(80,15)
          context.lineTo(50,45)
          context.lineTo(55,50)
          context.lineTo(85,20)
          context.fill()
        }
        break;
      }
      case BuildingType.SkyTower:
      {
        context.fillStyle = tile.building.color
        context.fillRect(canvas.width/4, canvas.height/4, canvas.width/2, canvas.height/2)
        context.lineWidth = 3
        context.strokeRect(canvas.width/4, canvas.height/4, canvas.width/2, canvas.height/2)
        break;
      }
      case BuildingType.Camp:
      {
        break;
      }
    }

    /** Draw the lava flows */
    if (tile.lavaLeft)
    {
      context.fillStyle = TileColors.Lava
      let numPix = 0.04*canvas.width
      context.fillRect(0,0,numPix,canvas.height)
    }
    if (tile.lavaRight)
    {
      context.fillStyle = TileColors.Lava
      let numPix = 0.04*canvas.width
      context.fillRect(canvas.width - numPix,0,canvas.width,canvas.height)
    }
    if (tile.lavaTop)
    {
      context.fillStyle = TileColors.Lava
      let numPix = 0.04*canvas.height
      context.fillRect(0,0,canvas.width,numPix)
    }
    if (tile.lavaBottom)
    {
      context.fillStyle = TileColors.Lava
      let numPix = 0.04*canvas.width
      context.fillRect(0,canvas.height-numPix,canvas.width,canvas.height)
    }


    /** Draw the bunny */
    if (tile.player)
    {
      context.fillStyle = tile.player.color as string
      context.beginPath()
      context.arc(canvas.width/2, canvas.height/2, canvas.width/8, 0, 2*Math.PI)
      context.lineWidth = 5
      context.stroke()
      context.fill()
    }




    // context.fillStyle = Colors.Yellow
    // context.beginPath()
    // context.arc(canvas.width/2, canvas.height/2, canvas.width/4, 0, 2*Math.PI)
    // context.fillStyle = "fill"
    // context.fill()

    // context.fillStyle = Colors.Green
    // context.fillRect(0,0,100,100)
    // console.log('d')
    return
  }
}



// export function UITile({tile}: {tile: Tile})
// {
//   return (
//     <AspectRatio minW={50} ratio={1}>
//       <Badge
//           onClick={() => handleChange(tile)}
//           bg={tileColor(tile)}>
//             {buildingChar(tile)}
//       </Badge>
//     </AspectRatio>
//   );
// }


function buildingChar(tile: Tile): string
{
  if (!tile.building) return ""

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
