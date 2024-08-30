import { useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../ context/StoreContext';
import axios from 'axios'
import {toast} from 'react-toastify'
function LoginPop({setShowLogin}) {
    const [currentState,setCurrentState]=useState("Login");
    const {url, token,setToken} = useContext(StoreContext);
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    });

    const onChangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData({...data,[name]:value})
    }
    const onLogin=async(e)=>{
        e.preventDefault();
        let newUrl = url;
        if(currentState==='Login'){
            newUrl+='/api/user/login';
        }else{
            newUrl+='/api/user/register';
        }
        const response = await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false);
        }else{
            console.log(response)
            toast.error(response.data.message)
        }
    }

  return (
    <div className='login-pop-up'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currentState==="Login" ? <></>:<input  value={data.name} onChange={onChangeHandler} type="text" name='name' placeholder='Your name' required />}
                <input value={data.email} onChange={onChangeHandler} name='email' type="text" placeholder='Your email' required />
                <input  value={data.password} onChange={onChangeHandler} name='password' type="password" placeholder='Password' required />
            </div>
            <button type='submit'>{currentState==="Sign Up" ? "Create Account" :"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuining I agree the terms & privacy policy.</p>
            </div> 
            {currentState==='Login' ? 
            <p>Create a new account? <span onClick={()=>setCurrentState('Sign Up')}>Click here</span></p>:
            <p>Already have an account? <span onClick={()=>setCurrentState('Login')}>Login here</span></p>
}                 
        </form>
    </div>
  )
}

export default LoginPop