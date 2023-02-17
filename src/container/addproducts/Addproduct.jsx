import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import SelectField from '../../components/autocomplete/autocomplete';
import BaseApiUrl from '../../axios/axios'
import { useSelector, useDispatch } from 'react-redux'
import BasicTextFields from '../../components/TextField/Textfield';
import Category from './Category/Category';
import BarcodeReader from "react-barcode-reader";
import axios from '../../axios/axios';
import { retrieveProducts } from '../../redux/reducers/reducer';

const MeasureData = [
  {
    id: 'Kilogram',
    Name: 'Kilogram'
  },
  {
    id: 'Packet',
    Name: 'Packet'
  },
  {
    id: 'liters',
    Name: 'Liters'
  },
  {
    id: 'Numbers',
    Name: 'Numbers'
  }
]
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#ffffff',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


function Addproduct(props) {
  const [scanItem, setScanItem] = useState(false);
  const [scanData, setScanData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [CategoryData, setCategoryData] = useState([]);

  const [Name, setName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemMeasure, setItemMeasure] = useState('');
  const [itemHsn, setItemHsn] = useState('');
  const [productCode, setProductCode] = useState(null);
  const dispatch = useDispatch();


  useEffect(() => {
    BaseApiUrl.get("/category")
      .then((res) => {
        setCategoryData(
          res.data.data.map((e) => ({
            Name: e.name,
            id: e._id
          })
          ))
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  useEffect(() => {
    const onLoadGenRandCode = async () => {
      let randomCode = "";
      const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (var i = 14; i > 0; --i)
        randomCode += chars[Math.floor(Math.random() * chars.length)];
      await setProductCode(randomCode);
    };
    onLoadGenRandCode();
  }, []);

  const handleScan = async (data) => {
    setErrorMessage("");
    setScanData(null);
    setScanData(data);
    setScanItem(false);
  };
  const handleError = async (err) => {
    setErrorMessage("Error Occured When Scanning", err);
  };

  const addHandler = () => {
    if (Name == null || Name.length < 1) {
      setErrorMessage("Enter product")
    }
    else if ((itemMeasure == null || itemMeasure.length < 1)) {
      setErrorMessage("Select Measure")
    }
    else if ((itemCategory == null || itemCategory.length < 1)) {
      setErrorMessage("Select Category")
    }
   
    else {
    const data={barcode: productCode,
      name:Name,
      itemCategory,
      itemMeasure,
      itemHsn,
      itemGst:0,
      purchasePrice:0,
      itemMsp:0,
      availableQuantity:0,
      itemMrp:0
       }
    console.log(data);
    axios.post("/product",data)
    .then(()=>{
     dispatch(retrieveProducts());
    })
    setItemCategory('')
    setErrorMessage('')
    setItemHsn('')
    setItemMeasure('')
    setName('')
    }

  }
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onclose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <div className='text-center '>
            <h2 className='text-base font-bold mb-4'>Add New Product</h2>
          </div>
          <div>
            {scanItem === true ? (
              <BarcodeReader
                onError={handleError}
                onScan={handleScan}
              // onKeyDetect={handleScan}
              />
            ) : null}

            {!scanItem ?
              <button className='bg-red-600 px-3 py-1 mb-4 rounded-md text-slate-50 font-semibold' onClick={() => setScanItem(true)} type='button'>Barcode</button>
              :
              <h5 className='font-bold' onClick={
                () => setScanItem(false)}>Searching....</h5>
            }
          </div>

          <label className='px-2'>New Barcode</label>
          <label className='px-2'>
            {scanData !== null ? `${scanData.toString()}` : productCode}
          </label>
          <div className='mb-4'>
            <BasicTextFields value={Name} label={"Enter Product Name"} Changed={(e) => setName(e.target.value)} />
          </div>
          <div className='mb-4'>
            <BasicTextFields label={"HSN"} value={itemHsn} Changed={(e) => setItemHsn(e.target.value)} />
          </div>
          <div className='mb-4'>
            <SelectField data={MeasureData} value={itemMeasure} label={"Measure"} changeHandler={(e, v) => setItemMeasure(v.id)} />
          </div>
          <div className='mb-4'>
            <SelectField data={CategoryData} value={itemCategory} label={"Category"} changeHandler={(e, v) => setItemCategory(v.id)} />
          </div>
          <div className='mb-4'>
            <Category />
          </div>
          <div className='text-center '>
              <label className='text-red-700 font-mono font-semibold text-sm'>{errorMessage}</label>
              <div className='py-2'>
          <button className='bg-green-600 px-3 py-1 rounded-md text-slate-50 font-semibold' onClick={addHandler} type='button'>Add To Inventory</button>
          </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default Addproduct