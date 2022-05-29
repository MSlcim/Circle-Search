import React,{useEffect} from 'react'
import LoginPage from '../Login/LoginPage'
import { Box } from '@mui/system';
import { Container } from '@mui/material'

function RegisterComplete() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  return (
    <div>
        <Container component="main" maxWidth="sm">
        <Box sx={{maxWidth: 'sm', marginTop: 5}}>
        <h1>축하합니다!</h1>
        <h2>서클서치에 회원이 되신 걸 환영합니다. <div></div>당신에게 딱 어울리는 동아리를 찾아보세요!</h2>
        <hr></hr>
        </Box>
        <LoginPage />
        </Container>
    </div>
  )
}

export default RegisterComplete