import React from 'react';
import {Square} from './componentsLib.js';
export class Field extends React.Component {
    constructor(props){
        super(props);
        this.listOfShips = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
        //создаем изначальный массив клеток
        // value = 0 - состояние не определено
        // 1 - занята кораблем
        // 2 - не может быть занята потому что рядом с кораблем
        let arrayLength = 10;
        let arraySquares = [];
        let list = [];
        for (let index1 = 0; index1 < arrayLength; index1++){
            // this.arraySquares[index1] = Array(10).fill(0); 
            arraySquares[index1] = [];
            list[index1]=[];
            for (var index2 = 0; index2 < arrayLength; index2++){
                arraySquares[index1][index2] = 0;
            } 
        }
        // console.log(this.state.arraySquares);
        this.state = {
            listOfShips: this.listOfShips,
            arraySquare: arraySquares,
            type: this.props.type,
            arraySquareLength: arrayLength,
            listSquare: [],
            listOfPlacesShips: list,
            needClick: this.props.needClick
        }    
        // console.log(this.state.arraySquares);
    }
    //расставляем корабли
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
                    // console.log(this.state.arraySquare[index1][index2]);
                }
            }
            //1-цы - это корабли. Расставляем 1цы
            if (placeForShip.shipPosition == 1){ //вертикально корабль стоит
                for (let index1 = placeForShip.startX; index1 < (placeForShip.startX + this.state.listOfShips[index]); index1++){ //было -1
                    // console.log(index1);
                    this.state.arraySquare[index1][placeForShip.startY] = 1;
                    //заодно заполняем массив с индексами мест, где стоят корабли
                    this.state.listOfPlacesShips[index].push(`${index1}x${placeForShip.startY}`);
                    this.setState({arraySquare: this.state.arraySquare,
                                    listOfPlacesShips: this.state.listOfPlacesShips});
                }
            }
            else { //горизонтально корабль стоит
                for (let index1 = placeForShip.startY; index1 < (placeForShip.startY + this.state.listOfShips[index]); index1++){ //было -1
                    // console.log(index1);
                    this.state.arraySquare[placeForShip.startX][index1] = 1;
                    // this.setState({arraySquare: this.state.arraySquare});
                    //заодно заполняем массив с индексами мест, где стоят корабли
                    // this.state.arraySquare[index1][placeForShip.startY] = 1;
                    //заодно заполняем массив с индексами мест, где стоят корабли
                    this.state.listOfPlacesShips[index].push(`${placeForShip.startX}x${index1}`);
                    this.setState({arraySquare: this.state.arraySquare,
                                    listOfPlacesShips: this.state.listOfPlacesShips});
                }
            }
        }
    }
    randomPlace(index){
        let startX = 0;
        let startY = 0;
        // if (this.listOfShips[index] > 1){
            let shipPosition = this.getRandom(1); //1 - вертикально, 0 - горизонтально
            if (shipPosition == 0){ //если ставим корабль горизонтально
                startX = this.getRandom(9);
                startY = this.getRandom(9- this.listOfShips[index]);
            }
            else { //если ставим корабль вертикально
                startX = this.getRandom(9 - this.listOfShips[index]);
                startY = this.getRandom(9);
            }
            // if(this.state.arraySquare[startX][startY] != 0){

            // }
            // console.log(`индекс1 = ${startX} индекс2 = ${startY}`);
            let SquaresIsFree = this.checkPositionShip(index, startX, startY, shipPosition);
            if (SquaresIsFree){ //место подходит, надо брать
                let params = {
                    startX: startX,
                    startY: startY,
                    shipPosition: shipPosition
                }
                // console.log(`индексстарт1 = ${startX} индексстарт2 = ${startY}`);
                return params;
            }
            else {//заново рандомим место
                return this.randomPlace(index);
            }
        // }
        // else { //для кораблей из одного блока чтобы не переполнять стек вызовов
        //     console.log(this.listOfShips[index]);
        //     let direction = this.getRandom(1); //добавляем случайности
        //     if (direction){
        //         for (let index1 = 0; index1 < 10; index1++){
        //             for (let index2 = 9; index2 >= 0; index2--){
        //                 if (this.state.arraySquare[index1][index2] == 0){
        //                     let params = {
        //                         startX: index1,
        //                         startY: index2,
        //                         shipPosition: 1
        //                     }
        //                     return params;
        //                 }
        //             }
                    
        //         }
        //     }
        //     else {
        //         for (let index1 = 9; index1 >= 0; index1--){
        //             for (let index2 = 0; index2 < 10; index2++){
        //                 if (this.state.arraySquare[index1][index2] == 0){
        //                     let params = {
        //                         startX: index1,
        //                         startY: index2,
        //                         shipPosition: 1
        //                     }
        //                     return params;
        //                 }
        //             }
                    
        //         }
        //     }
        // }
    }
    
    checkPositionShip(index, startX, startY, shipPosition){
        let startIndex1 = (startX == 0) ? 0 : startX - 1; //проверяем с этого индекса
        let startIndex2 = (startY == 0) ? 0 : startY - 1;
        let stopIndex1 = 0, stopIndex2 = 0;
        if (shipPosition == 1) {//если вертикально
            stopIndex1 = ((startX + this.listOfShips[index]) >= 9) ? 9 : (startX + this.listOfShips[index]); //проверяем до этого индекса
            stopIndex2 = ((startY + 1) >= 9) ? 9 : (startY + 1);
        }
        else { //если горизонтально
            stopIndex1 = ((startX + 1) >= 9) ? 9 : (startX + 1); //проверяем до этого индекса
            stopIndex2 = ((startY + this.listOfShips[index]) >= 9) ? 9 : (startY + this.listOfShips[index]);
        }
        for (let index1 = startIndex1; index1 <= stopIndex1; index1++)                                              //НЕ УВЕРЕНА ЧТО ТУТ ДОЛЖНО БЫТЬ <=
            for (let index2 = startIndex2; index2 <= stopIndex2; index2++)  {                                        //НЕ УВЕРЕНА ЧТО ТУТ ДОЛЖНО БЫТЬ <=
                if(this.state.arraySquare[index1][index2] == 1){
                    return false;
                }
            }
        return true;

                // if (shipPosition == 1){ //вертикально корабль стоит
        //     stopIndex1 = ((startX + this.listOfShips[index]) >= 9) ? 9 : (startX + this.listOfShips[index]); //проверяем до этого индекса
        //     for (let index1 = startX; index1 < stopIndex1; index1++){ //было -1
        //         // console.log(index1);
        //         if(this.state.arraySquare[index1][startY] == 1){
        //             return false;
        //         }
        //     }
        // }
        // else { //горизонтально корабль стоит
        //     stopIndex1 = ((startX + this.listOfShips[index]) >= 9) ? 9 : (startX + this.listOfShips[index]); //проверяем до этого индекса
        //     for (let index1 = startY; index1 < stopIndex1; index1++){ //было -1
        //         // console.log(index1);
        //         if(this.state.arraySquare[startX][index1] == 1){
        //             return false;
        //         }
        //     }
        // }
    }
    getRandom(max) {
        return Math.floor(Math.random() * (max + 1));
    }
    shootShip(event, id){ //эта функция вызывается только из поля компьютера
        let arrId = id.split('x', 2);

        // this.state.listSquare.getElementById(id).wasShoot = true;
                    // //2-ки - это окружение кораблей. Расставляем 2-ки
                    // if (placeForShip.shipPosition == 1) {//если вертикально
                    //     stopIndex1 = (placeForShip.startX + this.listOfShips[index] >= 9) ? 9 : (placeForShip.startX + this.listOfShips[index]); //проверяем до этого индекса
                    //     stopIndex2 = (placeForShip.startY + 1 >= 9) ? 9 : (placeForShip.startY + 1);
                    // }
                    // else { //если горизонтально
                    //     stopIndex1 = (placeForShip.startX + 1 >= 9) ? 9 : (placeForShip.startX + 1); //проверяем до этого индекса
                    //     stopIndex2 = (placeForShip.startY + this.listOfShips[index] >= 9) ? 9 : (placeForShip.startY + this.listOfShips[index]);
                    // }
                    // // console.log(this.state.arraySquare);
                    // let startIndex1 = (placeForShip.startX == 0) ? 0 : placeForShip.startX - 1; //проверяем с этого индекса
                    // let startIndex2 = (placeForShip.startY == 0) ? 0 : placeForShip.startY - 1;
                    // for (let index1 = startIndex1; index1 <= stopIndex1; index1++)  {                                              
                    //     for (let index2 = startIndex2; index2 <= stopIndex2; index2++)  {                                        
                    //         this.state.arraySquare[index1][index2] = 2;
                    //         this.setState({arraySquare: this.state.arraySquare});
                    //         // console.log(this.state.arraySquare[index1][index2]);
                    //     }
        // this.setState({listSquare:this.state.listSquare});
        if (this.state.type=='computer'){
            this.props.computerStep(event);
            console.log(`обработали нажатие`);
            // this.setState({needClick: true});
            // console.log(`${this.state.type} ${this.state.needClick}`);
        }

        // event.stopPropagation();
    }
    componentWillMount() {
        this.positionShips();
        // this.setState({arraySquare: this.arraySquares}); //state. ПРАВИЛЬНО     
        // this.setState({listSquare: this.createSquares()});
        
    //     // console.log(this.state.listOfPlacesShips);
    }
        // componentWillReceiveProps(props) {
        //     if (this.state.type == 'player'){
        //         this.setState({needClick: props.needClick});//props.needClick
        //         // this.state.listSquare = this.createSquares();
        //         console.log(props);
        //         console.log(this.state.needClick);
        //         // this.setState({listSquare: this.state.listSquare});
        //     }
        // }
        // componentDidUpdate(){
        //     if (this.state.type == 'player'){
        //         this.props.computerStepEnd();
        //         console.log(`componentDidMount ${this.state.needClick}`);
        //     }
        // }
    componentWillReceiveProps(nextProps){
        if (this.state.type=='player'){
            this.setState({needClick: nextProps.needClick});
            // console.log(this.state.needClick);
        }
    }
    // componentDidUpdate(){
    //     if (this.state.needClick)
    //         this.props.computerStepEnd();
    //     // this.setState({listSquare: this.createSquares()});
    // }
    //создаем массив блоков для вставки
    createSquares(){
        
        if (this.state.needClick){
            //случайно выбираем место чтобы кликнуть
            //добавим состояние в Square, которое вызовет функцию в нем для нашего id, которое мы нарандомили (функция как handleclick, только без события)
            let index1 = this.getRandom(9);
            let index2 = this.getRandom(9);
            // console.log(`${index1} ${index2}`);
            // let field = document.querySelector('.field-pc').getElementsByClassName('square')
            let listSquares1 = [];
            console.log(`из createSquares ${this.state.type} true ${this.state.arraySquare}`);
            listSquares1 = this.state.arraySquare.map((row, indexrow)=>{
                return <div className="field__row">     
                {row.map((item, index) => { 
                    // console.log(`${indexrow + 'х' + index}`);
                    if ((indexrow==index1)&&(index==index2)){
                        console.log(`${indexrow} ${index}`);
                        return <Square 
                            id = {indexrow + 'х' + index}
                            value = {item}
                            wasShoot = {true}
                            wasAlreadyShoot = {true}
                            type = {this.state.type}/>;
                            //shootShip = {this.shootShip.bind(this)} было тут
                    }
                    else 
                        return <Square 
                        id = {indexrow + 'х' + index}
                        value = {item}
                        type = {this.state.type}
                        />;
                        // wasShoot = {false}
                        // wasAlreadyShoot = {false}
                        //shootShip = {this.shootShip.bind(this)} было тут
                })}
                        </div>;     
            });  
            
            // this.setState({needClick: false});
            return listSquares1;
        }
        else{
            let listSquares1 = [];
            console.log(`из createSquares ${this.state.type} ${this.state.arraySquare}`);
            listSquares1 = this.state.arraySquare.map((row, indexrow)=>{
                return <div className="field__row">     
                {row.map((item, index) => { 
                    // console.log(`${indexrow + 'х' + index}`);
                    return <Square 
                        id = {indexrow + 'х' + index}
                        value = {item}
                        wasShoot = {false}
                        wasAlreadyShoot = {false}
                        type = {this.state.type}
                        shootShip = {this.shootShip.bind(this)}/>;
                })}
                        </div>;     
            });  
            return listSquares1;
        }
    }

    render() {
        console.log(this.state.needClick);
        let listSquares1 = [];
        if (this.props.needClick){
            // console.log(2);
            //случайно выбираем место чтобы кликнуть
            //добавим состояние в Square, которое вызовет функцию в нем для нашего id, которое мы нарандомили (функция как handleclick, только без события)
            let index1 = this.getRandom(9);
            let index2 = this.getRandom(9);
            if ()
            // console.log(`${index1} ${index2}`);
            // let field = document.querySelector('.field-pc').getElementsByClassName('square')
            console.log(`из createSquares ${this.state.type} true ${this.state.arraySquare}`);
            listSquares1 = this.state.arraySquare.map((row, indexrow)=>{
                return <div className="field__row">     
                {row.map((item, index) => { 
                    // console.log(`${indexrow + 'х' + index}`);
                    // if ((indexrow==index1)&&(index==index2)){
                        // console.log(`${indexrow} ${index}`);
                        return <Square 
                            id = {indexrow + 'х' + index}
                            findID = {index1 + 'х' + index2}
                            value = {item}
                            wasShoot = {true}
                            wasAlreadyShoot = {true}
                            type = {this.state.type}/>;
                            //shootShip = {this.shootShip.bind(this)} было тут
                    // }
                //     else 
                //         return <Square 
                //         id = {indexrow + 'х' + index}
                //         value = {item}
                //         type = {this.state.type}
                //         />;
                //         // wasShoot = {false}
                //         // wasAlreadyShoot = {false}
                //         //shootShip = {this.shootShip.bind(this)} было тут
                })}
                        </div>;     
            });  
            
            // this.setState({needClick: false});
        }
        else{
            console.log(`из createSquares ${this.state.type} ${this.state.arraySquare}`);
            listSquares1 = this.state.arraySquare.map((row, indexrow)=>{
                return <div className="field__row">     
                {row.map((item, index) => { 
                    // console.log(`${indexrow + 'х' + index}`);
                    return <Square 
                        id = {indexrow + 'х' + index}
                        value = {item}
                        wasShoot = {false}
                        wasAlreadyShoot = {false}
                        type = {this.state.type}
                        shootShip = {this.shootShip.bind(this)}/>;
                })}
                        </div>;     
            });  

        }
        // let listSquares1 = [];
        // console.log(`из render ${this.state.arraySquare}`);
        // listSquares1 = this.state.arraySquare.map((row, indexrow)=>{
        //     return <div className="field__row">     
        //     {row.map((item, index) => { 
        //         console.log(`${indexrow + 'х' + index}`);
        //         return <Square 
        //             id = {indexrow + 'х' + index}
        //             // key = {indexrow + 'х' + index}
        //             value = {item}
        //             wasShoot = {false}
        //             wasAlreadyShoot = {false}
        //             type = {this.state.type}
        //             shootShip = {this.shootShip.bind(this)}/>;
        //     })}
        //             </div>;     
        // }); 
        // console.log(`${this.state.type} ${this.state.needClick}`);
        return  <div className  = {'field' + ` field_${this.state.type}`}>
                       {listSquares1} 
                </div>
        }
}