import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import BasicTextFields from '../../../components/TextField/Textfield';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const [Name, setName] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addHandler = () => {

  }
  
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Add Sub Category</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
        <div className='text-center '>
                <h2 className='text-base font-bold mb-4'>Add Sub Category</h2>
                <BasicTextFields label={"Enter Sub Category Name"} Changed={(e) => setName(e.target.value)} />
                <button className='bg-green-600 px-3 py-1 mx-2 rounded-md text-slate-50 font-semibold'  type='button' onClick={addHandler} >Save</button>
                <button className='bg-red-600 px-3 py-1 rounded-md text-slate-50 font-semibold' onClick={handleClose}  type='button'>Cancel</button>
            </div>
          
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function Category() {
  const [open, setOpen] = React.useState(false);
  const [Name, setName] = React.useState('');
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const addHandler = () => {

  }

  return (
    <div>
      <Button onClick={handleOpen}>Add New Category</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
        <div className='text-center '>
                <h2 className='text-base font-bold mb-4'>Add New Category</h2>
                <BasicTextFields label={"Enter Category Name"} Changed={(e) => setName(e.target.value)} />
                <button className='bg-green-600 px-3 py-1 mx-2 rounded-md text-slate-50 font-semibold'  type='button' onClick={addHandler}>Save</button>
                <button className='bg-red-600 px-3 py-1 rounded-md text-slate-50 font-semibold'  type='button' onClick={handleClose}>Cancel</button>
            </div>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}
