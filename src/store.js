import React from "react";
import { nanoid } from "nanoid";

class Task {
    id = ""
    name = ""
    completed = false

    constructor(id, name, completed) {
        this.id = id
        this.name = name
        this.completed = completed
    }
}

const intialTasks = [
    new Task("todo-0", "Eat", true),
    new Task("todo-1", "Sleep", false),
    new Task("todo-2", "Repeat", false)
]

const intialState = {
    tasks: intialTasks,
    filter: "All"
}

const FILTER_MAP = {
    "All": () => true,
    "Active": (task) => !task.completed,
    "Completed": (task) => task.completed
  }

const reducer = (state, action) => {
    const newState = {...state}
    switch (action.type) {
        case 'All':
        case 'Active':
        case 'Completed':
            newState.filter = action.type
            break
        case 'add':
            const newTask = new Task(nanoid(), action.name, false)
            newState.tasks = [...newState.tasks, newTask]
            // newState.tasks.push(newTask)
            console.log('addR')
            break
        case 'delete':
            newState.tasks = newState.tasks.filter((task) => task.id !== action.id)
            break
        case 'edit':
            newState.tasks = newState.tasks.map((task) => {
                if (task.id === action.id) {
                    task.name = action.newName
                    return task
                }
                return task
            })
            break
        case 'toggleTaskCompleted':
            newState.tasks = newState.tasks.map((task) => {
                if (task.id === action.id) {
                    task.completed = !task.completed
                    return task
                }
                return task
            })
            break
        default: break
    }
    return newState
}

const UseStore = () => {
    // const memoReducer = React.useCallback(reducer, [])
    // console.log(Object.is(memoReducer, reducer))
    const [state, dispatch] = React.useReducer(reducer, intialState)
    return [state, dispatch]
}

const TasksContext = React.createContext()

export {TasksContext, UseStore, FILTER_MAP}

