import React from "react";
import { useState, useRef } from "react";
import { Gameboard } from "../game/Gameboard";


interface GameProps
{
    gameboard: Gameboard
}

interface GameState
{
    gameboard: Gameboard
}

export class UITile extends React.Component<GameProps, GameState>
{
    constructor(props: GameProps)
    {
        super(props)
        this.state = { gameboard: props.gameboard }
    }

    componentDidMount(): void
    {

    }
}
