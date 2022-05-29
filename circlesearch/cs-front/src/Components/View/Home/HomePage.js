import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Divider, Grid, Box} from '@mui/material'
import CircleInSchoolPage from '../CircleInSchool/CircleInSchoolPage';
import MainBanner from '../Banner/MainBanner';
import CircleInterest from '../Home/CircleInterest';
import CommunityModal from './CommunityModal';


function HomePage() {
  const [userID, setuserID] = useState();
  const [isLogined, setisLogined] = useState();

  
    useEffect(()=>{
      if (sessionStorage.getItem('islogined') === 'true') {
        setuserID(sessionStorage.getItem('userID'));
        setisLogined(true);
      } else {
        setisLogined(false);
        setuserID("");
      }
    });


      return(
      <div>
        <Grid container rowspacing={3}>
          <Grid item xs={12} sx= {{mb: 5}}>
            <MainBanner/>
          </Grid>
          <Grid item xs={12} sx= {{mb: 3}}>
            <Divider></Divider>
          </Grid>
          <Grid item xs={12} sx= {{mb: 3}}>
            <CircleInterest/>
          </Grid>
          <Grid item xs={12} sx= {{mb: 3}}>
            <Divider></Divider>
          </Grid>
          <Grid item xs={12} sx= {{mb: 3}}>
          <CircleInSchoolPage /> 
          </Grid>
          <Grid item xs={12} sx= {{mb: 3}}>
            <Divider></Divider>
          </Grid>
          <Grid item xs={12} sx= {{mb: 3}}>
            <h2>🗣  실시간 커뮤니티</h2>
            <CommunityModal />
            <Divider></Divider>
          </Grid>
        </Grid>
     </div>)
}

export default HomePage;
