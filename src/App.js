import React from "react";

import Die from "./Die";

import "./styles.css"





export default function App() {

    function allNewDice() {
        const num_array = []
        for (let i = 0; i < 10; i++) {
            const random_number = 1 + Math.floor(Math.random() * 6)
            num_array[i] = random_number
        }
        return num_array
    }
    
    const [newDice, setNewDice] = React.useState(allNewDice())

    function reroll() {
        setNewDice(allNewDice())
    }

    return (
        <main>
            <div className="dice-container">
                { newDice.map((number) => {
                    return <Die  value = {number}/>
                }) }
            </div>

            <button className="roll-dice" onClick= {reroll}>Roll</button>
        </main>
    )
}