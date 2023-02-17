import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md';
import BaseApiUrl from '../../axios/axios'
import SelectField from "../autocomplete/autocomplete";

import BasicTextFields from '../TextField/Textfield';
import BarcodeReader from "react-barcode-reader";
import { useSelector, useDispatch } from 'react-redux'
import { postProducts, retrieveProducts } from '../../redux/reducers/reducer';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TableHead } from '@mui/material';
import { Check, Delete, Edit, PlusOne, Remove } from '@mui/icons-material';
import { createItem, deleteItem,  resetItem } from '../../redux/features/itemslice';
import Addproduct from '../../container/addproducts/Addproduct';
import Vendor from '../../container/vendor/AddVendor';
import Toast from '../toast/toast';

function TablePaginationAction(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;
  // console.log( page, rowsPerPage,);
  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowSPerPage, onPageChange } = props;
  console.log(page, rowSPerPage);

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowSPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowSPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowSPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
TablePaginationAction.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowSPerPage: PropTypes.number.isRequired,
};


function TransferIn() {
  const [vendorData, setVendorData] = useState([]);
  const [Data, setData] = useState([]);
  const [VendorID, setVendorID] = useState('');
  const [Invoice, setInvoice] = useState('');
  const [scanItem, setScanItem] = useState(false);
  const [ProductSearch, setProductSearch] = useState('');
  const [Qty, setQty] = useState();
  const [PurPrice, setPurPrice] = useState();
  const [MRP, setMRP] = useState();
  const [MSP, setMSP] = useState();
  const [TransferPrice, setTransferPrice] = useState();
  const [GST, setGST] = useState();
  const [Discount, setDiscount] = useState('');
  const [ScanData, setScanData] = useState('');
  const [text, setText] = useState('');
  const [open, setSOpen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [OpenAddNewProductModal, setOpenAddNewProductModal] = useState(false);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(retrieveProducts());
  }, [dispatch])

  // dispatch(getItem());
  const { Products } = useSelector(state => state.products)
  const { items } = useSelector(state => state.item)
  console.log(items);

  useEffect(() => {
    BaseApiUrl.get("/vendor")
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
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = () => {
    setOpenAddNewProductModal(false);
  };

  const filteredProducts = Products.filter((item) => {
    if (scanItem === false && ScanData === null) {
      return (item.name.toLowerCase().includes(ProductSearch.toLowerCase()) || item.barcode.toLowerCase().includes(ProductSearch.toLowerCase()));
    } else if (ProductSearch.length > 0) {
      return item.name.toLowerCase().includes(ProductSearch.toLowerCase());
    } else {
      return item.barcode.toLowerCase().includes(ScanData === null ? "" : ScanData.toString().toLowerCase());
    }
  });

  // useEffect(()=>{

  // },[scanItem])
  // Scan func and states
  const handleScan = async (data) => {
    await setScanData(null);
    await setScanData(data);
    const isInArray = Products.find((item) => item.barcode === data && item);

  };
  const handleAdd = (id) => {
    console.log(id);
    if (Qty === '' || Qty === null || Qty === undefined) {
      setSOpen(true)
      setSeverity("error")
      setText("Add Quantity")
    }
    else if (PurPrice === '' || PurPrice === null || PurPrice === undefined) {
      setSOpen(true)
      setSeverity("error")
      setText("Add Purchase Price")
    }
    else if (MRP === '' || MRP === null || MRP === undefined) {
      setSOpen(true)
      setSeverity("error")
      setText("Add MRP")
    }
    else if (MSP === '' || MSP === null || MSP === undefined) {
      setSOpen(true)
      setSeverity("error")
      setText("Add Msp")
    }
    else if (TransferPrice === '' || TransferPrice === null || TransferPrice === undefined) {
      setSOpen(true)
      setSeverity("error")
      setText("Add Transfer price or add 0")
    }
    else if (GST === '' || GST === null || GST === undefined) {

      setSOpen(true)
      setSeverity("error")
      setText("Add  GST or Add 0")
    }
    else if (Discount === '' || Discount === null || Discount === undefined) {
      setSOpen(true)
      setSeverity("error")
      setText("Add Discount or Add 0")
    }
    else {
      const found = items.some(el => el.Products === id._id);
      if (!found) {
        dispatch(
          createItem({
            Products: id._id,
            barcode: id.barcode,
            name: id.name,
            quantity: Number(Qty),
            purchasePrice: PurPrice ? Number((((
              (Qty * PurPrice) - Discount) + (((Qty * PurPrice) - Discount) * (GST ? Number(GST) : Number(id.itemGst))) / 100) / Qty)).toFixed(2) : Number(id.purchasePrice),
            itemMrp: MRP,
            itemMsp: MSP,
            transferPrice: TransferPrice ,
            itemGst: GST ? GST : id.itemGst,
            itemMeasure: id.itemMeasure,
            discount: Discount ? Discount : 0
          }))
      }
      else {
        setSOpen(true)
        setSeverity("error")
        setText("Item Already Present")
      }
    }
    setQty('')
setPurPrice('')
setMRP('')
setMSP('')
setTransferPrice('')
setDiscount('')
setGST('')


    // dispatch(getItem());

    console.log("handleAdd");
  }
  const Closehandle = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSOpen(false);
  };
  const handleDelete= (row) =>{
    dispatch(deleteItem(row))
  }
  const clickedTransfer= () =>{
    if (VendorID === '' || VendorID === null || VendorID === undefined) {
      setSOpen(true)
      setSeverity("error")
      setText("Add Vendor ")
    }
    else if (Invoice === '' || Invoice === null || Invoice === undefined) {
      setSOpen(true)
      setSeverity("error")
      setText("Add Invoice Number")
    }
    else if (items.length === 0 ) {
      setSOpen(true)
      setSeverity("error")
      setText("Add Items")
    }
    else{
console.log("uploaded");
    dispatch(
      postProducts({
        addproducts:items,
        vendorID:VendorID,
        VendorInvoice:Invoice,
        discount:0
      })
      )
      dispatch(resetItem())
    }
  }
  return (
    <div>
      <Toast open={open} severity={severity} text=
        {text} handleClose={Closehandle} />
      <div className='flex flex-col md:flex-row justify-center'>
        <Vendor parentCallback={(data) => setData(data)} />
        <SelectField data={vendorData.length >= Data.length ? vendorData : Data} label={"Vendor"} changeHandler={(e, v) => setVendorID(v.id)} />
        {/* <form>   */}
        <BasicTextFields label={"Invoice no."} Changed={(e) => setInvoice(e.target.value)} />
      </div>
      <div className='flex flex-row w-[100%] mt-2'>
        {!scanItem ?
          <button className='bg-red-600 px-3 py-1 rounded-md text-slate-50 font-semibold' onClick={() => setScanItem(true)} type='button'>Barcode</button>
          :
          <h5 className='font-bold' onClick={
            () => setScanItem(false)}>Searching....</h5>
        }
        <div className='mx-5 '>
          <button className='bg-cyan-700 px-3 py-1 rounded-md text-slate-50 font-semibold'
            onClick={() => setOpenAddNewProductModal(true)}
            type='button'> Add New Product</button>
        </div>

        {scanItem === true ? (
          <BarcodeReader
            // onError={handleError}
            onScan={handleScan}
          // onKeyDetect={handleScan}
          />) : null}

        <input className="px-2  w-3/5 border-2 border-black-600  " type="search" placeholder="Search Product by Name / Barcode Number"
          onFocus={
            () => {
              setScanItem(false);
              setScanData(null);
            }
          }
          onClick={() => setScanItem(false)}
          onChange={
            (event) => setProductSearch(event.target.value)
          } />



        {scanItem === true ? (
          <BarcodeReader
            // onError={handleError}
            onScan={handleScan}
          // onKeyDetect={handleScan}
          />) : null}
      </div>
      <div className='py-5'>
        {/* <CustomPaginationActionsTable data={filteredProducts} clicked={()=>handleAdd()}/> */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow

                sx={{ 'td,  th': { border: '1px solid black' } }}
              >
                <TableCell ># </TableCell>
                <TableCell sx={{
                  width: 'auto'
                }} align="center">ID</TableCell>
                <TableCell sx={{
                  width: '50px'
                }} align="center">Name</TableCell>
                <TableCell sx={{
                  width: '50px'
                }} align="center">Qty</TableCell>
                <TableCell sx={{
                  width: '50px'
                }} align="center">Pur. Price</TableCell>
                <TableCell sx={{
                  width: '50px'
                }} align="center">MRP</TableCell>
                <TableCell sx={{
                  width: '50px'
                }} align="center">MSP`</TableCell>
                <TableCell sx={{
                  width: '50px'
                }} align="center">Transfer Cost</TableCell>
                <TableCell sx={{
                  width: '50px'
                }} align="center">Disc Before GST</TableCell>
                <TableCell sx={{
                  width: '50px'
                }} align="center">GST</TableCell>
                <TableCell sx={{
                  width: '50px'
                }} align="center">Measure</TableCell>
                <TableCell sx={{
                  width: '50px'
                }} align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {
               (rowsPerPage > 0
                ? filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredProducts
              ).map((row, i) => (
                <TableRow
                  key={row.name}
                  sx={{ 'td,  th': { border: '1px solid black' } }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.barcode}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">


                    <input type="text" className='px-1 w-10 border-2 border-black-600'  placeholder={row.availableQuantity} onChange={(e) => { setQty(e.target.value) }} />
                  </TableCell>
                  <TableCell align="center">
                    <input type="text" className='px-1 w-10 border-2 border-black-600'  placeholder={row.purchasePrice} onChange={(e) => { setPurPrice(e.target.value) }} />
                  </TableCell>
                  <TableCell align="center">
                    <input type="text" className='px-1 w-10 border-2 border-black-600'  placeholder={row.itemMrp} onChange={(e) => { setMRP(e.target.value) }} />
                  </TableCell>
                  <TableCell align="center">
                    <input type="text" className='px-1 w-10 border-2 border-black-600' placeholder={row.itemMsp} onChange={(e) => { setMSP(e.target.value) }} />
                  </TableCell>
                  <TableCell align="center">
                    <input type="text" className='px-1 w-10 border-2 border-black-600'  placeholder={row.stockTransferPrice} onChange={(e) => { setTransferPrice(e.target.value) }} />
                  </TableCell>
                  <TableCell align="center">
                    <input type="text" className='px-1 w-10 border-2 border-black-600'   placeholder={row.discount} onChange={(e) => { setDiscount(e.target.value) }} />

                  </TableCell>
                  <TableCell align="center">
                    <input type="text" className='px-1 w-10 border-2 border-black-600'  placeholder={row.itemGst} onChange={(e) => { setGST(e.target.value) }} />
                  </TableCell>
                  <TableCell align="center">
                    {row.itemMeasure}
                  </TableCell>
                  <TableCell align="center">
                    <Check onClick={() => handleAdd(row)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={12}
                  count={filteredProducts.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationAction}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

      </div>

      <div className='py-5'>
        <div className='flex flex-row text-lg justify-center'>
          <h3 className=''>Selected Items </h3>

        </div>

        {/* <CustomPaginationActionsTable data={filteredProducts} clicked={()=>handleAdd()}/> */}
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{}} >
              <TableRow

                sx={{
                  'td,  th': { border: '1px solid black' },
                }}
              >
                <TableCell sx={{
                  width: 'auto',
                  backgroundColor: 'black',
                  color: 'white'
                }} ># </TableCell>
                <TableCell sx={{
                  width: 'auto',
                  backgroundColor: 'black',
                  color: 'white'
                }} align="center">Barcode</TableCell>
                <TableCell sx={{
                  width: 'auto',
                  backgroundColor: 'black',
                  color: 'white'
                }} align="center">Name</TableCell>
                <TableCell sx={{
                  width: 'auto',
                  backgroundColor: 'black',
                  color: 'white'
                }} align="center">Qty</TableCell>
                <TableCell sx={{
                  width: 'auto',
                  backgroundColor: 'black',
                  color: 'white'
                }} align="center">Pur. Price</TableCell>
                <TableCell sx={{
                  width: 'auto',
                  backgroundColor: 'black',
                  color: 'white'
                }} align="center">Dic. before Gst</TableCell>
                <TableCell sx={{
                  width: 'auto',
                  backgroundColor: 'black',
                  color: 'white'
                }} align="center">Taxable Price</TableCell>
                <TableCell sx={{
                  width: 'auto',
                  backgroundColor: 'black',
                  color: 'white'
                }} align="center">GST</TableCell>
                <TableCell sx={{
                  width: 'auto',
                  backgroundColor: 'black',
                  color: 'white'
                }} align="center">Net Amount</TableCell>
                <TableCell sx={{
                  width: 'auto',
                  backgroundColor: 'black',
                  color: 'white'
                }} align="center">Transfer Cost</TableCell>
                <TableCell sx={{
                  width: 'auto',
                  backgroundColor: 'black',
                  color: 'white'
                }} align="center">Measure</TableCell>
                <TableCell sx={{
                  width: 'auto',
                  backgroundColor: 'black',
                  color: 'white'
                }} align="center">PP + TC</TableCell>
                <TableCell sx={{
                  width: 'auto',
                  backgroundColor: 'black',
                  color: 'white'
                }} align="center">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>


              {(items
              ).map((row, i) => (
                <TableRow
                  key={row.name}
                  sx={{ 'td,  th': { border: '1px solid black' } }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.barcode}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">
                    <label>{row.quantity}</label>
                    
                  </TableCell>
                  <TableCell align="center">
                    <label>{row.purchasePrice} </label>
                  </TableCell>
                  <TableCell align="center">
                  <label>{row.discount} </label>
                  </TableCell>
                  <TableCell align="center">
                    <label>
                    <label>{
                      ((Number(((100 / (100 + Number(row.itemGst))) * Number(row.purchasePrice))) * Number(row.quantity))).toFixed(2)
                      }</label>
                      </label>
                  </TableCell>
                  <TableCell align="center">
                    <label>{row.itemGst}</label>
                  </TableCell>
                  <TableCell align="center">
                    <label>{ (Number(row.purchasePrice) * Number(row.quantity)).toFixed(2)}</label>

                  </TableCell>
                  <TableCell align="center">
                    <label>{row.transferPrice} </label>
                  </TableCell>
                  <TableCell align="center">
                    {row.itemMeasure}
                  </TableCell>
                  <TableCell align="center">
                    { (Number(row.purchasePrice) + Number(row.transferPrice)).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">

                    <Delete onClick={() => handleDelete(row)}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>

      </div>
      <div className='flex flex-row justify-center'>
      <label>Net Amount  &nbsp;</label>
      <label>{Number(items.reduce((acc, item) => acc + (item.purchasePrice ? Number(item.purchasePrice) : 0) * Number(item.quantity), 0,).toFixed(2) - Number(Discount).toFixed(2))}</label>
</div>

<div className='flex flex-row justify-center mt-7'>

      <Button
        type="submit"
        variant="outlined"
        color="secondary"
        endIcon={<MdKeyboardArrowRight />}
      onClick={() => clickedTransfer()}
      >
        Transfer In
      </Button>

      </div>

      {/* // data={vendorData} label={"Vendor"} */}
     
      {/* </form> */}
      <Addproduct open={OpenAddNewProductModal} onclose={handleClose} />
    </div>
  )
}

export default TransferIn