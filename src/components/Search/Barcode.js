import { Search } from '@mui/icons-material'
import { Box, Button, TextField } from '@mui/material'
import React from 'react'

function Barcode(props) {
  return (
    <div className='flex flex-row w-[100%]'>
    <Button
    type=""
    variant="outlined"
    color="secondary"
    endIcon={<Search />}
    onClick={props.clicked}
    >
      Barcode
  </Button>
  <Box
  component="form"
  sx={{
      '& > :not(style)': { m: 1, width: '100%' },
      paddingX:'20px',
      
    }}
    noValidate
    autoComplete="off"
>
  <TextField sx={{width:'100vw'}} id="standard-basic" label={props.label} onFocus={props.Focus} onChange={props.Changed} variant="standard" />
</Box>
</div>
  )
}

export default Barcode