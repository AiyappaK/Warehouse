import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BasicTextFields from '../../components/TextField/Textfield';
import axios from '../../axios/axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Vendor(props) {
  const [open, setOpen] = React.useState(false);
  const [VendorName, setVendorName] = React.useState('');
  
  const [Contact, setContact] = React.useState('');
  
  const [Addr, setAddr] = React.useState('');
  
  const [Gstin, setGstin] = React.useState('');
  const [errMsg, seterrMsg] = React.useState('');
  const [vendorData, setVendorData] = React.useState([]);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addHandler = (e) => {
    e.preventDefault();
    if (VendorName == null || VendorName.length < 1) {
      seterrMsg("Enter Vendor name")
    }
    else if ((Contact == null || Contact.length < 1)) {
      seterrMsg("Enter Phone Number")
    }
    else if ((Addr == null || Addr.length < 1)) {
      seterrMsg("Enter Address")
    }
    else if ((Gstin == null || Gstin.length < 1)) {
      seterrMsg("Enter Gstin Number")
    }
    else {
      const data = {
        VendorName,
        phoneNumber: Contact,
        address: Addr,
        GSTIN: Gstin
      }
      console.log(data);
      axios.post("/vendor", data)
        .then(() => {
          axios.get("/vendor")
      .then((res) => {
        setVendorData(
          res.data.data.map((e) => ({
            Name: e.VendorName,
            id: e._id
          })
          ))
      })
      .catch((err) => {
        console.log(err);
      });
        })
        .catch((err) => {
          console.log(err)
          seterrMsg(err.response.data.message)
        })
      setVendorName('')
      setContact('')
      setAddr('')
      setGstin('')
    }
    
    
  }

  props.parentCallback(vendorData)
  
  return (
    <div>
      <button className='bg-green-600 px-3 py-3 mx-2 rounded-md text-slate-50 font-semibold' type='button' onClick={handleOpen} >Add Vendor</button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='text-center '>
            <h2 className='text-base font-bold mb-4'>Add New Vendor</h2>
          </div>
          <form onSubmit={addHandler}>
            <div className='mb-4'>
              <BasicTextFields type={"text"} value={VendorName} label={"Enter Vendor Name"} Changed={(e) => setVendorName(e.target.value)} />
            </div>
            <div className='mb-4'>
              <BasicTextFields type={"number"} value={Contact} label={"Enter Contact details "} Changed={(e) => setContact(e.target.value)} />
            </div>
            <div className='mb-4'>
              <BasicTextFields type={"text"} value={Addr} label={"Enter Address"} Changed={(e) => setAddr(e.target.value)} />
            </div>
            <div className='mb-4'>
              <BasicTextFields type={"text"} value={Gstin} label={"Enter GSTIN"} Changed={(e) => setGstin(e.target.value)} />
            </div>
            <div className='text-center '>
              <label className='text-red-700 font-mono font-semibold text-sm'>{errMsg}</label>
              <div className='py-2'>
                <button className='bg-green-600 px-3 py-1 rounded-md text-slate-50 font-semibold' type='submit'>Save</button>

              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}