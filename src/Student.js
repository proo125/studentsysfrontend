import * as React from 'react';
import { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, } from '@mui/system';
import { Card, Button } from '@mui/material';

export default function Student() {

    const boxStyle = {padding: "25px 25px", width: 600, margin: "25px auto"}
    const styleObj = {margin: "50px", padding: "30px"}
    const btnStyle = {margin: "20px"}
   

    const[name, setName] = useState("");
    const[address, setAddress] = useState("")
    const [students, setStudents] = useState([])

    const handleClick = (e) => {
        e.preventDefault(); 
        const student = {name, address};
        console.log(student); 
        fetch("http://localhost:8080/student/add",{
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(student)
        }).then(()=>{
            console.log("New Student added")
        })
    }

    useEffect(()=>{
        fetch("http://localhost:8080/student/getAll")
        .then(res=>res.json())
        .then((result) => {
            setStudents(result);
         }
        )
    },[])

  return (
    <Container>
     <Card variant="outlined" style={styleObj}>
        <h1 style={{color: "CornFlowerBlue", marginTop: "50px"}}><u>Add Student</u></h1>
     <Box
      elevation={3} style = {boxStyle}
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth
      value={name} onChange={(e)=>setName(e.target.value)}/>

      <TextField id="outlined-basic" label="Address" variant="outlined" fullWidth
      value={address}  onChange={(e)=>setAddress(e.target.value)}/>      
      </Box>

      {name} {address}
       <br/>
      <Button style={btnStyle} variant="contained" color="success" onClick={handleClick}>Submit</Button>

      <Paper elevation={3} style={boxStyle}>
        {students.map(student => (
          <Paper elevation={6} style={{margin: "10px", padding:"15px", textAlign:"left"}} key={student.id}>
            Id: {student.id}<br/>
            Name: {student.name}<br/>
            Address: {student.address}
          </Paper>
        ))
      }

      </Paper>
     </Card>
    </Container>
  );
}
