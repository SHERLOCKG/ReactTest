import { TodoComponent } from "./components/Todo";
import { Form, FForm } from "./components/Form";
import FilterButton from "./components/FilterButton";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.addTask = this.addTask.bind(this)
  }

  addTask(name) {
    alert(name)
  }
  
  render() {
    const taskList = this.props.data.map((prop) => (
      <TodoComponent
        id={prop.id}
        name={prop.name}
        completed={prop.completed}
        key={prop.id}
      />
    ))

    return (
      <div className="todoapp stack-large">
        <h1>TodoMatic</h1>
        <Form addTask={this.addTask} test="test" />
        <div className="filters btn-group stack-exception">
          <FilterButton />
          <FilterButton />
          <FilterButton />
        </div>
        <h2 id="list-heading">3 tasks remaining</h2>
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
