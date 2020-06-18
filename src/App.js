import React from 'react';
import Battle from './Battle.js';
// import './App.css';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            battle: [1]
        }
    }
    /**
     * обработчик для клика по кнопке "начать заново"
     * @param {Event} event 
     */
    newGame(event){
        // event.stopPropagation();
        // event.preventDefault();
        // this.state.battle.splice(0,1);
        // this.setState({battle:this.state.battle});
        // this.state.battle.push(2);
        // this.setState({battle:this.state.battle});
    }
    render() {
        //пробовала сделать кнопку - не успела
  
    return <div>
                {this.state.battle.map((battle)=> <Battle id={battle} needClick={false}/>)}
                <div>
                    <input className="shell__button form-button" type = "submit" id="newStart" value="Начать заново (я есть, но не работаю)" onClick = {this.newGame.bind(this)}/>
                </div>
            </div>;   
    }
}


export default App;
