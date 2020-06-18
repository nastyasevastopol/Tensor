import React from 'react';
export class Square extends React.Component {
        //   <img className="information__logo" src="img/logo.jpg" alt="Логотип"/>
        constructor(props){
            super(props);
            // this.school = new School();
            //создаем изначальный массив клеток
            // value = 0 - состояние не определено
            // 1 - занята кораблем
            // 2 - не может быть занята потому что рядом с кораблем
            //wasShoot - было ли попадание в клетку (0-нет, 1 - да)
            // this.emptyImgSrc = '';
            // this.shipImgSrc = '';
            this.state = {  id: props.id, 
                            key: props.id, 
                            value: props.value,
                            wasShoot: props.wasShoot,
                            wasAlreadyShoot: props. wasAlreadyShoot || false,
                            type: props.type //тип - это клетки игрока или компьютера
                        }
        }
    handleClick(e){
        if (this.state.wasAlreadyShoot==false){
            this.setState({wasShoot : true, wasAlreadyShoot: true});
            // console.log(this.state.id);
            //как-то там вызвать функцию пониже, которая скажет что мол клетка с этим id уже нажата - для корабля пригодится
            this.props.shootShip(e, this.state.id);//так раньше не работало, потому что я привязывала контекст this
        }
        else {
            //пока мы тут ничего не делаем, но может потом будем выводить сообщение мол сюда нельзя нажать
        }
    }
    componentWillReceiveProps(nextProps){
        if (this.state.type=='player'){
            if (nextProps.findID){
                if (this.state.id==nextProps.findID)
                this.setState({wasShoot: true});
            }
            
            // console.log(this.state.needClick);
        }
    }
    render() {
        //// было onClick = {this.handleClick.bind(this)} onClick = {(e) => {this.handleClick.bind(this, e)}}>
        if (this.state.type=='player'){ //поле игрока
            
            return  <div className = {"square field__square field__square_player"} id = {this.state.id}>
                            {this.state.value == 1 ? 
                                <div className="square__shoot_player">
                                    <img className = {this.state.wasShoot ? "square__shoot" : "square__shoot square__shoot_disable"} src = {'../img/dagger.png'}/>
                                </div> : 
                                <img className = {this.state.wasShoot ? "square__shoot" : "square__shoot square__shoot_disable"} src = {'../img/dot.png'}/>} 
                    </div>
        }
        else {  //поле компьютера
            // console.log(this.state.wasShoot);
            return  <div className = {"square field__square field__square_computer"} id = {this.state.id} onClick = {this.handleClick.bind(this)}>
                            {this.state.value == 1 ? 
                                <img className = {this.state.wasShoot ? "square__shoot" : "square__shoot square__shoot_disable"} src = {'../img/dagger.png'}/> : 
                                <img className= {this.state.wasShoot ? "square__shoot" : "square__shoot square__shoot_disable"} src = {'../img/dot.png'}/>}
                    </div>
        }
    }
}