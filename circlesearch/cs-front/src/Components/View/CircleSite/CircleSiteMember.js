import React, {useState, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CircleSiteMember() {
    const params = useParams()
    const url = params.circleUrl;
    const [rows, setrows] = useState([]);
    const [columns, setcolumns] = useState([ 
        {field : 'user_id', headerName: "ID", width: 90}, 
        {field : 'grade', headerName: "등급", width: 30}
    ]);

    useEffect(() => {
      axios.get('/check/member', { params : {
          circle_url : url
      }}).then((res) => {setrows(res.data)})
    }, [])
    
  return (
    <div style={{ height: 520, width: '100%' }}>
        <h3>가입 회원 {rows.length} 명</h3>
      <DataGrid
        rows = {rows}
        columns = {columns}
        rowHeight={38}
        disableSelectionOnClick
      />
    </div>
  )
}

export default CircleSiteMember