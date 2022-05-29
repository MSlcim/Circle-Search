import { Container, Grid, Stack, Divider, Avatar, Button, Box } from '@mui/material'
import React, {useState, useEffect} from 'react'
import CommunityModal from '../Home/CommunityModal'
import CircleInterestMini from '../Home/CircleInterestMini'
import {useParams} from 'react-router-dom'
import {INTEREST_CODE, REGION_CODE} from '../../../static/type_codes.js'
import axios from 'axios'
import CircleSiteApply from './CircleSiteApply'
import CircleOption from './CircleOption'
import CircleSiteMember from './CircleSiteMember'

function CircleSiteBase() {
    // param에 따라 circleInfo 가져오기
    const IMG_PATH = '../../../../../src/main/resources/static';
    const params = useParams();
    const [circleState, setcircleState] = useState({});
    const [circleInfo, setcircleInfo] = useState({})
    const [circleCollege, setcircleCollege] = useState("");
    const [Gallery, setGallery] = useState([
        {id : 1, name: '게시물1', img: 'img', logo: 'logo'},
        {id : 2, name: '게시물2', img: 'img', logo: 'logo'},
        {id : 3, name: '게시물3', img: 'img', logo: 'logo'},
        {id : 4, name: '게시물4', img: 'img', logo: 'logo'},
    ])

    const [applyModalOpen, setapplyModalOpen] = useState(false);

    
    useEffect(() => {
        setcircleState({Type: params.UniCo, Url: params.circleUrl});
    }, [])
    
    useEffect(() => {
        if (circleState.Type === undefined) return;
        const REQUEST_URL = `/getCircle${circleState.Type}Info`;
        const fetchCircleInfo = async() => {
            axios.get(REQUEST_URL, {params : { url : circleState.Url}})
            .then((res) => setcircleInfo(res.data))
            .catch((err) => console.log(err));
        }
        fetchCircleInfo();
    }, [circleState])
    

    useEffect(() => {
        if(circleInfo.college_code === undefined) return;
        const getCollegeName = async() => {
            if (circleState.Type !== 'co') return;
            axios.get('/collegeName', {params : { college_code : circleInfo.college_code}}).
            then((res) => {
                setcircleCollege(res.data);
            })
        }
        getCollegeName();
    }, [circleInfo])
    
    const onclickApplyHandler = () => {
        setapplyModalOpen(true);
    }
    const handleModalClose = () => {
        setapplyModalOpen(false);
    }

  return (
    <div>
        <Container maxWidth = "xl"
        sx = {
        		{
            height : '100%'
        }}>
            <Box sx={{display:'grid', gridAutoColumns: '1fr', gap: 2}} >
                <Box xs={{gridRow: '1', gridColumn: '1'}}>
                    <Stack spacing={3} sx={{mt: 5}}>
                        {circleInfo.filepath !== undefined ? <Avatar alt="circleMainIMG" src="//source.unsplash.com/300x300/" sx={{
                            width:200, height: 200, m: '0 auto', 
                        }}></Avatar> : <div></div>
                        }
                            
                            <h2>{circleInfo.circle_name}</h2>
                            <Divider></Divider>
                            <ul style={{lineHeight: '140%', fontSize: 18}}>
                            <li>{circleState.Type === "uni" ? `지역 : ${REGION_CODE[circleInfo.region_code]}` : `학교 : ${circleCollege}`}</li>
                                <li>{circleState.Type === 'uni' ? "연합" : "교내"}동아리</li>
                                <li>{INTEREST_CODE[circleInfo.interest_code]}</li>
                                <li>매니저 : {circleInfo.manager}</li>
                            </ul>
                            <h3>동아리 소개글</h3>
                            <Box sx={{width: '100%', backgroundColor:'#F2F2F2', p: 2}}>{circleInfo.purpose}</Box>
                            <CircleOption url={circleState.Url}></CircleOption>
                            <CircleSiteMember url={circleState.Url}/>
                    </Stack>
                </Box>
                <Divider orientation="vertical" flexItem style={{marginLeft: 30}}></Divider>
                <Box sx={{gridRow: '1', gridColumn: '2/5', borderLeft: 'solid 1px grey'}}>
                    <Box
                    component="img"
                    sx={{height : 150, width: '100%'}} src="//source.unsplash.com/700x150/"></Box>
                    <Box sx={{ml: 4}}>
                    <h2>갤러리</h2>
                    <Grid container spacing ={2}>
                    {Gallery.map((galley)=>(
                        <Grid item xs = {6}>
                        <CircleInterestMini id={galley.id} name={galley.name} img={galley.img} logo={galley.logo}/>
                        </Grid>
                    ))
                    }
                </Grid>
                    <h2>최근 게시물</h2>
                    <CommunityModal/>
                    </Box>
                </Box>
            </Box>
        </Container>
        <CircleSiteApply open={applyModalOpen} onClose={handleModalClose} circleInfo={circleInfo}/>
    </div>
  )
}

export default CircleSiteBase