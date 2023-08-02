import React from "react";
import {TasksContext} from "./../store";

// function FilterButton(props) {
//     console.log('FilterButton')
//     return (
//         <button type="button" className="btn toggle-btn" aria-pressed={props.isPressed} onClick={() => props.setFilter(props.name)}>
//             <span className="visually-hidden">Show </span>
//             <span>{props.name}</span>
//             <span className="visually-hidden"> tasks</span>
//         </button>
//     )
// }

// const FilterButton = React.memo((props) => {
//     return (
//         <button type="button" className="btn toggle-btn" aria-pressed={props.isPressed} onClick={() => props.setFilter(props.name)}>
//             <span className="visually-hidden">Show </span>
//             <span>{props.name}</span>
//             <span className="visually-hidden"> tasks</span>
//         </button>
//     )
// })

const FilterButton = React.memo((props) => {
    const context = React.useContext(TasksContext)
    return (
        <button type="button" className="btn toggle-btn" aria-pressed={props.isPressed} onClick={() => context.dispatch({type: props.name})}>
            <span className="visually-hidden">Show </span>
            <span>{props.name}</span>
            <span className="visually-hidden"> tasks</span>
        </button>
    )
})

export default FilterButton