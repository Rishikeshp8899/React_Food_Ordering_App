import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../css/helpcenter.css';

export default class Helpcenter extends Component {
  constructor()
  {
      super();
      this.state={
        show:true
    }

  }
  
    render() {
    return (
      <div className='section1'>
                
     <h1 style={{background: '#210503', color: 'lavender', textAlign: 'center', height: '40px'}}>Help Center</h1>     
        <button className="accordion" style={{color: 'brown'}} onClick={()=>{this.setState({show:!this.state.show})}}>{ this.state.show?'I have a query related to placing an order' : 'For help, please call on 022-6600 07894656'}</button>
        <button className="accordion" style={{color: 'brown'}}onClick={()=>{this.setState({show:!this.state.show})}}> { this.state.show?'I have a payment or refund related query':<Link to={'/feedback'} > FEEDBACK </Link> }</button>
        <button className="accordion" style={{color: 'brown'}}onClick={()=>{this.setState({show:!this.state.show})}}> { this.state.show?'I want to know store contact no and address':<Link to={'/feedback'} > FEEDBACK </Link> }</button>
        <button className="accordion" style={{color: 'brown'}}onClick={()=>{this.setState({show:!this.state.show})}}> { this.state.show?'I want to know store nearby my Home':<Link to={'/feedback'} > FEEDBACK </Link> }</button>
        <button className="accordion" style={{color: 'brown'}}onClick={()=>{this.setState({show:!this.state.show})}}> { this.state.show?'I want to give Feedback or complaint':<Link to={'/feedback'} > FEEDBACK </Link>}</button>
        <button className="accordion" style={{color: 'brown'}}onClick={()=>{this.setState({show:!this.state.show})}}> { this.state.show?'I want to know store nearby my Home':<Link to={'/feedback'} > FEEDBACK </Link>}</button>
      </div>
    )
  }
}

