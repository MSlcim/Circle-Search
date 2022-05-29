import React, {useState, useEffect} from 'react'
import {Dialog, DialogTitle, Button, DialogContent, Box} from '@mui/material'
import {Link} from 'react-router-dom'


export default function CreateCircleFinModal(props) {
  const {onClose, open, circleInfo} = props;
  const circleManager = sessionStorage.getItem("userID");
  const [urlDiv, seturlDiv] = useState();

  const handleClose = () => {
    onClose();
  }

  useEffect(() => {
    if (circleInfo.CircleType === "연합") {
      seturlDiv("uni");
    } else {
      seturlDiv("co");
    }
  }, [])

  const newTo = { 
    pathname: `/circle/${urlDiv}/${circleInfo.CircleAddress}`,
  };
  
  return (
      <Dialog 
      fullWidth={true} 
      maxWidth='sm'
      onClose={handleClose} 
      open={open}>
      <DialogTitle sx={{borderBottom: 'solid grey 2px', lineHeight: '120%'}}>축하드려요! <br></br>{circleInfo.CircleName} 이(가) 성공적으로 생성 되었습니다!</DialogTitle>
      <DialogContent>
          <Box sx={{
                display: 'flex',
                maxWidth: 'sm',
                flexDirection: 'column',
                p: 2, pt: 1
                }}>
          <p style={{lineHeight: '140%', fontSize: 18}}>
          이름 : {circleInfo.CircleName}<br></br>
          매니저 ID : {circleManager}<br></br>
          구분 : {circleInfo.CircleType}<br></br>
          {circleInfo.CircleType == "연합" ? `지역 : ${circleInfo.CircleRegion.toString()}` : `학교 : ${circleInfo.CircleSchool}`}
          <br></br>
          분야 : {circleInfo.CircleInterest.toString()} <br></br>
          링크 : http://www.circlesearch.com/circle/{urlDiv}/{circleInfo.CircleAddress}<br></br>
          설명 : {circleInfo.CirclePurpose}<br></br>
          </p>
          </Box>
          <Button variant="contained" color='success'><Link to={newTo}>내 동아리로 이동</Link></Button>
      </DialogContent>
    </Dialog>
  )
}
