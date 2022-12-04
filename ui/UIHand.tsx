import { Badge, AspectRatio, Box, Tooltip, Button, SimpleGrid } from '@chakra-ui/react'
import React, { createRef } from 'react';
import { Card } from '../game/Card';
import { UICard } from './UICard';

interface HandProps
{
  hand: Card[]
}

interface HandState
{
  hand: Card[]
}


export class UIHand extends React.Component<HandProps, HandState>
{
    constructor(props: HandProps)
    {
        super(props)
        this.state = { hand: props.hand }
    }

    componentDidMount(): void
    {

    }

    render()
    {
        console.log("rendering hand")
        return (
            <SimpleGrid columns={5} spacing={1}>
                {
                    this.state.hand.map((card, index) =>
                    {
                        return <UICard key={index} card={card}/>
                    })

                }
            </SimpleGrid>
        )

    }

}




// import { SimpleGrid, Flex, Heading, Tooltip } from '@chakra-ui/react'
// import { Card } from '../game/Card';
// import { Gameboard } from "../game/Gameboard";
// import { UICard } from './UICard';
// import { UITile } from './UITile';


// export function UIHand({hand}: {hand: Card[]})
// {
//   return (
//     <SimpleGrid columns={5} spacing={1}>
//       {
//         hand.map((card, index) =>
//         {
//             return <UICard key={index} card={card}/>
//         })

//       }
//     </SimpleGrid>
//   );
// }
