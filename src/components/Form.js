import React from "react";

class Form extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
      super(props)
      this.state = {
        value: "fuccccck"
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
        this.props.addTask(this.state.value) 
        // this.setState((preState, props) => {
        //     return { value: this.state.value + 1 }
        // })
    }

    onChange = (e) => {
        this.setState((preState, props) => {
            return { value: e.target.value }
        })
        console.log("uuuuu")
    }
}

const FForm = (props) => {
    const [value, setValue] = React.useState()

    const handSubmit = (e) => {
        e.preventDefault()
        props.addTask(value) 
    }

    const onChange = (e) => {
        setValue(e.target.value)
    }

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
                value={value}
                onChange={onChange}
            />
            <button type="submit" className="btn btn__primary btn__lg" onClick={handSubmit}>
                Add
            </button>
        </form>
    )
}

export { Form, FForm }