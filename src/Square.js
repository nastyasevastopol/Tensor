import React from 'react';
export class Square extends React.Component {
        constructor(props){
            super(props);
            this.state = {  id: props.id, 
                            key: props.id, 
                            value: props.value,
                            wasShoot: props.wasShoot,
                            wasAlreadyShoot: props. wasAlreadyShoot || false,
                            type: props.type //тип - это клетки игрока или компьютера
                        }
        }
    /**
     * Обработчик события нажатия на квадратик 
     * @param {Event} e - событие нажатия на квадратик
     */
    handleClick(e){
        if (this.state.wasAlreadyShoot==false){
            this.setState({wasShoot : true, wasAlreadyShoot: true});
            this.props.shootShip(e, this.state.id);
        }
        else {
            //пока мы тут ничего не делаем, но может потом будем выводить сообщение мол сюда уже стреляли
            alert("Вы уже стреляли в эту точку"); 
        }
    }
    componentWillReceiveProps(nextProps){
        if (this.state.type == 'player'){
            if (nextProps.findID){
                if (this.state.id==nextProps.findID)
                this.setState({wasShoot: true, wasAlreadyShoot: true}); 
            }
        }
    }
    render() {
        if (this.state.type=='player'){ //поле игрока 
            return  <div className = {"square field__square field__square_player"} id = {this.state.id}>
                            {this.state.value == 1 ? 
                                <div className="square__shoot_player">
                                    <img className = {this.state.wasShoot ? "square__shoot" : "square__shoot disable"} src = {'../img/dagger.png'}/>
                                </div>
                                : 
                                <div>
                                    <img className = {this.state.wasShoot ? "square__shoot" : "square__shoot disable"} src = {'../img/dot.png'}/>
                                </div>} 
                    </div>
        }
        else {  //поле компьютера
            return  <div className = {"square field__square field__square_computer"} id = {this.state.id} onClick = {this.handleClick.bind(this)}>
                            {this.state.value == 1 ? 
                                <img className = {this.state.wasShoot ? "square__shoot" : "square__shoot disable"} src = {'../img/dagger.png'}/> : 
                                <img className= {this.state.wasShoot ? "square__shoot" : "square__shoot disable"} src = {'../img/dot.png'}/>}
                    </div>
        }
    }
}