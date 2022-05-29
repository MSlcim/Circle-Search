import axios from 'axios';
import React,{useEffect, useState} from 'react'
import {Box, Stack, Typography, Divider, Grid} from '@mui/material'

function CircleInSchoolPage(props) {
  const userID = sessionStorage.getItem("userID");
  const isLogined = sessionStorage.getItem("islogined");
  const [userCollege, setuserCollege] = useState("");
  const [circleList, setcircleList] = useState([])
  //userSchool 받아오기
  useEffect(() => {
    const getUserCollege = async () => {
      try {
        axios.get('/user/getCollege', {params : {user_id : userID}}).then((res) => {setuserCollege(res.data)});
      } catch (err) {
        console.log(err);
      }
    }
    if (isLogined != undefined){
      getUserCollege();
    }
  }, [])
  
  useEffect(() => {
    getCircleListbyCollege(userCollege);
  }, [userCollege])
  

  const getCircleListbyCollege = (college) => {
    if (college !== "") {
      axios.get('/circle/co', {params : {college : userCollege}}).then((res) => {setcircleList(res.data)})
    }
  }
  //userSchool 받아오면 화면 표시 할 것.
if(isLogined === 'true') {
  return (
    <div>
      <h2>🏫 내 학교 동아리 소식</h2>
      <h3 style={{color: 'gray'}}>회원님의 학교: {userCollege}</h3>
      <Box sx={{
            pb: 3,
            m: 2
            }}>
      <Divider></Divider>
                <Stack spacing={1}>
                {circleList.map((circle, index) => (
                    <Box>
                        <Box sx={{m:3}}>
                            <Grid container>
                                <Grid item xs={1}>
                                    <Box sx={{color: 'success.main', margin: '0 auto', fontSize: 22, fontWeight: 'Bold', textAlign: 'center', lineHeight: '2'}}>{index+1}</Box></Grid>
                                <Grid item xs={10}>
                                    <Typography sx={{
                                        fontSize: 18,
                                        fontWeight: 'Bold',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: '2',
                                        WebkitBoxOrient: 'vertical',
                                    }}>
                                        <a href={"../circle/co/" + circle.url}>
                                        {circle.circle_name}
                                        </a>
                                    </Typography>
                                    <Typography
                                    sx={{
                                        fontSize: 14,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: '2',
                                        WebkitBoxOrient: 'vertical',
                                    }}>
                                        {circle.purpose}
                                    </Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Box sx={{width: 60, height:60, bgcolor: 'success.light'}}></Box>
                                    </Grid>
                            </Grid>
                        </Box>
                        <Divider></Divider>
                    </Box>
                    ))}
          </Stack>
          </Box>
    </div>
  )
} else {
  return (<div>
            <h2>🏫 내 학교 동아리 소식</h2>
            <Box sx={{width: '100%', height: 200, bgcolor: '#F2F2F2', textAlign: 'center', lineHeight: 13}}>로그인 이후 이용 가능합니다.
            </Box>
            </div>)
}
  
}

export default CircleInSchoolPage