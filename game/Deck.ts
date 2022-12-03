
import { Card, ScrollCard, TileCard, BuildingCard, CardType, ProvisionsCard } from './Card'
import { getScrollCards } from './dictionaries/ScrollCards'
import { Building, BuildingType } from './Building'
import { Resource } from './Resource'
import { Position, shuffleArray } from './Utils'
import { Color, SkyTowerColors } from './dictionaries/Colors'


const NUM_CAMPS: number = 6
const NUM_CITIES_1 = 20
const NUM_CITIES_2 = 10
const NUM_CITIES_3 = 3
const NUM_PROVISONS = 2

export class Deck
{
    deck: Card[] = []

    constructor()
    {
        /** Make the scroll cards */
        for (let card of getScrollCards())
        {
            this.deck.push(card)
        }

        /** Make the Building cards */

        /** Camps */
        for (let i = 0; i < NUM_CAMPS; i++)
        {
            let camp: Building = { type: BuildingType.Camp, campNumber: i as 1| 2 |3 | 4 | 5 | 6 }
            let tooltip: string = "Place a camp token and one of your rabbits on an empty territory"
            this.deck.push( new BuildingCard(camp, tooltip) )
        }

        /** 1-spire cities */
        for (let i = 0; i < NUM_CITIES_1; i++)
        {
            let city: Building = { type: BuildingType.City, numSpires: 1}
            let tooltip: string = "Place a 1-spire City on one of your controlled territories"
            this.deck.push( new BuildingCard(city, tooltip))
        }

        /** 2-spire cities */
        for (let i = 0; i < NUM_CITIES_2; i++)
        {
            let city: Building = { type: BuildingType.City, numSpires: 2}
            let tooltip: string = "Place a 2-spire City on one of your controlled territories"
            this.deck.push( new BuildingCard(city, tooltip))
        }

        /** 3-spire cities */
        for (let i = 0; i < NUM_CITIES_3; i++)
        {
            let city: Building = { type: BuildingType.City, numSpires: 3}
            let tooltip: string = "Place a 3-spire City on one of your controlled mountain territories"
            this.deck.push( new BuildingCard(city, tooltip))
        }

        /** Sky Towers */
        let skytower: Building = { type: BuildingType.SkyTower, color: SkyTowerColors.Blue}
        let tooltip: string = "Place the blue Sky Tower buildings on two of your controlled territories in separate fiefs to connect them"
        this.deck.push( new BuildingCard(skytower, tooltip))

        skytower.color = SkyTowerColors.Purple
        tooltip = "Place the black Sky Tower buildings on two of your controlled territories in separate fiefs to connect them"
        this.deck.push( new BuildingCard(skytower, tooltip))

        skytower.color = SkyTowerColors.Red
        tooltip = "Place the red Sky Tower buildings on two of your controlled territories in separate fiefs to connect them"
        this.deck.push( new BuildingCard(skytower, tooltip))

        /** Resource Buildings */

        /** Basic resources */
        let building: Building = { type: BuildingType.Resource, resource: Resource.Carrot}
        tooltip = "Place the carrot building onto a controlled territory to produce carrot"
        this.deck.push( new BuildingCard(building, tooltip))

        building = { type: BuildingType.Resource, resource: Resource.Wood}
        tooltip = "Place the wood building onto a controlled territory to produce wood"
        this.deck.push( new BuildingCard(building, tooltip))

        building = { type: BuildingType.Resource, resource: Resource.Fish}
        tooltip = "Place the fish building onto a controlled territory to produce fish"
        this.deck.push( new BuildingCard(building, tooltip))

        /** Luxury resources */
        building = { type: BuildingType.Resource, resource: Resource.Pearl}
        tooltip = "Place the pearl building onto a controlled river territory to produce pearl"
        this.deck.push( new BuildingCard(building, tooltip))

        building = { type: BuildingType.Resource, resource: Resource.Mushroom}
        tooltip = "Place the mushroom building onto a controlled forest territory to produce mushroom"
        this.deck.push( new BuildingCard(building, tooltip))

        building = { type: BuildingType.Resource, resource: Resource.CarrotSpice}
        tooltip = "Place the carrot spice building onto a controlled farm territory to produce carrot spice"
        this.deck.push( new BuildingCard(building, tooltip))

        building = { type: BuildingType.Resource, resource: Resource.Copper}
        tooltip = "Place the copper building onto a controlled mountain territory to produce copper"
        this.deck.push( new BuildingCard(building, tooltip))

        building = { type: BuildingType.Resource, resource: Resource.Iron}
        tooltip = "Place the iron building onto a controlled mountain territory to produce iron"
        this.deck.push( new BuildingCard(building, tooltip))

        building = { type: BuildingType.Resource, resource: Resource.Gold}
        tooltip = "Place the gold building onto a controlled mountain territory to produce gold"
        this.deck.push( new BuildingCard(building, tooltip))

        building = { type: BuildingType.Resource, resource: Resource.Diamond}
        tooltip = "Place the diamond building onto a controlled mountain territory to produce diamond"
        this.deck.push( new BuildingCard(building, tooltip))

        /** Variable resource */
        building = { type: BuildingType.Resource, resource: Resource.Variable}
        tooltip = "Place the variable building onto a controlled territory to produce either carrot, wood, or fish. The produced resource can change between rounds"
        this.deck.push( new BuildingCard(building, tooltip))

        /** Make the tile cards */
        /** TODO: MAKE A GLOBAL CONSTANTS FILE! */
        for (let row = 0; row < 10; row++)
        {
            for (let col = 0; col < 10; col++)
            {
                this.deck.push( new TileCard(row, col))
            }
        }

        /** Make the provisions cards */
        for (let i = 0; i < NUM_PROVISONS; i++)
        {
            this.deck.push( new ProvisionsCard())
        }
    }

    /**
     * Shuffle the deck
     */
    shuffle(): void
    {
        shuffleArray<Card>(this.deck)
    }

    /**
     * Deal the first num cards. Can optionally shuffle beforehand
     */
    deal(num: number, shuffle: boolean = false): Card[]
    {
        if (shuffle) this.shuffle()
        return this.deck.splice(0, num)
    }
}
