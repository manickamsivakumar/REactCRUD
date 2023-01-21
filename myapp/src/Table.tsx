import  React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import './App.css';
import { BsFillTrashFill,BsPencilSquare} from 'react-icons/bs';
import axios from 'axios';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
type List = {
  id:number
  name: string,
  gender: string,
  phoneno: string,
  email: string,
  dob:string,
  date:string
};
type prop={
  list:List[];
}
export default function CustomizedTables({list}:prop) {
  console.log(list);

  const editstudent=(id:number):void=>{
     console.log(id,'id');
  }
  const studentdelete=(id:number):void=>{
    if(id){
      if(confirm("Are you Sure..To delet this record")){
        axios.post("http://localhost:5000/studentdelete",{id:id}).then(response=>{
          var {data}=response;
          if(data.err_code==0){
            alert('deleted successful!!');
            setTimeout(()=>{
             location.reload();
            },1000)
          }
        })
      }
    }
  }
  return (
     <>
     <div className="top-section">
     <Link to="/form" state={{id:0}}><Button className="new-button" variant="contained">Add Student</Button></Link>
     </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Phone No</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Gender</StyledTableCell>
            <StyledTableCell align="center">DOB</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            list && list.map((row,key)=>(
                <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.phoneno}</StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.gender}</StyledTableCell>
              <StyledTableCell align="center">{row.date}</StyledTableCell>
              <StyledTableCell align="center"><Link to="/form" state={{id:row.id}} ><BsPencilSquare className="icons" /></Link></StyledTableCell>
              <StyledTableCell align="center"><BsFillTrashFill className="icons" onClick={()=>studentdelete(row.id)} /></StyledTableCell>
            </StyledTableRow>
              )
            )
          }
         
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}