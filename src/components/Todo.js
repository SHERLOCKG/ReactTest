import React from "react";

function Todo(props) {
    return (
        <li className="todo stack-small">
          <div className="c-cb">
            <input id={props.id} type="checkbox" defaultChecked={props.completed} />
            <label className="todo-label" htmlFor={props.id}>
              {props.name}
            </label>
          </div>
          <div className="btn-group">
            <button type="button" className="btn">
              Edit <span className="visually-hidden">{props.name}</span>
            </button>
            <button type="button" className="btn btn__danger">
              Delete <span className="visually-hidden">{props.name}</span>
            </button>
          </div>
        </li>
    )
}

class TodoComponent extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <li className="todo stack-small">
          <div className="c-cb">
            <input id={this.props.id} type="checkbox" defaultChecked={this.props.completed} />
            <label className="todo-label" htmlFor={this.props.id}>
              {this.props.name}
            </label>
          </div>
          <div className="btn-group">
            <button type="button" className="btn">
              Edit <span className="visually-hidden">{this.props.name}</span>
            </button>
            <button type="button" className="btn btn__danger">
              Delete <span className="visually-hidden">{this.props.name}</span>
            </button>
          </div>
        </li>
    )
  }
}

export { Todo, TodoComponent }