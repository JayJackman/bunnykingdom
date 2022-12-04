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
    discardedCards?: Card[]
    drawPile?: Card[]

    constructor(name: string, color: PlayerColors)
    {
        this.name = name
        this.color = color

        this.id = Player._playerCount
        Player._playerCount++
    }

    hasCardInHand(card: Card): boolean
    {
        if (this.indexOf(card) >= 0) return true
        return false
    }

    private indexOf(card: Card): number
    {
        let i = 0
        for (let handCard of this.hand)
        {
            if (handCard.name === card.name) return i
            i++
        }
        return -1
    }

    hasBuildingAvailable(building: Building): boolean
    {
        for (let card of this.buildingCards)
        {
            if (card.building.type === building.type) return true
        }
        return false
    }

    /** For two player game */
    discardCard(card: Card): boolean
    {
        let index = this.indexOf(card)
        if (index < 0) return false
        if(!this.discardedCards) return false
        this.discardedCards.concat(this.hand.splice(index,1))
        return true
    }

    /** For two player game */
    drawCard(num: number): boolean
    {
        if (!this.drawPile) return false
        /** TODO: check for num too big? */
        this.hand.concat(this.drawPile.splice(0,num))
        return true
    }

    playCard(card: Card, fromProvisions: boolean = false): boolean
    {
        let index = this.indexOf(card)
        if (fromProvisions)
        {
            /** Don't do anything here. We don't remove a card from our hand and we don't throw an error */
        }
        else if (index >= 0)
        {
            /** Remove the card from the hand because we have played it */
            this.hand.splice(index, 1)
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
