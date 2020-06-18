import React from 'react';
import {Square} from './componentsLib.js';
export class Field extends React.Component {
    constructor(props){
        super(props);
        this.listOfShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
        let arrayLength = 10;
        let arraySquares = [];
        let list = [];
        this.wasAlreadyShoot = [];
        //создаем изначальный массив клеток
        // value = 0 - состояние не определено
        // 1 - занята кораблем
        // 2 - не может быть занята потому что рядом с кораблем
        for (let index1 = 0; index1 < arrayLength; index1++){
            arraySquares[index1] = [];
            this.wasAlreadyShoot[index1] = [];
            list[index1]=[];
            for (var index2 = 0; index2 < arrayLength; index2++){
                arraySquares[index1][index2] = 0;
                this.wasAlreadyShoot[index1][index2] = false;
            } 
        }
        this.state = {
            listOfShips: this.listOfShips,
            arraySquare: arraySquares,
            type: this.props.type,
            arraySquareLength: arrayLength,
            listOfPlacesShips: list,
            needClick: this.props.needClick
        }    
    }
    
    /**
     * Функция для расстановки кораблей
     */
    positionShips(){
        for (let index = 0; index < this.listOfShips.length; index++){
            let placeForShip = this.randomPlace(index);
            //2-ки - это окружение кораблей. Расставляем 2-ки
            let stopIndex1 = 0, stopIndex2 = 0;
            if (placeForShip.shipPosition == 1) {//если вертикально
                stopIndex1 = (placeForShip.startX + this.listOfShips[index] >= 9) ? 9 : (placeForShip.startX + this.listOfShips[index]); //проверяем до этого индекса
                stopIndex2 = (placeForShip.startY + 1 >= 9) ? 9 : (placeForShip.startY + 1);
            }
            else { //если горизонтально
                stopIndex1 = (placeForShip.startX + 1 >= 9) ? 9 : (placeForShip.startX + 1); //проверяем до этого индекса
                stopIndex2 = (placeForShip.startY + this.listOfShips[index] >= 9) ? 9 : (placeForShip.startY + this.listOfShips[index]);
            }
            // console.log(this.state.arraySquare);
            let startIndex1 = (placeForShip.startX == 0) ? 0 : placeForShip.startX - 1; //проверяем с этого индекса
            let startIndex2 = (placeForShip.startY == 0) ? 0 : placeForShip.startY - 1;
            for (let index1 = startIndex1; index1 <= stopIndex1; index1++)  {                                              
                for (let index2 = startIndex2; index2 <= stopIndex2; index2++)  {                                        
                    this.state.arraySquare[index1][index2] = 2;
                    this.setState({arraySquare: this.state.arraySquare});
                }
            }
            //1-цы - это корабли. Расставляем 1цы
            if (placeForShip.shipPosition == 1){ //вертикально корабль стоит
                for (let index1 = placeForShip.startX; index1 < (placeForShip.startX + this.state.listOfShips[index]); index1++){ //было -1
                    // console.log(index1);
                    this.state.arraySquare[index1][placeForShip.startY] = 1;
                    //заодно заполняем массив с индексами мест, где стоят корабли
                    this.state.listOfPlacesShips[index].push(`${index1}x${placeForShip.startY}`);
                    this.setState({arraySquare: this.state.arraySquare, listOfPlacesShips: this.state.listOfPlacesShips});
                }
            }
            else { //горизонтально корабль стоит
                for (let index1 = placeForShip.startY; index1 < (placeForShip.startY + this.state.listOfShips[index]); index1++){ //было -1
                    // console.log(index1);
                    this.state.arraySquare[placeForShip.startX][index1] = 1;
                    this.state.listOfPlacesShips[index].push(`${placeForShip.startX}x${index1}`);
                    this.setState({arraySquare: this.state.arraySquare, listOfPlacesShips: this.state.listOfPlacesShips});
                }
            }
        }
    }
    /**
     * Функция создания случайного места для корабля
     * @param {Number} index - индекс в массиве this.state.listOfShips
     */
    randomPlace(index){
        let startX = 0;
        let startY = 0;
            let shipPosition = this.getRandom(1); //1 - вертикально, 0 - горизонтально
            if (shipPosition == 0){             //если ставим корабль горизонтально
                startX = this.getRandom(9);
                startY = this.getRandom(9- this.listOfShips[index]);
            }
            else {                                //если ставим корабль вертикально
                startX = this.getRandom(9 - this.listOfShips[index]);
                startY = this.getRandom(9);
            }
            let SquaresIsFree = this.checkPositionShip(index, startX, startY, shipPosition);
            if (SquaresIsFree){                 //место подходит, надо брать
                let params = {
                    startX: startX,
                    startY: startY,
                    shipPosition: shipPosition
                }
                return params;
            }
            else {                              //заново рандомим место
                return this.randomPlace(index);
            }
    }
    /**
     * Функция проверки, станет ли в сгенерированное случайно место корабль
     * @param {*} index - индекс в массиве this.state.listOfShips
     * @param {*} startX сгенерированный индекс строки для вставки
     * @param {*} startY сгенерированный индекс столбца для вставки
     * @param {*} shipPosition сгенерированное направление для вставки
     */
    checkPositionShip(index, startX, startY, shipPosition){
        let startIndex1 = (startX == 0) ? 0 : startX - 1; //индекс начала проверки
        let startIndex2 = (startY == 0) ? 0 : startY - 1;
        let stopIndex1 = 0, stopIndex2 = 0;
        if (shipPosition == 1) {//если вертикально
            stopIndex1 = ((startX + this.listOfShips[index]) >= 9) ? 9 : (startX + this.listOfShips[index]);  //индекс конца проверки
            stopIndex2 = ((startY + 1) >= 9) ? 9 : (startY + 1);
        }
        else { //если горизонтально
            stopIndex1 = ((startX + 1) >= 9) ? 9 : (startX + 1); 
            stopIndex2 = ((startY + this.listOfShips[index]) >= 9) ? 9 : (startY + this.listOfShips[index]); //индекс конца проверки
        }
        for (let index1 = startIndex1; index1 <= stopIndex1; index1++)                                              
            for (let index2 = startIndex2; index2 <= stopIndex2; index2++)  {                                        
                if(this.state.arraySquare[index1][index2] == 1){
                    return false;
                }
            }
        return true;
    }
    /**
     * Функция для генерации случайного числа в диапазоне от 0 до max
     * @param {*} max верхняя граница диапазона
     */
    getRandom(max) {
        return Math.floor(Math.random() * (max + 1));
    }
    /**
     * Функция вызывается в случае, если пользователь "выстрелил" по полю компьютера
     * @param {*} event событие клика
     * @param {*} id id элемента, по которому произошел клик    
     */
    shootShip(event, id){ 
        let arrId = id.split('x', 2); //мы бы привязали эту позицию к компоненту корабля, если б он у нас был
        if (this.state.type=='computer'){ //эта функция вызывается только из поля компьютера
            this.props.changeTurn('computer');
            setTimeout(()=>this.props.computerStep(event), 1000);
            // this.props.computerStep(event);
        }
        else { // НЕ БЫЛО
            this.props.changeTurn('player'); // НЕ БЫЛО
            
            this.props.computerStepEnd(); // НЕ БЫЛО
        }
    }

    /**
     * Функция генерации случайного места для выстрела компьютера
     */
    randomShoot(){
        let index1 = this.getRandom(9);
        let index2 = this.getRandom(9);
        // console.log(1);
        if (this.checkRandomShoot(index1,index2)){
            this.wasAlreadyShoot[index1][index2] = true;
            let params = {
                index1: index1,
                index2: index2
            }
            return params;
        }
        else return this.randomShoot();
    }
    /**
     * функция для проверки, не стрелял ли еще компьютер по этому полю
     * @param {*} index1 индекс по строке
     * @param {*} index2 индекс по столбцу
     */
    checkRandomShoot(index1,index2){
        if (this.wasAlreadyShoot[index1][index2]==false){
            return true;
        }
    }
    componentWillMount() {
        this.positionShips();
    }

    componentWillReceiveProps(props) {    
        this.setState({needClick: props.needClick});    
        // this.setState({listSquare: this.createSquares()}); //раньше было так, но браузер стрелял дуплетом тогда

    }    

    /**
     * Функция для создания блоков Square для вставки
     */
    createSquares(){
        let listSquares1 = [];
        if (this.state.needClick){
            let indexes = this.randomShoot();
            // if (this.state.type=='player'){
            //     let square = document.querySelector(`#${this.state.type + indexes.index1 + 'х' + indexes.index2}`).firstChild.firstChild;
            // }
            listSquares1 = this.state.arraySquare.map((row, indexrow)=>{
                return <div className="field__row">     
                            {row.map((item, index) => { 
                                    return <Square 
                                        id = {this.state.type + indexrow + 'х' + index}
                                        findID = {this.state.type + indexes.index1 + 'х' + indexes.index2}
                                        value = {item}
                                        wasShoot = {true}
                                        wasAlreadyShoot = {true}
                                        type = {this.state.type}/>;
                            })}
                        </div>;     
            });  
            this.shootShip(undefined, `${indexes.index1}x${indexes.index2}`); // НЕ БЫЛО
        }
        else{
            listSquares1 = this.state.arraySquare.map((row, indexrow)=>{
                return <div className="field__row">     
                    {row.map((item, index) => { 
                        return <Square 
                            id = {this.state.type + indexrow + 'х' + index}
                            value = {item}
                            wasShoot = {false}
                            wasAlreadyShoot = {false}
                            type = {this.state.type}
                            shootShip = {this.shootShip.bind(this)}/>;
                    })}
                        </div>;     
            });  
        }
        return listSquares1;
    }



    render() {
        let listSquares1 = this.createSquares();
        return  <div className  = {'field' + ` field_${this.state.type}`}>
                       {listSquares1} 
                </div>
        }
}