import { Todo } from "./components/Todo";
import { Form } from "./components/Form";
import FilterButton from "./components/FilterButton";
import React from "react";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  "All": () => true,
  "Active": (task) => !task.completed,
  "Completed": (task) => task.completed
}
const FILTER_NAMES = Object.keys(FILTER_MAP)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.addTask = this.addTask.bind(this)
    this.toggleTaskCompleted = this.toggleTaskCompleted.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.editTask = this.editTask.bind(this)
    
    this.state = {
      tasks: [
        { id: "todo-0", name: "Eat", completed: true },
        { id: "todo-1", name: "Sleep", completed: false },
        { id: "todo-2", name: "Repeat", completed: false }
      ],
      filter: "All"
    }
  }

  addTask(name) {
    const newTask = { id: nanoid(), name, completed: false }
    // this.state.tasks.push(newTask)
    // this.setState({ tasks: this.state.tasks })
    this.setState({ ...this.state, tasks: [...this.state.tasks, newTask] })
  }

  toggleTaskCompleted(id) {
    const updatedTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task
    })
    this.setState({ ...this.state, tasks: updatedTasks })
  }

  deleteTask(id) {
    const remainingTasks = this.state.tasks.filter((task) => task.id !== id)
    this.setState({ ...this.state, tasks: remainingTasks })
  }

  editTask(id, newName) {
    const updatedTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, name: newName }
      }
      return task
    })
    this.setState({ ...this.state, tasks: updatedTasks })
  }

  setFilter = (filter) => {
    this.setState({ ...this.state, filter: filter })
  }
  
  render() {
    console.log('render apps')
    const taskList = this.state.tasks.filter(FILTER_MAP[this.state.filter]).map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={this.toggleTaskCompleted}
        deleteTask={this.deleteTask}
        editTask={this.editTask}
      />
    ))

    const filterButtons = FILTER_NAMES.map((name) => (
      <FilterButton
        name={name}
        key={name}
        isPressed={this.state.filter === name}
        setFilter={this.setFilter}
      />
    ))

    const headNoun = this.state.tasks.length !== 1 ? "tasks" : "task"
    const headingText = `${this.state.tasks.length} ${headNoun} remaining`

    return (
      <div className="todoapp stack-large">
        <h1>TodoMatic</h1>
        <Form addTask={this.addTask} />
        <div className="filters btn-group stack-exception">
          {filterButtons}
        </div>
        <h2 id="list-heading">{headingText}</h2>
        <ul
          // role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading">
          {taskList}
        </ul>
      </div>
    )
  }
}

export default App;
