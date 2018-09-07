'use-strict'
import React, { Component } from 'react';
import './App.css';

const LINK = (props) =>{
  return(
    <div><a href="#" onClick={props.handleClick}>Component1</a></div>
  )
}
const LINK2 = (props) =>{
  return(
  <div><a href="#" onClick={props.handleClick}>Component2</a></div>    
  )
}
class App extends Component {
  constructor(props){
	super(props);
	if (localStorage.hasOwnProperty('flag')) {
		this.state = {
			flag:localStorage.getItem('flag')
		}
	}else{
		this.state = {
			flag:true
		}
	}
    console.log("constructor "+this.state.flag);
    this.handleClick = this.handleClick.bind(this);
  }
  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }
	saveStateToLocalStorage() {
		for (let key in this.state) {
			localStorage.setItem(key, JSON.stringify(this.state[key]));
		}
	}
	componentDidMount() {
		this.hydrateStateWithLocalStorage();
	}
	componentWillUnmount() {
		this.saveStateToLocalStorage();
	}
	componentWillUpdate( nextProps,nextState){
        localStorage.setItem('flag',nextState.flag);
        console.log("WillUpdate "+nextState.flag);
    }
	handleClick(e){
		this.setState(({
			flag:!this.state.flag
		}));
		localStorage.setItem("flag", JSON.stringify(this.state.flag));
		console.log("handleClick "+this.state.flag);
	}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {
            this.state.flag ? <LINK handleClick={this.handleClick}/> : <LINK2 handleClick={this.handleClick}/>          
        }
      </div>
    );
  }
}

export default App;
