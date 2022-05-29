import { Dialog, DialogTitle, DialogContent, Box, TextField, FormControl, FormLabel, DialogActions, Button } from '@mui/material';
import axios from 'axios';
import React,{useState, useEffect} from 'react'

function CircleSiteApply(props) {
  const {onClose, open, circleInfo} = props;
    const userID = sessionStorage.getItem("userID");
    const [goal, setgoal] = useState("");
    
    const handleClose = () => {
      onClose();
    }
    
    const onGoalHandler = (e) => {
      setgoal(e.target.value);
    }

    const handleSubmit = async() => {
      if (circleInfo.circle_name == undefined) return
      axios.post(`/Circle/join?circle_name=${circleInfo.circle_name}&user_id=${userID}&goal=${goal}`).then((res) => {
        if (res.data > 0) {
          alert('성공적으로 신청되었습니다.');
        } else {
          alert('err');
        }
      });
      onClose();
    }

    useEffect(() => {
      console.log(goal);
    }, [goal])
    
  return (
    <Dialog fullWidth onClose={onClose} open={open} disableEnforceFocus>
      <DialogTitle sx={{borderBottom: 'solid grey 2px', lineHeight: '120%', p:5}}>{circleInfo.circle_name} 지원하기
        <DialogContent>
        <Box sx={{
                display: 'flex',
                minWidth: 'lg',
                flexDirection: 'column',
                p: 2, pt: 1
                }}>
                  <FormControl>
                    <FormLabel><h4>동아리 가입 동기</h4></FormLabel>
                    <TextField required fullWidth multiline rows={5} color="success" onChange={onGoalHandler}></TextField>
                    </FormControl>
              </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </DialogTitle>
    </Dialog>
  )
}

export default CircleSiteApply