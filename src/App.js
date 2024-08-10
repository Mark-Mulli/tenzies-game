import React from "react";

import Die from "./Die";
import { nanoid } from "nanoid";

import "./styles.css"





export default function App() {

    function allNewDice() {
        const num_array = []
        for (let i = 0; i < 10; i++) {
            const random_number = 1 + Math.floor(Math.random() * 6)
            num_array[i] = {id:nanoid(), value: random_number, isHeld:false}
        }
        return num_array
    }
    

    const [newDice, setNewDice] = React.useState(allNewDice())

    function reroll() {
        setNewDice(allNewDice())
    }

    const diceElements = newDice.map((number) => {
        return <Die key={number.id} value = {number.value} isHeld = {number.isHeld}/>
    }) 

    return (
        <main>
            <div className="dice-container">
                {diceElements}
            </div>

            <button className="roll-dice" onClick= {reroll}>Roll</button>
        </main>
    )
}