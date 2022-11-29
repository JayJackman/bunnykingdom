
import { Card, CardType, ScrollCard } from '../Card'
import { Position } from '../Utils'

export interface CardDescription
{
    type: CardType
    tooltip?: string
    pos?: Position
    name?: string
}

export function getScrollCards(): ScrollCard[]
{
    let cards: ScrollCard[] = []

    /** Fisher */
    cards.push(
        {
            type: CardType.Scroll,
            name: "Fisher",
            tooltip: "1 point for each Fish you produce"
        }
    )

    /** Master Carpenter */
    cards.push(
        {
            type: CardType.Scroll,
            name: "Master Carpenter",
            tooltip: "2 points for each Wood you produce"
        }
    )

    /** Royal Scepter */
    cards.push(
        {
            type: CardType.Scroll,
            name: "Royal Scepter (TREASURE)",
            tooltip: "3 points"
        }
    )

    /** Harecingetorix */
    cards.push(
        {
            type: CardType.Scroll,
            name: "Harecingetorix",
            tooltip: "1 point for each fief you control"
        }
    )

    /** Bun-Shee */
    cards.push(
        {
            type: CardType.Scroll,
            name: "Bun-Shee",
            tooltip: "2 points for each city you control in fiefs that produce no resources"
        }
    )

    /** Colonist */
    cards.push(
        {
            type: CardType.Scroll,
            name: "Colonist",
            tooltip: "3 points for each camp card you have"
        }
    )

    /** Carrot King */
    cards.push(
        {
            type: CardType.Scroll,
            name: "Carrot King",
            tooltip: "15 points if you produce at least 5 Carrots"
        }
    )

    /** Bureaucrat */
    cards.push(
        {
            type: CardType.Scroll,
            name: "Bureaucrat",
            tooltip: "1 point for each parchement that you have (including this one)"
        }
    )

    /** Explorer */
    cards.push(
        {
            type: CardType.Scroll,
            name: "Explorer",
            tooltip: "3 points for each territory you control in the corner of the board"
        }
    )

    /** Hun-ny King */
    cards.push(
        {
            type: CardType.Scroll,
            name: "Hun-ny King",
            tooltip: "12 points if you control at least 10 fiefs"
        }
    )

    return cards
}
