// {props.data.map((e)=>{
//   console.log(e.id, e.Name)
//    })}
//    {props.data.map((e)=>

//     <option key={e.id} value={e.id}>{e.Name}</option>
//     )}

    import * as React from 'react';
    import TextField from '@mui/material/TextField';
    import Autocomplete from '@mui/material/Autocomplete';
    
    export default function SelectField(props) {
      return (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={props.data}
          sx={{ width: 300 }}
          getOptionLabel={(option) => option.Name }
          onChange={props.changeHandler}
          isOptionEqualToValue={(option, value) => option.value === value.value} 
          renderInput={(params) => <TextField    {...params} label={props.label} />}
        />
      );
    }
    
  