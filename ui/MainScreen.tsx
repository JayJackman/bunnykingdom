import { useState, useRef } from "react";
import { Gameboard } from "../game/Gameboard";

function MainScreen()
{
    const [gameboard, setGameboard] = useState(new Gameboard());
    const [puzzleStatus, setPuzzleStatus] = useState("** UNSOLVED **");
    const initialGrid = useRef(getGrid());
}
