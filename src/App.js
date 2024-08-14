import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./styles.css";

export default function App() {

    function generateNewDie() {
        return {
            id: nanoid(),
            value: 1 + Math.floor(Math.random() * 6),
            isHeld: false
        };
    }

    function allNewDice() {
        const num_array = [];
        for (let i = 0; i < 10; i++) {
            num_array[i] = generateNewDie();
        }
        return num_array;
    }

    const [newDice, setNewDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);
    const [rollCount, setRollCount] = React.useState(0);
    const [startTime, setStartTime] = React.useState(null);
    const [elapsedTime, setElapsedTime] = React.useState(null);
    const [showModal, setShowModal] = React.useState(false); // State for showing the modal

    function reroll() {
        if (!tenzies) {
            setNewDice(oldDice => oldDice.map(dice => {
                return dice.isHeld ? dice : generateNewDie();
            }));
            setRollCount(prevCount => prevCount + 1);

            if (rollCount === 1) {
                setStartTime(new Date());
            }
        } else {
            startNewGame();
        }
    }

    function startNewGame() {
        setTenzies(false);
        setNewDice(allNewDice());
        setRollCount(0);
        setStartTime(null);
        setElapsedTime(null);
        setShowModal(false); // Hide the modal when starting a new game
    }

    React.useEffect(() => {
        const allHeld = newDice.every(dice => dice.isHeld);
        const allSameVal = newDice.every(dice => dice.value === newDice[0].value);
        if (allHeld && allSameVal) {
            setTenzies(true);
            if (startTime) {
                const endTime = new Date();
                setElapsedTime(((endTime - startTime) / 1000).toFixed(2));
                setShowModal(true); // Show the modal when the game is completed
            }
        }
    }, [newDice]);

    function hold(id) {
        setNewDice(oldDice => oldDice.map(dice => {
            return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
        }));
    }

    const diceElements = newDice.map(number => {
        return <Die key={number.id} value={number.value} isHeld={number.isHeld} hold={() => hold(number.id)} />;
    });

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            
            {!showModal && (
                <button className="roll-dice" onClick={reroll}>
                    {tenzies ? "New Game" : "Roll"}
                </button>
            )}
        
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Congratulations!</h2>
                        <p>You won in {rollCount} rolls.</p>
                        <p>Time Elapsed: {elapsedTime} seconds</p>
                        {console.log(elapsedTime)}
                        <button className="roll-dice" onClick={startNewGame}>New Game</button>
                    </div>
                </div>
            )}
        </main>
    );
}
