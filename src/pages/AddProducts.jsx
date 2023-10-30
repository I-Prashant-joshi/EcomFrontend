import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Addproductsapi } from '../Redux/apicall';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Fireapp from './firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Copyright(props) {
    
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Addproducts() {

    const Navigate=useNavigate();
    const dispatch=useDispatch()
    const {isFetching,error,currentUser}=useSelector((state)=>state.user);


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   
    const title=data.get("title");
    const type=data.get("type");
    const vsprice=parseInt(data.get("vsprice"));
    const mrprice=parseInt(data.get("mrprice"));
    const off=data.get("off");
    const tag=data.get("tag");
    const color=data.get("color").split(",");
    const img=data.get("img")

    const Data={
      title,
      type,
      img,
      vsprice,
      mrprice,
      color,
      off,
      tag,
    }
// console.log(Data);
    Addproductsapi(dispatch,Data);
  // console.log(img);
    const Filename= img.name+new Date().getTime();
    console.log(Filename);
    const storage = getStorage(Fireapp);
    const storageRef = ref(storage, Filename);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);
 

   
    
    // console.log("data in data=",Data);
 
  };



    

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs"  >
        <CssBaseline />
        <Box 
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Addproducts
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="title"
              name="title"
              autoComplete="title"
              autoFocus
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id="type"
              label="type"
              name="type"
              autoComplete="type"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="vsprice"
              label="vsprice"
              id="vsprice"
              autoComplete="current-vsprice"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="mrprice"
              label="mrprice"
              id="mrprice"
              autoComplete="current-mrprice"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="off"
              label="off"
              id="off"
              autoComplete="current-off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="tag"
              label="tag"
              id="tag"
              autoComplete="current-tag"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="color"
              label="color"
              id="color"
              autoComplete="current-color"
            />
            <TextField
              margin="normal"
              required
              fullWidth
           
              name="img"
              
              id="img"
              autoComplete="current-img"
            />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2}}
              disabled={isFetching}
             >
              Addproducts
            </Button>
           
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
