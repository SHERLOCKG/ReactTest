import { Todo } from "./components/Todo1";
import { FForm } from "./components/Form";
import FilterButton from "./components/FilterButton";
import { TasksContext, UseStore, FILTER_MAP } from "./store"
import { useEffect, useRef } from "react";

const FILTER_NAMES = Object.keys(FILTER_MAP)

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function App() {
    const [state, dispatch] = UseStore()
    const tasks = state.tasks.slice()
    const listHeadRef = useRef(null)
    const preTaskLength = usePrevious(tasks.length)
    // console.log('render app1')

    useEffect(() => {
      if (preTaskLength - tasks.length === -1) {
        listHeadRef.current.focus()
      }
    }, [tasks.length, preTaskLength])

    const taskList = tasks.filter(FILTER_MAP[state.filter]).map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
      />
    ))

    const filterButtons = FILTER_NAMES.map((name) => (
      <FilterButton
        name={name}
        key={name}
        isPressed={state.filter === name}
      />
    ))

    const headNoun = taskList.length !== 1 ? "tasks" : "task"
    const headingText = `${taskList.length} ${headNoun} remaining`

    return (
      <TasksContext.Provider value={
        {
            dispatch: dispatch
        }
      }>
        <div className="todoapp stack-large">
        <h1>TodoMatic</h1>
        {FForm()}
        <FForm />
        <div className="filters btn-group stack-exception">
          {filterButtons}
        </div>
        <h2 id="list-heading" ref={listHeadRef} tabIndex="-1">{headingText}</h2>
        <ul
          // role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading">
          {taskList}
        </ul>
        </div>
      </TasksContext.Provider>
    )
}

export default App;
