import React, {useState, useEffect} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom';
import axios from 'axios';

function SingleListAvatar(props) {
  const [userID, setuserID] = useState();
  const [list, setlist] = useState([]);

  useEffect(() => {
    setuserID(props.userid)
  }, [props])

  useEffect(() => {
    axios.get('/user/mycircle', {params : {user_id : userID}}).then((res) => setlist(res.data))
  }, [userID])
  
  useEffect(() => {
    console.log(list);
  }, [list])
    //FolderICON 말고 각각의 동아리들의 icon이 필요

    //동아리들의 새소식이 있을 경우 notificationActiveicon 활성화

    if (list.length === 0) {
      return (
          <Grid item xs={12} sx={{mt:2}}>
          가입된 동아리가 <br/>
          없습니다!
          </Grid>
      )
    }
  else {
    return (
              <Grid item xs={12} sx={{mt: 2}}>
                  <List>
                    {list.map((item) => (
                      <ListItem >
                        <ListItemText
                        /><Link to={`/Circle/${item.url}`}>{item.circle_name}</Link>
                      </ListItem>
                    ))}
                  </List>
              </Grid>    
        )
      }
}

export default SingleListAvatar