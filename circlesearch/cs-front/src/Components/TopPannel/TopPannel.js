import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import {Button} from '@mui/material'
import {Link} from 'react-router-dom'

function TopPannel() {
    const [Logined, setLogined] = useState(sessionStorage.getItem("islogined"));
    const [userID, setuserID] = useState(sessionStorage.getItem("userID"));

    useEffect(() => {
      setLogined(sessionStorage.getItem("islogined"));
      setuserID(sessionStorage.getItem("userID"));
    }, [sessionStorage.getItem("islogined")])
    
    if (!Logined) {
        return (
            <div>
                <UserGreeting/>
            </div>
        )} 
    else {
        return (
            <div>
                <UserLogined userID={userID}/>
            </div>
        )
    }
}   

export default TopPannel


function UserGreeting() {
    return (
    <div style={{ width: '100%', justifyContent: 'center', alignContent: 'center' }}>
        <center>
        <h3>내가 찾는 모든 동아리 소식</h3>
        <h1>CircleSearch</h1>
        </center>
        <div align='right' style={{paddingRight: 4}}>
                <Button><Link to='/login'>로그인</Link></Button>
                <Button><Link to='/register1'>회원가입</Link></Button>
                </div>
        <Navbar />
    </div>)
}

function UserLogined(props) {
    const [userID, setUserID] = useState(props.userID);

    const logoutHandler = () => {
        sessionStorage.clear();
        window.location.reload();
    }

    return (
    <div style={{ width: '100%', justifyContent: 'center', alignContent: 'center' }}>
        <center>
        <h1>CircleSearch</h1>
        <h3>내가 찾는 모든 동아리 소식</h3>
        </center>
        <div align='right' style={{paddingRight: 4}}>
                <Button><Link to="/myPage">마이페이지</Link></Button>
                <Button onClick={logoutHandler}><Link to="/">로그아웃</Link></Button>
                </div>
        <Navbar />
    </div>)
}