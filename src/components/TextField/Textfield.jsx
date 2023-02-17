import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields(props) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        paddingX:'20px',
        
      }}
      noValidate
      autoComplete="off"
    >
      
      <TextField value={props.value} type={props.type} error={props.error} 
       id="standard-basic"sx={{         
      }} label={props.label} onChange={props.Changed} variant="standard" />
    </Box>
  );
}