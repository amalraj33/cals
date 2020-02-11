import React, { Component } from 'react';
import './style.css';

var input = {},inputdig={};
export default class Calculator extends React.Component {
  constructor(props){
		super(props);
		 this.state ={
			input:'',
			previous : [],
			nextIsReset : false
		}
		 this.onDigit = this.onDigit.bind(this);
		 this.onResult = this.onResult.bind(this);
		 this.handleClearDisplay = this.handleClearDisplay.bind(this);
	}
	handleClearDisplay(props){
		console.log(input);
		this.setState({
				input:0
		});
	}
	onDigit(props){
      var lastoperator;
			input = props.target.innerText;
			console.log(input);
			inputdig = this.state.input;
			console.log(inputdig);
		if(this.state.input.length<10){
			if(["+","-","*","/"].indexOf(props) > -1 && inputdig == ""){
				this.setState({
				input:0
			  });
			}else{
				inputdig += input;
				this.setState({
				input:inputdig
			  });
			}
		}else{
			alert('allowed only 10 char');
		}
		
	}
	onResult(props){
		console.log(inputdig);
		var current = '';
		var cals= [],newcals= [],currentop;
		console.log(cals);
		var ops =[{
            '^': function(a, b) {
                return Math.pow(a, b);
            }
        }, {
            '*': function(a, b) {
                return a * b
            },

            '/': function(a, b) {
                return a / b
            },
			
            '%': function(a, b) {
                return a / b
            },
        }, {
            '+': function(a, b) {
                return a + b
            },

            '-': function(a, b) {
                return a - b
            }
        }]
		var result = eval(inputdig);
		for(var i = 0 ,ope; ope = inputdig.charAt(i);i++){
		   if('^*/+-%'.indexOf(ope)>-1){
				if(current == '' && ope == '-'){
					current = '-';
				}else{
					cals.push(parseFloat(current),ope);
					current = '';
				}
		   }else{
				current += inputdig.charAt(i);
		   }
		}
		if(current != ''){
			cals.push(parseFloat(current));
		}
		for(var i = 0 ; i <ops.length ;i++){
			for(var j = 0 ; j <cals.length ;j++){
				if(ops[i][cals[j]]){
					currentop = ops[i][cals[j]];
				}else if(currentop){
					newcals[newcals.length-1] = currentop(newcals[newcals.length-1],cals[j]);
					currentop = null;
				}else{
					newcals.push(cals[j]);
				}
				console.log(newcals);
			}
			cals = newcals;
			newcals=[];
		}
		if(cals.length >1){
			console.log(cals+'err');
		}else{
			console.log(cals[0]);	
		}
		console.log(newcals);
		this.setState({
        input:cals
      });
	}
	render(){
		return(
			<div>
				<Buttons  
					onDigit={this.onDigit}
					onResult={this.onResult}
					input ={this.state.input}
					handleClearDisplay={this.handleClearDisplay}
				/>
			</div>
		);
	}
}
class Buttons extends React.Component {
	render() {
		return(
		<div>
		<h1 className="text-center">React Calculator</h1>
        <div className="container">
          <div className="keys">
			 <div className="display" id="getnumber">{((this.props.input))}</div>
			 <a href="#" className="item clear" onClick={this.props.handleClearDisplay}>C</a>
			 <a href="#" className="item"  onClick={this.props.onDigit}>&plusmn;</a>
             <a href="#" className="item"  onClick={this.props.onDigit}>%</a>
			<a href="#" className="opritem" onClick={this.props.onDigit}>/</a>
			<a href="#" id="seven" className="item" onClick={this.props.onDigit}>7</a>
			<a href="#"  id="eight"  className="item" onClick={this.props.onDigit}>8</a>
			<a href="#"  id="nine"  className="item" onClick={this.props.onDigit}>9</a>
			<a href="#" className="opritem" onClick={this.props.onDigit}>*</a>
			<a href="#" id="four" className="item" onClick={this.props.onDigit}>4</a>
			<a href="#"  id="five"  className="item" onClick={this.props.onDigit}>5</a>
			<a href="#"  id="six"  className="item" onClick={this.props.onDigit}>6</a>
			<a href="#" className="opritem" onClick={this.props.onDigit}>-</a>
			<a href="#"id="one" className="item" onClick={this.props.onDigit}>1</a>
			<a href="#" id="two"  className="item" onClick={this.props.onDigit}>2</a>
			<a href="#"  id="three"  className="item" onClick={this.props.onDigit}>3</a>
			<a href="#" className="opritem" onClick={this.props.onDigit}>+</a>
			<a href="#"id="zero" className="item" onClick={this.props.onDigit}>0</a>
			<a href="#"   className="item" onClick={this.props.onDigit}>.</a>
			<a href="#" className="opritem" onClick={this.props.onResult}>=</a>
          </div>
        </div>
		</div>
		);
	}
}
