// import React, {useState} from 'react'
// import {useParams} from "react-router-dom";
// import {Box, Divider, Button} from "@mui/material"
// import imgA from '../../../static/img/111.png'

// function CircleUnion() {
//     const param = useParams();
//     const CircleID = param.CircleID;
//     const Page = param.Page;
    
//     // useEffect(() => {
//     //   axios.get(`/Circle/getCirclebyid/?id=${CircleID}`).then(
//     //     //set을 하게함
//     //   )
//     // }, [])

//     const onClickHandler = () => {
//         let link = circleInfo.link;
//         window.location.href = link;       //웹개발할때 숨쉬듯이 작성할 코드
//         window.location.replace(link);     // 이전 페이지로 못돌아감
//         window.open(link);  
//     }
//   return (
//     <div>
//         <Box sx={{
//                     marginTop: 6,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     bgcolor: 'white',
//                     borderRadius: 4,
//                     borderColor: 'grey.500',  
//                     padding: 4
//                     }}>
//             <h1>{circleInfo.name}</h1>
//             <Divider></Divider>
//             <h2>{circleInfo.description}</h2>         
//             <img src={imgA}></img>
//             <div>{circleInfo.contents}</div>
//             <br></br>
//             <Button onClick={onClickHandler}>공식 링크로 바로가기</Button>
//         </Box>
        
//     </div>
//   )
// }

// export default CircleUnion