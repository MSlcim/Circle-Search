import './App.css';
import React from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import { Container } from '@mui/material';

import HomePage from './Components/View/Home/HomePage';
import LoginPage from './Components/View/Login/LoginPage';
import TopPannel from './Components/TopPannel/TopPannel';
import RegisterPage1 from './Components/View/Register/RegisterPage1';
import RegisterPage2 from './Components/View/Register/RegisterPage2';
import RegisterPage3 from './Components/View/Register/RegisterPage3';
import RegisterComplete from './Components/View/Register/RegisterComplete';
import CircleUnionPage from './Components/View/CircleUnion/CircleUnionPage';
import CircleUnion from './Components/View/CircleUnion/CircleUnion';
import CommunityPage from './Components/View/Community/CommunityPage';
import CommunityWritePage from './Components/View/Community/CommunityWritePage';
import CreateCirclePage from './Components/View/CreateCircle/CreateCirclePage';
import Footer from './Components/Footer/Footer';
import CircleSiteBase from './Components/View/CircleSite/CircleSiteBase';
import CircleInSchoolPage from './Components/View/CircleInSchool/CircleInSchoolPage';
import CircleSiteManage from './Components/View/CircleSite/CircleSiteManage';
import Auth from './Components/View/Login/SocialLogin/Auth'

function App() {
  return (
    <div className="App">
    <TopPannel/>
    <div className='wrapper'>
    <div className='content_wrapper'>
    <Container maxWidth= "sm" className='left_sidebar'>
      <LoginPage/>
    </Container>
    <Container maxWidth="xl" fixed className='main_container'>
    <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/oauth/kakao/:use" element={<Auth />}/>
        <Route path="/register1" element={<RegisterPage1/>}/>
        <Route path="/register2/:userID" element={<RegisterPage2/>}/>
        <Route path="/register3/:userID" element={<RegisterPage3/>}/>
        <Route path="/register/complete" element={<RegisterComplete/>}/>

        <Route path="/union" element={<CircleUnionPage/>}/>
        <Route path="/inschool" element={<CircleInSchoolPage />}/>
        
        <Route path="/union/:CircleID/:Page" element={<CircleUnion/>}/>
        <Route path="/community" element={<CommunityPage/>}/>
        <Route path="/community/write" element={<CommunityWritePage/>}/>
        <Route path="/create/circle/new" element={<CreateCirclePage/>}/>
        <Route path="/circle/:UniCo/:circleUrl" element={<CircleSiteBase/>}/>
        <Route path="/circle/manage/:circleID/:userID" element={<CircleSiteManage/>}/>
    </Routes>
    </Container>
    <Container maxWidth= "sm" className='right_sidebar'>
    </Container>
    </div>
    <Footer/>
    </div>
    </div>
  );
}

export default App;

