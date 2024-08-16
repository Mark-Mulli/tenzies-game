import React from "react";

export default function Die(props) {

    const styles = {
        background: props.isHeld ? "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)" : "white",
        
    }

    function renderDots() {
        const dotPositions = {
            1: ["2 / 2"],  
            2: ["1 / 1", "3 / 3"],  
            3: ["1 / 1", "2 / 2", "3 / 3"],  
            4: ["1 / 1", "1 / 3", "3 / 1", "3 / 3"], 
            5: ["1 / 1", "1 / 3", "2 / 2", "3 / 1", "3 / 3"],  
            6: ["1 / 1", "1 / 3", "2 / 1", "2 / 3", "3 / 1", "3 / 3"] 
        }

        return dotPositions[props.value].map((position) => (
            <span key={position} className="dot" style={{gridArea: position}}></span>
        ))
    }

    return (
        <div className="die-face" style={styles} onClick={props.hold}>
            {renderDots()}
        </div>
    )
}