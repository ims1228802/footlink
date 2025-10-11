import React from "react";
import { level } from "../../data/team/level"; "../../data/team/level";
import { useState } from "react";

export default function Level({ teamState, setTeamState }) {
    const [ clickCount, setClickCount ] = useState(0);
    const number = level.length;

    const onClickHandler = (idx) => {
        setClickCount(idx);
        console.log(level[idx].level);
        console.log(idx);

        const update = {
            ...teamState,
            level: level[idx].level
        }

        setTeamState(update);
    }

    return(
        <div className="level-div">
            <div className="level-select-text">
                <h2>{level[clickCount].level}</h2>
                <p>{level[clickCount].content}</p>
            </div>
            <div className="level-select">
                {Array.from({length: number}, (_,idx)=>(
                    <div className={idx <= clickCount ? `select-area fill` : 'select-area'} key={idx} onClick={() => onClickHandler(idx)}></div>
                ))}
            </div>
            
            <div className="level-line">
                <div className="level-beginner"></div>
                <div className="level-amateur"></div>
                <div className="level-semi-pro"></div>
                <div className="level-pro"></div>
            </div>
        </div>
    );
}