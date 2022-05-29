import { TextField, Box, Button, Container, Grid, Link, Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import SingleListAvatar from '../../Avatar/SingleListAvatar';
import KakaoLogin from './SocialLogin/KakaoLogin';

function LoginPage() {
    let navigate = useNavigate();
    const [userID, setuserID] = useState(sessionStorage.getItem("userID"));
    const [userPW, setuserPW] = useState("");
    const [isLogined, setisLogined] = useState(
        sessionStorage.getItem('islogined') == 'true');
    const [userNickname, setuserNickname] = useState("");
    
    //userID로 현재 가입된 동아리 list 보기 [동아리 명, 동아리 로고] (api)
    const [showcirclelist, setshowcirclelist] = useState(false)

    const onIDHandler = (event) => {
        setuserID(event.currentTarget.value)
    }
    const onPWHandler = (event) => {
        setuserPW(event.currentTarget.value)
    }
    //로그인 시
    const onSubmitHandler = (event) => {
        event.preventDefault();
        //login process
        let body = {
            user_id : userID,
            user_password : userPW,
        }
        axios.post("/user/login", body).then((res) => {
            if (res.data === 1){
                console.log('success')
                sessionStorage.setItem('islogined', 'true');
                sessionStorage.setItem('userID', userID);
                setisLogined(true);
            } else {
                alert('로그인 실패!');
            }
        })
        .catch((err) => console.log(err)).then(() => {
            window.location.href="/";
        })
    }

    //로그인 이후
    const getUserNickname = () => {
        let userid = sessionStorage.getItem('userID');
        axios.get('/user/getNickname', {params: {user_id : userid}}).then((res) => {
            setuserNickname(res.data);
        })
    }

    const openMyCircleList = () => {
        setshowcirclelist(true);
    }

    const openCreateCircle = () => {
        navigate("/create/circle/new", {replace: true})
    }
        
    useEffect(() => {
      if (sessionStorage.getItem('userID') !== null) {
          getUserNickname();
      }
    }, [])

    if (!isLogined) {
    return (
        <div>
            <Container component="main" maxWidth="sm">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: 'white',
                        borderRadius: 4,
                        borderColor: 'grey.500',  
                        padding: 2
                    }}>
                    <Box component="form" onSubmit={onSubmitHandler} sx={
                        { mt: 1 }
                    }>
                        <h2>로그인</h2>
                        <TextField required margin="normal" id="outlined-required" fullWidth label="아이디" color="success" value={userID} onChange={onIDHandler} />
                        <TextField required margin="normal" id="outlined-password-input" fullWidth label="비밀번호" type="password" color="success" value={userPW} onChange={onPWHandler} />
                        <br />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color='success'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            로그인 하기
                        </Button>
                        <KakaoLogin />
                        <Grid container>
                            <Grid item>
                                <Link href="/regisrer1" variant="body2">
                                    회원가입 하기
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
    } return (
    <div>
    <Container component="main" maxWidth="sm">
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'white',
                border: 1,
                borderColor: 'grey.500',
                borderRadius: 4,
                padding: 3
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={10} sx={{mr : 3}}>
                    <div style={{fontSize : 20}}>
                    <b>{userNickname} 님</b><br></br>환영합니다.
                    </div>
                    </Grid>
                    <Grid item xs = {12}>
                    <Divider></Divider>
                    </Grid>
                    <Grid item xs={12}>
                    <Button onClick={openMyCircleList} fullWidth variant='contained' color='success'>내 동아리</Button>
                    </Grid>
                    { showcirclelist ? <SingleListAvatar userid={userID}/> : null}
                    <Grid item xs={12}>
                    <Button onClick={openCreateCircle} fullWidth variant='contained' color='success'>동아리 새로 만들기</Button>
                    </Grid>
                    </Grid>
            </Box>
    </Container>
    </div>)
}

export default LoginPage;
