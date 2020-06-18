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
    }
    /**
     * Функция обработчик нажатия по полю компьютера (игрок сделал свой ход, пора ходить компьютеру)
     * @param {Event} event 
     */
    computerStep(event){
        console.log('computerStep');
        this.setState({needClick: true});
        event.stopPropagation();
    }
    /**
     * Компьютер сделал свой ход, пора ходить игроку
     * @param {Event} event 
     */
    computerStepEnd(){
        console.log('computerStepEnd');
        this.setState({needClick: false});
        // event.stopPropagation();
    }
    /**
     * Функция-обработчик изменений в поле ввода имени игрока
     * @param {Event} event 
     */
    userFullnameOnChange(event){
        this.setState({userFullName: event.target.value});
    }
    /**
     * Функция-обработчик изменений в поле ввода имени компьютера
     * @param {Event} event 
     */
    computerFullnameOnChange(event){
        this.setState({computerFullName: event.target.value});
    }
    /**
     * Функция-обработчик нажатия на кнопку "К бою"
     * @param {Event} event 
     */
    readNames(event){
        event.preventDefault();
        event.stopPropagation();
        this.setState({formIsActive: false});
    }
    /**
     * Устанавливаем кто сейчас ходит (игрок или компьютер)
     * @param {String} who 
     */
    changeTurn(who){
        this.setState({whoseTurn: who});
    }

    render() {
        let strHi = (this.state.whoseTurn=='player')? 'Ваш ход, сударь ' + this.state.userFullName : 'Ходит компьютер ' + this.state.computerFullName;
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
                        <input className="form-names__button form-button" type = "submit" id="add-person-button" name="add-person-button" value="К бою!" onClick = {this.readNames.bind(this)}/>
                        </p>
                    </form>
                    <div className = "shell_whoIsNext"> 
                        {strHi}
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
