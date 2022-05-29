import React,{useState} from 'react'
import {Box, Typography} from '@mui/material'


function CircleInterestMini(props) {
    const [CircleInfo, setCircleInfo] = useState({
        name : props.name,
        purpose : props.purpose,
        img : props.img
    })
  return (
    <div>
        <Box component="div" sx={{
            display: 'grid', gridTemplateRows: 'repeat(4, 60px)',
            width: '100%',
             border: '1px solid grey',
        }} >
                    <Box sx={{
                        gridColumn: '1', gridRow: '1',
                        p: 2
                    }}>
                        <Typography
                            sx={{
                                fontSize: 18,
                                fontWeight: 'Bold',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical',
                            }}
                            >
                                {CircleInfo.name}
                            </Typography>
                    </Box>
                    <Box component="img" sx={{
                        gridColumn: '1', gridRow:'2/4', p:2
                    }}></Box>
                    <Box sx={{
                        gridColumn: '1', gridRow: '5', p: 2,
                    }}>
                        <Typography
                            sx={{
                                fontSize: 14,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '2',
                                WebkitBoxOrient: 'vertical',
                            }}
                            >
                                {CircleInfo.purpose}
                            </Typography>
                    </Box>
        </Box>
    </div>
  )
}

export default CircleInterestMini