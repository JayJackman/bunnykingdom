
import { Card, ScrollCard, TileCard, BuildingCard, CardType } from './Card'
import { getScrollCards } from './dictionaries/ScrollCards'
import { Building, BuildingType } from './Building'

export class Deck
{
    deck: Card[] = []
    NUM_CAMPS: number = 6
    NUM_CITIES_1 = 20
    NUM_CITIES_2 = 10
    NUM_CITIES_3 = 3

    constructor()
    {
        /** Make the scroll cards */
        for (let card of getScrollCards())
        {
            this.deck.push(card)
        }

        /** Make the Building cards */

        /** Camps */
        for (let i = 0; i < this.NUM_CAMPS; i++)
        {
            let camp: Building = {type: BuildingType.Camp, campNumber: i}
            let tooltip: string = "Place a camp token and one of your rabbits on an empty territory"
            this.deck.push( new BuildingCard(camp, tooltip) )
        }

        /** 1-spire cities */
        for (let i = 0; i < this.NUM_CITIES_1; i++)
        {
            let city: Building = { type: BuildingType.City, numSpires: 1}
            let tooltip: string = "Place a 1-spire City on one of your controlled territories"
            this.deck.push( new BuildingCard(city, tooltip))
        }

        /** 2-spire cities */
        for (let i = 0; i < this.NUM_CITIES_1; i++)
        {
            let city: Building = { type: BuildingType.City, numSpires: 2}
            let tooltip: string = "Place a 2-spire City on one of your controlled territories"
            this.deck.push( new BuildingCard(city, tooltip))
        }

        /** 3-spire cities */
        for (let i = 0; i < this.NUM_CITIES_1; i++)
        {
            let city: Building = { type: BuildingType.City, numSpires: 3}
            let tooltip: string = "Place a 3-spire City on one of your controlled mountain territories"
            this.deck.push( new BuildingCard(city, tooltip))
        }

        /** Sky Towers */
        let skytower: Building = { type: BuildingType.SkyTower, color: "blue"}
        let tooltip: string = "Place the blue Sky Tower buildings on two of your controlled territories in separate fiefs to connect them"
        this.deck.push( new BuildingCard(skytower, tooltip))

        skytower.color = "black"
        tooltip = "Place the black Sky Tower buildings on two of your controlled territories in separate fiefs to connect them"
        this.deck.push( new BuildingCard(skytower, tooltip))

        skytower.color = "red"
        tooltip = "Place the red Sky Tower buildings on two of your controlled territories in separate fiefs to connect them"
        this.deck.push( new BuildingCard(skytower, tooltip))

        /** Resources */
    }
}
