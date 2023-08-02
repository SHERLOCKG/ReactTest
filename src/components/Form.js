import React from "react";
import {TasksContext} from "./../store"

class Form extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        value: "a"
      }
    }

    componentDidUpdate() {}
    componentWillUnmount() {}
    componentDidMount() {}
    componentDidCatch() {}
    shouldComponentUpdate() { return true }

    render() {
        return (
            <form>
                <h2 className="label-wrapper">
                    <label htmlFor="new-todo-input" className="label__lg">
                        What needs to be done?
                    </label>
                </h2>
                <input
                    type="text"
                    id="new-todo-input"
                    className="input input__lg"
                    name="text"
                    autoComplete="off"
                    value={this.state.value}
                    onChange={this.onChange}
                />
                <button type="submit" className="btn btn__primary btn__lg" onClick={this.handSubmit}>
                    Add
                </button>
            </form>
        )
    }

    handSubmit = (e) => {
        e.preventDefault()
        console.log('addq')
        if (this.state.value) {
            this.props.addTask(this.state.value) 
            this.setState((preState, props) => {
                return { value: "" }
            })
        }
    }

    onChange = (e) => {
        this.setState((preState, props) => {
            return { value: e.target.value }
        })
    }
}

const FForm = (props) => {
    const [value, setValue] = React.useState()
    const {screenX: x, screenY: y} = MousePoint()
    const context = React.useContext(TasksContext)

    const handSubmit = (e) => {
        e.preventDefault()
        if (value) {
            // props.addTask(value)
            context.dispatch({type: "add", name: value})
            setValue("")
        }
    }

    const onChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <form>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done? ({x}, {y})
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={value}
                onChange={onChange}
            />
            <button type="submit" className="btn btn__primary btn__lg" onClick={handSubmit}>
                Add
            </button>
        </form>
    )
}

function MousePoint() {
    const [screenX, setScreenX] = React.useState(0)
    const [screenY, setScreenY] = React.useState(0)

    React.useEffect(() => {
        const a = (e) => {
            setScreenX(e.clientX)
            setScreenY(e.clientY)
        }
        console.log('effect')
        window.addEventListener("mousemove", a)
        return () => {
            window.removeEventListener("mousemove", a)
        }
    }, [])
    return {screenX, screenY}
}

export { Form, FForm }