import React, { useEffect, useRef } from "react";
import {TasksContext} from "./../store"

function usePrevious(isEditing) {
  const ref = useRef()
  useEffect(() => {
    ref.current = isEditing
  })
  return ref.current
}

const Todo = (props) => {
  const [newName, setNewName] = React.useState("")
  const [isEditing, setIsEditing] = React.useState(false)
  const context = React.useContext(TasksContext)
  const wasEditing = usePrevious(isEditing)

  const editFieldRef = React.useRef(null)
  const editButtonRef = React.useRef(null)

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus()
    } 
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus()
    }
  }, [wasEditing, isEditing])

  const editingTemplate = (
    <form className="stack-small">
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input id={props.id} className="todo-text" type="text" onChange={handleChange} ref={editFieldRef} />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setIsEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit" onClick={handleSubmit}>
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  )
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => context.dispatch({type: 'toggleTaskCompleted', id: props.id})}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setIsEditing(true)} ref={editButtonRef}>
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => context.dispatch({type: 'delete', id: props.id})}>
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  )

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log('sadasdasd')
    context.dispatch({type: 'edit', id: props.id, newName: newName})
    setNewName("")
    setIsEditing(false)
  }

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
}

export { Todo }