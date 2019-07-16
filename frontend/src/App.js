import React, {Component} from 'react';
import ListView from './components/ListView.js';
import {BASEURL} from './config.js';
import CreateItem from './components/CreateItem.js';
import './App.css';


class App extends Component {

  state = {
    newtask : {
      "title": "",
      "description": ""
    },
    todoItems : [
      {
        "title": "Test",
        "description": "A test item",
        "status": 0
      },
      {
        "title": "Test2",
        "description": "Another test item",
        "status": 1
      }
    ],
    error: null
  }

  reloadItemList = () => {
    /* load the todoItems list json from the api */
    const url = BASEURL + "/api/tasks"
    const promise = fetch(url)
    promise.then(blob=>blob.json()).then(json=>{
      this.setState({
        todoItems:json
      })
    }).catch(error=>console.log(error));
    // ...
  }

  postItem = (itemData) => {
    /* add a new item with a POST request to the API, then reload the full
    list by calling reloadItemList */
    const url = BASEURL + "/api/tasks"
    const promise = fetch(url, {
      method: 'post',
      mode: 'cors',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(itemData)
    });
    promise.then((response)=>this.reloadItemList())
    // ...
  }

  updateItem = (pk, itemData) => {
    const url = BASEURL + `/api/task/${pk}`
    const promise = fetch(url, {
      method: 'put',
      mode: 'cors',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(itemData)
    });
    promise.then((response)=>this.reloadItemList())
    // ...
  }

  deleteItem = (pk) => {
    const url = BASEURL + `/api/task/${pk}`
    const promise = fetch(url, {
      method: 'delete',
      mode: 'cors'})
    promise.then((response)=>{
    console.log(response);
    this.reloadItemList()})

    // ...
  }

  componentWillMount() {
    this.reloadItemList()
  }

  render() {


    return (
      <div className="App">
        <CreateItem postItem={this.postItem}  />
        <hr />
        <ListView todoItems={this.state.todoItems}
                  updateItem={this.updateItem}
                  deleteItem = {this.deleteItem}
        />

      </div>
    );
  }
}

export default App;
