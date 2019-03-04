import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";
import Button from 'react-bootstrap/Button';

let data = require('./todo.json');

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: null
        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        this.setState({
            items: data.todoList.entries
        })
    }

    addItem(e){
        if (this._inputElement.value !== "" && this._inputElement2.value !== "") {
            const newItem = {
                text: this._inputElement.value,
                description: this._inputElement2.value,
                key: Date.now()
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });
        }

        this._inputElement.value = "";
        this._inputElement2.value = "";

        e.preventDefault();
    }

    deleteItem(key) {
        let filteredItems = this.state.items.filter(function (item) {
        return (item.key !== key)
        });

        this.setState({
            items: filteredItems
        });
    }
    render() {
        if(this.state.items) {
            return (
                <div className="todoListMain">
                    <div className="border">
                        <div className="header">
                            <form onSubmit={this.addItem} style={{padding: "1rem"}}>
                                <input ref={(a) => this._inputElement = a}
                                       placeholder="enter task">
                                </input>
                                <br/><br/>
                                <input ref={(a) => this._inputElement2 = a}
                                       placeholder="enter task description">
                                </input>
                                <br/><br/>
                                <Button style={{width: "100%", margin: "0 auto"}} type="submit">+</Button>
                            </form>
                        </div>
                    </div>
                    <TodoItems entries={this.state.items}
                               delete={this.deleteItem}/>
                </div>
            );
        } else {
            return(<div>Loading...</div>)
        }

    }
}

export default TodoList;