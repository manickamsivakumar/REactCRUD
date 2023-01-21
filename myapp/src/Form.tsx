import React,{useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './App.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useLocation,useNavigate} from 'react-router-dom';
const Form = () => {
    const navigate=useNavigate();
     const id=useLocation()?.state.id ? useLocation().state.id : 0;
     const idref=React.useRef<HTMLInputElement>(id);
    const nameref=React.useRef<HTMLInputElement>();
    const phoneref=React.useRef<HTMLInputElement>();
    const emailref=React.useRef<HTMLInputElement>();
    const genderref=React.useRef<HTMLInputElement>();
    const dobref=React.useRef<HTMLInputElement>();
    useEffect(()=>{
        if(id){
            axios.post("http://localhost:5000/getsinglestudent",{id:id}).then((response)=>{
                 var {id,name,phoneno,email,gender,date}=response.data[0];
                 idref.current.value=id;
                 if(nameref.current){
                    nameref.current.value=name;
                 }
                 if(phoneref.current){
                    phoneref.current.value=phoneno;
                 }
                 if(emailref.current){
                    emailref.current.value=email;              
                  }
                 if(genderref.current){
                    genderref.current.value=gender;
                 }
                 if(dobref.current){
                    dobref.current.value=date;
                 }
            })
        }
    },[])
    function validateForm():boolean{
        let testfields:Record<string,any>={'Name':nameref,'phone':phoneref,'Email':emailref,'Gender':genderref,'DOB':dobref};
        var iok=true;
        Object.keys(testfields).map(fields=>{
            if(testfields[fields]?.current?.value =='' && iok==true){
                 alert(fields+' field should not be empty!!');
                 iok=false;
                 setTimeout(()=>{
                    if(testfields[fields].current){
                        testfields[fields].current.focus();
                        return iok;
                    }
                    
                 },1000)      
            }

        })
        return iok;
    }
    const submitdata=()=>{
        var isOK=validateForm();
        if(nameref.current && isOK){
            let id=idref.current.value;
           let name=nameref.current.value;
           let phone=phoneref.current ? phoneref.current.value : '';    
           let email=emailref.current ? emailref.current.value : '';
           let gender=genderref.current ? genderref.current.value:'';
           let dob=dobref.current ? dobref.current.value:'';
           axios.post("http://localhost:5000/submit",{id,name,phone,email,gender,dob}).then((response)=>{
                      var {data}=response;
                      if(data.err_code==0){
                        console.log('addssddss');
                        navigate("/");
                      }
           })
       }
        
    }
    return (
        <>
        
        <Box className='form-section1' style={{display:'flex',height:'100vh',justifyContent:'center',alignItems:'center'}}>
        <div className="form-section" style={{display:'flex',flexDirection:'column'}}>
        <h1>Student Login</h1>
        <input type="hidden" ref={idref} />
        <TextField  className='textbox'   type="text" inputRef={nameref} label="Name" color="primary"  />
        <TextField className='textbox'  type="text" inputRef={phoneref} label="Phone No" color="primary"  />
        <TextField className='textbox'  type="email" inputRef={emailref} label="Email" color="primary"  />
        <TextField className='textbox'  type="text" inputRef={genderref} label="Gender" color="primary"  />
        <TextField className='textbox'  type="date" inputRef={dobref} label="DOb" color="primary"  />
        <Button variant="contained" onClick={submitdata}>Submit</Button>
        </div></Box>
</>
    )
}
export default Form