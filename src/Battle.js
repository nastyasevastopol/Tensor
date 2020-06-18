import React from 'react';
import {Header, Field} from './componentsLib.js';
// import './App.css';

class Battle extends React.Component{
    constructor(props){
        super(props);
    this.state = {
        formIsActive: true,
        whoseTurn: 'player',
        needClick: props.needClick,
        userFullName: 'You',
        computerFullName: 'John',
        fields: ['player' ,'computer']
    }   
    // this.state.fields.splice( 0 , 2 ,
    //     <Field type='player' needClick = {this.state.needClick}
    //                     computerStepEnd = {this.computerStepEnd.bind(this)}
    //                     changeTurn = {this.changeTurn.bind(this)}/> ,
    //     <Field type='computer' needClick = {false}
    //                     computerStep = {this.computerStep.bind(this)}
    //                     computerStepEnd = {this.computerStepEnd.bind(this)}
    //                     changeTurn = {this.changeTurn.bind(this)}/> );
    // this.school = new School();
  }
    computerStep(event){
        this.setState({needClick: true});
        // console.log(1);
        event.stopPropagation();
    }
    computerStepEnd(event){
        this.setState({needClick: false});
        event.stopPropagation();
    }
    userFullnameOnChange(event){
        this.setState({userFullName: event.target.value});
    }
    computerFullnameOnChange(event){
        this.setState({computerFullName: event.target.value});
    }
    readNames(event){
        event.preventDefault();
        event.stopPropagation();
        this.setState({formIsActive: false});
    }
    changeTurn(who){
        this.setState({whoseTurn: who});
    }

    render() {
            return <div className="shell">
                    <Header title='Морской бой' description='Сыграем?' />  
                    <form id="form-names" className= {this.state.formIsActive? "shell__form-names form-names" : "disable"}>
                        <p className="form-names__string">
                                <label className="form-names__label form-label" htmlFor="input-add-fullname">Введите ваше имя</label>
                                <input className="form-names__input form-input" id="input-user-fullname" type = "text" placeholder="Введите ФИО человека" value={this.state.userFullName} onChange={this.userFullnameOnChange.bind(this)}/>
                        </p>
                        <p className="form-names__string">
                                <label className="form-names__label form-label" htmlFor="input-add-fullname">Введите имя компьютера</label>
                                <input className="form-names__label form-input" id="input-computer-fullname" type = "text" placeholder="Введите ФИО человека" value={this.state.computerFullName} onChange={this.computerFullnameOnChange.bind(this)}/>
                        </p>
                        <p className="form-names__string">
                        <input className="form-names__button form-button" type = "submit" id="add-person-button" name="add-person-button" value="В бой!" onClick = {this.readNames.bind(this)}/>
                        </p>
                    </form>
                    <div className = "shell_whoIsNext"> 
                        {(this.state.whoseTurn=='player')? "Ваш ход, сударь" : "Ходит компьютер"}
                    </div>
                    <div id="container" className="shell__container">
                        <Field type='player' needClick = {this.state.needClick}
                            computerStepEnd = {this.computerStepEnd.bind(this)}
                            changeTurn = {this.changeTurn.bind(this)}/> 
                        <Field type='computer' needClick = {false}
                            computerStep = {this.computerStep.bind(this)}
                            computerStepEnd = {this.computerStepEnd.bind(this)}
                            changeTurn = {this.changeTurn.bind(this)}/> 
                    </div>
                </div>;   
    }
}


export default Battle;
