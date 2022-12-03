import React from "react";
import { useState, useRef } from "react";
import { Gameboard } from "../game/Gameboard";
import { UIGameboard } from "./UIGameboard";


interface GameProps
{
    gameboard: Gameboard
}

interface GameState
{
    gameboard: Gameboard
}

export class UIPlayerScreen extends React.Component<GameProps, GameState>
{
    constructor(props: GameProps)
    {
        super(props)
        this.state = { gameboard: props.gameboard }
    }

    render()
    {
        return <UIGameboard board={this.state.gameboard}/>
    }
}
