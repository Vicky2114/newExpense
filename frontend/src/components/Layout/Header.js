import React, { useEffect, useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import { Image, message } from 'antd';
import logo from '../../assets/budget-planning.png';
import profile from '../../assets/user (1).png';
const Header = () => {
    const [loginUser,setLoginUser] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        const user =JSON.parse(localStorage.getItem('user'));
        if(user){
            setLoginUser(user);
        }
    },[])
    const logoutHandler = ()=>{localStorage.removeItem('user')
    message.success('Logout Successfully');
       navigate('/login');}
  return (
    <div>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
    <Link to="/">
    <Image
      width={50}
      src={logo}
    />
            </Link>
      <Link className="navbar-brand  " to="/">Expense Tracker App</Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className='nav-item'>
        <Link to="/profile" className='mt-4 my-2'>
    <Image
      width={30}
      src={profile}
    />
            </Link>
        </li>
        <li className="nav-item">
        <p className='nav-link active'>{loginUser && loginUser.name}</p>
        </li>
        
        <li className="nav-item">
         <button className='btn btn-secondary logout-btn' onClick={logoutHandler}>Logout</button> 
        </li>
      </ul>
    </div>
  </div>
</nav>
<div className='d-flex justify-content-center'>
  
<h1 className='nav-link active'>Welcome to our App <span className='username'>{loginUser && loginUser.name}</span> !!</h1>
</div>
    </div>
  )
}


export default Header
