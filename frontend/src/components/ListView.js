import React, {Component} from 'react';
import TodoItem from './TodoItem.js';
// import './MyComponent.css'

export default class ListView extends Component {

    render() {
        const todoItems = this.props.todoItems.map((dict, index)=>
            <TodoItem {...dict} key ={index} index= {index} updateItem={this.props.updateItem} deleteItem= {this.props.deleteItem}/>
        )
        return (
            <div className="MyComponent">
                {todoItems}
            </div>
        );
    }
}