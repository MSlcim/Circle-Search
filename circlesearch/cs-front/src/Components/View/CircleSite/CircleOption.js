import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Button, Typography } from '@mui/material'
import { useParams } from 'react-router-dom';
import styled from "styled-components";


const GRADE = {
  0 : "미회원",
  1 : "일반회원",
  2 : "임원진",
  3 : "매니저",
};

function CircleOption() {

  const params = useParams();
  const url = params.circleUrl;
  const userID = sessionStorage.getItem('userID');
  const [userGrade, setuserGrade] = useState(-1);

    useEffect(() => {
      const fetchuserGrade = async() => {
          axios.get('/check/grade', {params : 
            {user_id : userID
            , circle_url: url}})
            .then((res) => setuserGrade(res.data));
      }    
    fetchuserGrade()
    }, [])

    useEffect(() => {
      console.log(userGrade);
    }, [userGrade])
    
    const onclickApplyHandler = () => {

    }

    const onclickManageHandler = () => {

    }

    const onclickWriteHandler= () => {

    }

    const onclickMyPostHandler= () => {

    }
    
    
    //매니저
    if (userGrade === 3) {
      return (
        <div>
          내 등급
          <StyledP>{GRADE[userGrade]}</StyledP>
            <Button fullWidth variant='contained' color='success.light' onClick={onclickManageHandler} sx={{mt: 2}}>동아리 관리</Button>
            <Button fullWidth variant='contained' color='success.dark' onClick={onclickWriteHandler} sx={{mt: 2}}>게사글 작성</Button>
            <Button fullWidth variant='outlined' color='success' onClick={onclickMyPostHandler} sx={{mt: 2}}>내 글 보기</Button>
        </div>
        )
      }
      //일반 회원
      if (userGrade === 1 || userGrade === 2) {
        return (
          <div>
            내 등급
            <StyledP>{GRADE[userGrade]}</StyledP>
            <Button fullWidth variant='contained' color='success.dark' onClick={onclickWriteHandler} sx={{mt: 2}}>게사글 작성</Button>
            <Button fullWidth variant='outlined' color='success' onClick={onclickMyPostHandler} sx={{mt: 2}}>내 글 보기</Button>
          </div>
        )
      }

    //동아리 가입 x
    return (
      <div>
        내 등급 : 
        <StyledP>{GRADE[userGrade]}</StyledP>
          <Button fullWidth variant='contained' color='success' onClick={onclickApplyHandler} sx={{mt: 2}}>가입 신청</Button>
          <Button fullWidth variant='outlined' color='success' sx={{mt: 2}}>관심 등록</Button>
      </div>
    )
}

const StyledP = styled.p`
  text-align: center;
  padding: 0.375rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  color: gray;
  backgroud: white;
`;

export default CircleOption