import React from 'react'
import {offerItem,offerItemTwo} from '../reducers/cartReducer';
import { useDispatch } from "react-redux";
import '../css/offer.css';
 

export default function Offer() {
  const dispatch = useDispatch();
  return (
    <div className='filed' >
    <div className="cardmb-3" >
      <div className="colmd4">
        <img src={require("../img/c6e04a92f7e9bbae049481764a1e030f.png")} style={{width:'50%',height:'50%', margin:'15%'}}/>
      </div>
      <div className="colmd8">
        <div className="cardbody">
          <h2 >Big Offer1</h2>
          <p style={{margin:'2%'}}>20% Discount Deals & Food Offers in Mumbai Restaurants</p>
          <p style={{margin:'2%'}}><small>Last updated 3 mins ago</small></p>
          <p ><button onClick={()=>{dispatch(offerItem())}} style={{width:'50%',height:'8%',padding:'2%' ,margin:'2%', border:'2px'}} > Reedem </button> </p>
        </div>
      </div>
      </div>
      <div className="cardmb-4" >
      <div className="colmd41">
        <img src={require("../img/istockphoto-1214934854-612x612.jpg")} style={{width:'50%',height:'50%', margin:'15%'}}/>
      </div>
      <div className="colmd81">
        <div className="cardbody1">
          <h2 >Student Discounts</h2>
          <p style={{margin:'2%'}}>You Can Buy With Student Discounts </p>
          <p style={{margin:'2%'}}><small>Last updated 3 mins ago</small></p>
          <p ><button onClick={()=>{dispatch(offerItemTwo())}}  style={{width:'50%',height:'8%',padding:'2%' ,margin:'2%', border:'2px'}} > Reedem </button> </p>
        </div>
      </div>
      </div>
       <div className="cardmb-5" >
      <div className="colmd42">
        <img src={require("../img/new-delhi-people-throng-a-newly-opened-fast-food-restaurant-in-a-delhi-1240035.jpg")} style={{width:'50%',height:'50%', margin:'15%'}}/>
      </div>
      <div className="colmd8">
        <div className="cardbody2">
          <h2 >Family Discount</h2>
          <p style={{margin:'2%'}} >This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p style={{margin:'2%'}}><small>Last updated 3 mins ago</small></p>
          <p ><button onClick={()=>{dispatch(offerItemTwo())}} style={{width:'50%',height:'8%',padding:'2%' ,margin:'2%', border:'2px'}} > Reedem </button> </p>
        </div>
      </div>
    
  </div>
  </div>
  )
}
