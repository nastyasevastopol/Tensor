import React from 'react';
import {Header, Field} from './componentsLib.js';
// import './App.css';

class App extends React.Component{
    constructor(props){
        super(props);
    this.state = {
        needClick: props.needClick
    }   
    // this.school = new School();
  }
    computerStep(event){
        this.setState({needClick: true});
        console.log(1);
        // event.stopPropagation();
    }
    computerStepEnd(){
        this.setState({needClick: false});
        // event.stopPropagation();
    }
    render() {
// {/* <Battle />   */}
        console.log(this.state.needClick);
        // if (this.state.needToClick){
            return <div>
                <Header title='Морской бой' description='Сыграем?' />  
                    <div id="container" className="container">
                        <Field type='player' needClick = {this.state.needClick}
                        computerStepEnd = {this.computerStepEnd.bind(this)}/> 
                        <Field type='computer' needClick = {false}
                            computerStep = {this.computerStep.bind(this)}
                            /> 
                    </div>  
                </div>;   
        // } 
        // else {
        //     return <div>
        //         <Header title='Морской бой' description='Сыграем?' />  
        //             <div id="container" className="container">
        //                 <Field type='player' needClick = {false}
        //                 computerStepEnd = {this.computerStepEnd.bind(this)}/> 
        //                 <Field type='computer'
        //                     computerStep = {this.computerStep.bind(this)}
        //                     /> 
        //             </div>  
        //         </div>;   
        // }
    }
}


export default App;
