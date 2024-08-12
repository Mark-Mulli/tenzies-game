import React from "react";

import Die from "./Die";
import { nanoid } from "nanoid";

import Confetti from "react-confetti";

import "./styles.css"





export default function App() {

    function generateNewDie() {
        return {
            id:nanoid(), value: 1 + Math.floor(Math.random() * 6), isHeld:false
        }
    }

    function allNewDice() {
        const num_array = []
        for (let i = 0; i < 10; i++) {
            num_array[i] = generateNewDie()
        }
        return num_array
    }
    
    

    const [newDice, setNewDice] = React.useState(allNewDice())

    const [tenzies, setTenzies] = React.useState(false)


    function reroll() {
        if (!tenzies) {
            setNewDice(oldDice => oldDice.map((dice) => {
                    return dice.isHeld === true ? dice : generateNewDie()
                }))        
        } else {
            setTenzies(false)
            setNewDice(allNewDice())

        }
    }

    // console.log(newDice)


    React.useEffect(() => {
        const allHeld = newDice.every(dice => dice.isHeld)
        const allSameVal = newDice.every(dice => dice.value === newDice[0].value)
        if (allHeld && allSameVal) {
            setTenzies(true)
            // console.log("You Won")
        }

    }, [newDice])

    function hold(id) {
        setNewDice(oldDice => oldDice.map((dice) => {
            return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
        }))
    }

    const diceElements = newDice.map((number) => {
        return <Die key={number.id} value = {number.value} isHeld = {number.isHeld} hold = {() => hold(number.id)}/>
    }) 

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

            <div className="dice-container">
                {diceElements}
            </div>

            <button className="roll-dice" onClick= {reroll}>{tenzies ? "New Game": "Roll"}</button>
        </main>
    )
}