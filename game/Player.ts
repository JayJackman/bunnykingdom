import { isThisTypeNode } from "typescript"
import { Building } from "./Building"
import { BuildingCard, Card, ProvisionsCard, ScrollCard, TileCard } from "./Card"
import { PlayerColors } from "./dictionaries/Colors"


// export type PlayerColor = "black" | "red" | "pink" | "yellow"

export class Player
{
    private static _playerCount = 0

    readonly name: string
    readonly color: PlayerColors
    readonly id: number
    hand: Card[] = []
    playedCards: Card[] = []
    buildingCards: BuildingCard[] = []
    scrollCards: ScrollCard[] = []

    constructor(name: string, color: PlayerColors)
    {
        this.name = name
        this.color = color

        this.id = Player._playerCount
        Player._playerCount++
    }

    hasCardInHand(card: Card): boolean
    {
        if (this.hand.indexOf(card) === -1) return false
        return true
    }

    hasBuildingAvailable(building: Building): boolean
    {
        for (let card of this.buildingCards)
        {
            if (card.building.type === building.type) return true
        }
        return false
    }

    playCard(card: Card, fromProvisions: boolean = false): boolean
    {
        let index = this.hand.indexOf(card)
        if (fromProvisions)
        {
            /** Don't do anything here. We don't delete a card from our hand and we don't throw an error */
        }
        else if (index >= 0)
        {
            /** Delete the card from the hand because we have played it */
            delete this.hand[index]
        }
        else
        {
            /** We don't have the card to play */
            return false
        }

        /** TileCards go into the playedCards when played */
        if (card instanceof TileCard || card instanceof ProvisionsCard)
        {
            this.playedCards.push(card)
        }
        /** Building Cards go into buildingCards when played */
        else if (card instanceof BuildingCard)
        {
            this.buildingCards.push(card)
        }
        /** Scroll Cards go into scrollCards when played */
        else if (card instanceof ScrollCard)
        {
            this.scrollCards.push(card)
        }

        return true
    }
}
