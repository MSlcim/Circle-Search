import React, {useState, useEffect} from 'react'
import { Grid, Button, Box } from '@mui/material'
import CircleInterestMini from './CircleInterestMini';
import {Link} from 'react-router-dom';
import axios from 'axios';

function CircleInterest() {
    const userID = sessionStorage.getItem('userID');
    const isLogined = sessionStorage.getItem('islogined');
    const [userInterests, setuserInterests] = useState([]);
    const [circleList, setcircleList] = useState([]);

//  userID 기반 intereset 조회
    useEffect(() => {
        
      const getInterestCircle = async() => {
          try {
              axios.get('/user/getInterest/category', {params : {user_id: userID}}).then((res) => setuserInterests(res.data));
          } catch (error) {
              console.error(error.message);
          }
      }
      if (isLogined != undefined) {
        getInterestCircle();
      }
    }, [])

    useEffect(() => {
        getCircleListbyInterest(userInterests);
    },[userInterests])


    const getCircleListbyInterest = (list) => {
        if (list.length > 0) {
            list.forEach((item) => 
            axios.get('/circle/uni', {params : {interest: item, region: ""}})
            .then((res) => setcircleList((prev) => [...prev, res.data])));
        }
    }
    
   if(isLogined === 'true') {
  return (
    <div>
        <h2>🌏 관심사 연합 동아리 소식</h2>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <h2>{userInterests[0]}</h2>
                <Grid container spacing ={2}>
                    {circleList.length > 0 ? circleList[0].map((circle)=>(
                        <Grid item xs = {6}>
                        <Link to={`/circle/uni/${circle.url}`}>
                            <CircleInterestMini name={circle.circle_name} purpose={circle.purpose}/>
                        </Link>
                        </Grid>
                    ))
                    : <div></div>}
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <h2>{userInterests[1]}</h2>
                <Grid container spacing ={2}>
                {circleList.length > 1 ? circleList[1].map((circle)=>(
                            <Grid item xs = {6}>
                            <CircleInterestMini name={circle.circle_name} purpose={circle.purpose}/>
                            </Grid>
                        ))
                        : <div></div>}
                </Grid>
            </Grid>
            <Grid item xs={6}>
                        <Button color="success">{userInterests[0]} 동아리 더 보기</Button>
                        <br></br>
            </Grid>
            <Grid item xs={6}>
                        <Button color="success">{userInterests[1]} 동아리 더 보기</Button>
                        <br></br>
            </Grid>
        </Grid>
    </div>
  )
} else {
    return (
    <div>
        <h2>🌏 관심사 연합 동아리 소식</h2>
            <Box sx={{width: '100%', height: 200, bgcolor: '#F2F2F2', textAlign: 'center', lineHeight: 13}}>로그인 이후 이용 가능합니다.
            </Box>
    </div>
    )}
}

export default CircleInterest