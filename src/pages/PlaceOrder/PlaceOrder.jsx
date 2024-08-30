import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../ context/StoreContext'
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function PlaceOrder() {
  const {getTotalCartAmount,token, food_list, cartItems,url} = useContext(StoreContext);
  const navigate = useNavigate()
  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  });
  const onchangeHandler=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData((data)=>({...data,[name]:value}));
  };
  
  const placeOrder = async(e)=>{
    e.preventDefault();
    let order_items=[];
    food_list.map((item)=>{
      if(cartItems[item._id]){
        let itemInfo = item;
        itemInfo['quantity']=cartItems[item._id];
        order_items.push(itemInfo);
      }
    });
    let order_data = {
      address: data,
      items: order_items,
      amount: getTotalCartAmount()+2,
    }
    let res = await axios.post(url+'/api/order/place',order_data, {headers:{token}});
    if(res.data.success){
      const {session_url} = res.data;
      window.location.replace(session_url);
    }else{
      toast.error(res.data.message);
    }
  }
  
  useEffect(()=>{
    if(!token){
      navigate('/cart');
    }else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])


  return (
    <form  onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multifields">
          <input required onChange={onchangeHandler} name='firstName' value={data.firstName} type="text" placeholder='First name'/>
          <input required onChange={onchangeHandler} name='lastName' value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required onChange={onchangeHandler} name='email' value={data.email} type="email" placeholder='Email adress' />
        <input required onChange={onchangeHandler} name='street' value={data.street} type="text" placeholder='Street' />
        <div className="multifields">
          <input required onChange={onchangeHandler} name='city' value={data.city} type="text" placeholder='City'/>
          <input required onChange={onchangeHandler} name='state' value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multifields">
          <input required onChange={onchangeHandler} name='zipcode' value={data.zipcode} type="text" placeholder='Zip Code'/>
          <input required onChange={onchangeHandler} name='country' value={data.country} type="text" placeholder='Country' />
        </div>
        <input required onChange={onchangeHandler} name='phone' value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0 ? 0 : getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit' disabled={getTotalCartAmount()===0} >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder