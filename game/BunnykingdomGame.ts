import { Building, buildingToString, BuildingType, buildingTypeToString } from "./Building";
import { BuildingCard, Card, CardType, ProvisionsCard, ScrollCard, TileCard } from "./Card";
import { Deck } from "./Deck";
import { PlayerColors } from "./dictionaries/Colors";
import { Gameboard } from "./Gameboard";
import { Player } from "./Player";
import { Resource, resourceToString } from "./Resource";
import { TileType, tileTypeToString } from "./Tile";
import { Position } from "./Utils";

const MAX_PLAYERS = 4
const MIN_PLAYERS = 2
const NUM_ROUNDS = 4
const NUM_CARDS_FROM_PROVISIONS = 2
const NUM_CARDS_TWO_PLAYERS = 10
const NUM_CARDS_THREE_PLAYERS = 12
const NUM_CARDS_FOUR_PLAYERS = 10
const NUM_CARDS_PER_TURN = 2

type PlayerId = number

export class BunnyKingdomGame
{
    gameboard: Gameboard = new Gameboard()
    players: Player[] = []
    deck: Deck = new Deck()
    round: number = 0
    numPlayers: number = 0
    numCardsPlayed: Map<PlayerId, number> = new Map<PlayerId, number>()
    numCardsDiscarded?: Map<PlayerId, number>

    /**
     * Handle a start game command. Here, we shuffle the deck and deal cards to each player
     * TODO: add logic for 2 player games
     */
    handleStartGame()
    {
        if (this.numPlayers < MIN_PLAYERS || this.numPlayers > MAX_PLAYERS)
        {
            throw new Error(`Bad number of players: ${this.numPlayers}`)
        }

        /** In a 2 player game we need to keep track of how many cards have been discarded per turn */
        if (this.numPlayers === 2)
        {
            this.numCardsDiscarded = new Map<PlayerId, number>()
            for (let player of this.players)
            {
                this.numCardsDiscarded.set(player.id, 0)
            }
        }

        this.deck.shuffle()
        this.deal()

        this.round++
    }

    /**
     * Deal the appropriate amount of cards to each player to start a new round
     */
    private deal()
    {
        let numCards: number = 0
        if (this.numPlayers === 2) numCards = NUM_CARDS_TWO_PLAYERS
        else if (this.numPlayers === 3) numCards = NUM_CARDS_THREE_PLAYERS
        else if (this.numPlayers === 4) numCards = NUM_CARDS_FOUR_PLAYERS

        for (let player of this.players)
        {
            player.hand = this.deck.deal(numCards)
            if (this.numPlayers === 2)
            {
                player.drawPile = this.deck.deal(numCards)
            }
        }
    }

    /**
     * Handle a command to add a new player to the game
     * @param name The name of the new player
     * @param color The color of the new player
     */
    handleAddPlayer(name: string, color: PlayerColors)
    {
        if (this.round > 0) throw new Error("Can't add players after game has started")
        if (this.numPlayers > MAX_PLAYERS) throw new Error("Adding too many players!")
        let player = new Player(name, color)
        this.players.push(player)
        this.numCardsPlayed.set(player.id, 0)
        this.numPlayers++
    }

    /**
     * (Only for 2 player game) Handle a discard card event from a player
     * @param id The unique ID of the player discarding the card
     * @param card A Card object indicating the card being played
     */
    handleDiscardCard(id: number, card: Card)
    {
        let player = this.getPlayerById(id)
        if (!player.hasCardInHand(card)) throw new Error(`${player.name} tried to discard a card they don't have`)
        if(!player.discardCard(card)) throw new Error (`${player.name} failed to discard a card`)
        let numCards = this.numCardsDiscarded?.get(player.id) as number
        this.numCardsDiscarded?.set(player.id, numCards + 1)
    }

    /**
     * Handle a select card event from a player.
     * @param id The unique ID of the player playing the card
     * @param card A Card object indicating the card being played
     */
    handleSelectCard(id: number, card: Card, fromProvisions: boolean = false)
    {
        /** Check to make sure that the player selected a valid card to prevent cheating */
        let player = this.getPlayerById(id)
        if (!player.hasCardInHand(card)) throw new Error(`${player.name} tried to play a card they don't have`)

        /**
         * Here, the player has selected a valid card. We need to decide what to do with it
         *  1. Tile card: place a bunny of player's color onto the appropriate spot.
         *     Move the played card into the player's playedCards
         *  2. Building card: move the played card into the player's buildingCards
         *  3. Scroll card: move the played card into the player's scrollCards
         *  4. Provisions: deal 2 cards and recursively call this function to resolve them
         */

        if (!player.playCard(card, fromProvisions)) throw new Error (`${player.name} failed to play a card`)

        if (card instanceof TileCard)
        {
            this.gameboard.placeBunny(card.pos, player)
        }
        else if (card instanceof ProvisionsCard)
        {
            for (let c of this.deck.deal(NUM_CARDS_FROM_PROVISIONS))
            {
                this.handleSelectCard(id, c, true)
            }
        }

        /** Update the number of cards played and check to see if we are ready to go to the next turn */
        if (!fromProvisions)
        {
            let numPlayed = this.numCardsPlayed.get(player.id) as number
            this.numCardsPlayed.set(player.id, numPlayed + 1)
        }
    }

    /**
     * Handle a play building event from a player
     * @param id The player trying to play the building
     * @param building The building that the player wants to play
     * @param pos The position on the gameboard to play the building
     * @param pos2 (only applicable to Sky Towers) The second position to play the Sky Tower
     */
    handlePlayBuilding(id: number, building: Building, pos: Position, pos2?: Position)
    {
        let player = this.getPlayerById(id)
        let {row, col} = pos
        let tile = this.gameboard.board[row][col]

        /** Check to make sure that the player selected a valid building to prevent cheating */
        if (!player.hasBuildingAvailable(building))
            throw new Error(`${player.name} tried to play a building they don't have`)

        /** Make sure there isn't already a building on the tile */
        if (tile.building)
            throw new Error (`${player.name} tried to play a building on territory that already had a building (${row}, ${col})`)

        /** If the building is a camp, we actually want to check to make sure there ISN'T a bunny there (other buildings need a bunny) */
        if (building.type === BuildingType.Camp)
        {
            if (tile.player) throw new Error (`${player.name} tried to play a camp on an occupied space (${row}, ${col})`)
        }
        /** Otherwise, we check to make sure the tile is occupied by the correct player */
        else
        {
            if (!tile.player) throw new Error (`${player.name} tried to play a building on an unoccupied territory (${row}, ${col})`)
            else if (tile.player.id !== id) throw new Error (`${player.name} tried to play a building on someone else's territory (${row}, ${col})`)
        }

        /** Check the luxury resources */
        if (building.type === BuildingType.Resource)
        {
            if (
                (building.resource === Resource.CarrotSpice && tile.terrainType !== TileType.Farm)
            ||  (building.resource === Resource.Wood && tile.terrainType !== TileType.Forest)
            ||  (building.resource === Resource.Fish && tile.terrainType !== TileType.River)
            ||  (building.resource === Resource.Copper && tile.terrainType !== TileType.Mountain)
            ||  (building.resource === Resource.Iron && tile.terrainType !== TileType.Mountain)
            ||  (building.resource === Resource.Gold && tile.terrainType !== TileType.Mountain)
            ||  (building.resource === Resource.Diamond && tile.terrainType !== TileType.Mountain)
               )
               throw new Error(`Cannot place ${resourceToString(building.resource)} on ${tileTypeToString(tile.terrainType)}`)
        }

        /** Do an extra check for Sky Tower's second position */
        if (building.type == BuildingType.SkyTower)
        {
            if (!pos2) throw new Error(`Pos2 for Sky Tower is undefined`)
            let tile2 = this.gameboard.board[pos2.row][pos2.col]
            /** Make sure there isn't already a building on the tile */
            if (tile2.building) throw new Error (`${player.name} tried to play a building on territory that already had a building (${row}, ${col})`)
            if (!tile2.player) throw new Error (`${player.name} tried to play a building on an unoccupied territory (${row}, ${col})`)
            else if (tile2.player.id !== id) throw new Error (`${player.name} tried to play a building on someone else's territory (${row}, ${col})`)

            /** We can now safely place both buildings */
            this.gameboard.placeBuilding(building, {row, col})
            this.gameboard.placeBuilding(building, pos2)
        }
        else
        {
            /** Need to place a bunny for camp */
            if (building.type == BuildingType.Camp)
            {
                this.gameboard.placeBunny({row, col}, player)
            }

            /** We can now safely place the building */
            this.gameboard.placeBuilding(building, {row, col})
        }
    }

    private getPlayerById(id: number): Player
    {
        for (let player of this.players)
        {
            if (player.id === id) return player
        }
        throw new Error(`Invalid player id: ${id}`)
    }
}
