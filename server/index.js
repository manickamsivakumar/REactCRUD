const express = require('express');
const app = express();
const path = require('path');
const data = require('./data.js');
const cors = require('cors');
const mysql=require('mysql');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'students'
})
db.connect((err)=>{
    if(err){
        res.send('databse connection failed');
    }
})
// app.use(function (req, res, next) {


//     res.setHeader('Access-Control-Allow-Origin', '*');


//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
app.use(cors());
app.options("*", cors({ origin: 'http://localhost:5000', optionsSuccessStatus: 200 }));
app.get('/get', (req, res) => {
   // console.log(data);
    var sql="select *,DATE_FORMAT(dob,'%d-%m-%Y') as date  from tbl_students";
    db.query(sql,(err,results)=>{
        if(!err){
            res.json(results);
        }
    })
})
app.post("/submit",(req,res)=>{
    let {id,name,phone,email,gender,dob}=req.body;
    //console.log(typeof id)
    if(Number(id)>0){
       // console.log('first')
       var sql=`update tbl_students set name='${name}',email='${email}',phoneno='${phone}',gender='${gender}',dob='${dob}' where id=${id}`;
    }else{
        //console.log('second')
        var sql=`insert into tbl_students (name,phoneno,email,gender,dob) values('${name}','${phone}','${email}','${gender}','${dob}')`;
    }
    db.query(sql,(err)=>{
        if(!err){
            res.json({'err_code':0,'err_msg':''});
        }else{
            res.json({'err_code':1,'err_msg':'Someething Went Wrong!!'})
        }
    })
})
app.post("/getsinglestudent",(req,res)=>{
    let {id}=req.body;
    var sql="select *,DATE_FORMAT(dob,'%Y-%m-%d') as date from tbl_students where id="+id;
    db.query(sql,(err,results)=>{
        if(!err){
            res.json(results);
        }
    })
})
app.post("/studentdelete", (req, res) => {
    var {id}=req.body;
    var sql=`delete from tbl_students where id=${id}`;
    db.query(sql,err=>{
        if(!err){
            res.json({'err_code':0,err_msg:''});
        }
    })
})
app.listen(5000)
