import React, { useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Table from './Table';
import Form from './Form';
import Higher from './Higher';
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
  states:List[];
}
let callurl:string="http://localhost:5000/get";
function App({states}: prop) {
   const [showform,setShowform]=useState(0);
  
  // const [list, setList] = useState<List>([]);
  // useEffect(() => {
  //    axios.get("http://localhost:5000/get").then((response)=>{
  //      setList(response.data);
  //    })
  // },[showform])
  
  return (
    <>
       <Table list={states} />
      
    </>
  )
}




export default Higher(App,callurl);
