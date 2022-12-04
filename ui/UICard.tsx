import { Badge, AspectRatio, Box, Tooltip, Button } from '@chakra-ui/react'
import React, { createRef } from 'react';
import { useState } from 'react'
import { BuildingType } from '../game/Building';
import { Gameboard } from "../game/Gameboard";
import { Resource, resourceToChar } from '../game/Resource';
import { Tile, TileType } from "../game/Tile";
import { CampColor, Color, PlayerColors, ResourceColors, TileColors } from '../game/dictionaries/Colors'
import { parseConfigFileTextToJson } from 'typescript';
import { Card } from '../game/Card';

interface CardProps
{
  card: Card
}

interface CardState
{
  card: Card
}


export class UICard extends React.Component<CardProps, CardState>
{
    constructor(props: CardProps)
    {
        super(props)
        this.state = { card: props.card }
    }

    componentDidMount(): void
    {

    }

    render()
    {

        console.log(this.state.card.name)
        // return <div>JAY</div>
        return <Tooltip label={"Jay"}>
            <AspectRatio minW={80} ratio={1/1.5}>
                <Button>
                    {this.state.card.name}
                </Button>
            </AspectRatio>
        </Tooltip>
        return <Tooltip label={this.props.card.tooltip}>
            <AspectRatio minW={80} ratio={1/1.5}>
                <div>
                    {this.props.card.name}
                </div>
            </AspectRatio>
        </Tooltip>

    }

}
