import React,{useState, useEffect} from 'react';
import {Box, Divider, Stack, Grid, Typography, Avatar} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';

function CircleUnionPage() {
    const [circleList, setcircleList] = useState([]);
    const [interests, setinterests] = useState([]);
    const [regions, setregions] = useState([]);
    const [Checked, setChecked] = useState({
        interest : "",
        region : ""
    });
    
    const onRegionHandler = (event) => {
        if (event.target.value === Checked.region) {
            setChecked({...Checked, region : ""});
          }
          else {
            setChecked({...Checked, region : event.target.value});
          }
    }
    
    const onInterestHandler = (event) => {
        if (event.target.value === Checked.interest) {
            setChecked({...Checked, interest : ""});
          }
          else {
            setChecked({...Checked, interest : event.target.value});
          }
    }

    function fetchCircles() {
        axios.get('circle/uni', {params : {interest: Checked.interest, region: Checked.region}})
        .then((response) => setcircleList(response.data))
        .catch((err) => {console.log(err)});
    }

    useEffect(() => {
      axios.get('/user/register2/interest').then((response) => {
        response.data.forEach((element) => setinterests((prevList) => [...prevList, element.interest]))
      });
      axios.get('user/register3/getRegionList').then((response) => {
          setregions(response.data);
      });
      fetchCircles();
    }, [])

    useEffect(() => {
        fetchCircles();
    }, [Checked])
    
  return (
    <div>
        <h2>연합동아리 둘러보기</h2>
        <Box sx={{
            border: '1px solid grey',
            borderRadius: 2,
            p: 2,
            m: 3
        }}>
            <FormControl sx={{pl: 3, pr: 3}}>
            <h3>관심 분야</h3>
            <Divider></Divider>
            <RadioGroup 
            row value={Checked.interest}
            sx={{p : 4}}>
                {interests.map((interest) => (
                    <FormControlLabel control={<Radio onClick={onInterestHandler} value={interest}/>} label={interest} color='success' sx={{mr: 3}}/>
                ))}
            </RadioGroup>
            <h3>활동 지역</h3>
            <Divider></Divider>
            <RadioGroup row value={Checked.region}
            sx={{p : 4}}>
                {regions.map((region) => (
                    <FormControlLabel control={<Radio onClick={onRegionHandler} value={region}/>} label={region} color='success' sx={{mr: 3}}/>
                ))}
            </RadioGroup>
            </FormControl>
        </Box>
        <Box sx={{
            pb: 3,
            m: 2
            }}>
                <h2>동아리 목록</h2>
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
                                        <a href={"../circle/uni/" + circle.url}>
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
}

export default CircleUnionPage