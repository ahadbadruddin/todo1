import React, {Component} from 'react';
import {BASEURL} from '../config.js';
// import './MyComponent.css'

export default class CreateItem extends Component {
    state = {
        title: "",
        description: ""
    }
    

    render() {
        return (
            <div className="Controls">
                <form onSubmit={(event)=>{
                    event.preventDefault()
                    this.props.postItem({
                        title: this.state.title,
                        description: this.state.description
                    })
                    // post the item from current state data
                }}>

                    <input id = "title" name="title" placeholder="title" value={this.state.title}
                        onChange={(event)=> {
                            this.setState({
                                title : event.target.value
                            })
                        }} />
                        
                    {<input id = "description" name="description" placeholder="description" value={this.state.description}
                        onChange={(event)=> {
                            this.setState({
                                description : event.target.value
                            })
                        }} />}

                    <input type="submit" value="Create Todo Item"/>
                </form>
            </div>
        );
    }
}