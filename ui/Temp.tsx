import { Badge, AspectRatio, Box, Tooltip, Button, SimpleGrid } from '@chakra-ui/react'
import React, { createRef } from 'react';
import { BunnyKingdomGame } from '../game/BunnykingdomGame';
import { Card } from '../game/Card';
import { PlayerColors } from '../game/dictionaries/Colors';
import { Gameboard } from '../game/Gameboard';
import { UICard } from './UICard';

interface GameProps
{
}

interface GameState
{
  game: BunnyKingdomGame
}


export class UIGame extends React.Component<GameProps, GameState>
{
    constructor(props: GameProps)
    {
        super(props)
        this.state = { game: new BunnyKingdomGame() }
    }

    componentDidMount(): void
    {
        this.state.game.handleAddPlayer("Jay", PlayerColors.White)
        this.state.game.handleAddPlayer("Rachel", PlayerColors.Pink)
        let jay = this.state.game.players[0]
        let rachel = this.state.game.players[1]
        this.state.game.handleStartGame()
        console.log(jay.hand)
        console.log(rachel.hand)
    }

    render()
    {
        console.log("rendering hand")
        return (
            <SimpleGrid columns={5} spacing={1}>
                {
                    this.state.game.players[0].hand.map((card, index) =>
                    {
                        return <UICard key={index} card={card}/>
                    })

                }
            </SimpleGrid>
        )

    }

}
