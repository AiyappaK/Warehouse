import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import BaseApiUrl from '../../axios/axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import Printpos from '../print/printpos';
import { useReactToPrint } from 'react-to-print';

function TransferReport() {
  const [transfer, setTransfer] = useState([]);
  const [Preview, setPreview] = useState([]);
  const [print, setPrint] = useState(false);
  useEffect(() => {
    BaseApiUrl.get("/transfer")
      .then((res) => {
        console.log(res.data);
        setTransfer(res.data.data)
        // res.data.data.map((e) => ({

        // })
        // ))
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  const printHandler = (items) => {
    setPreview(items);
    setPrint(true)  
  }

  const handleClose = () => {
    setPrint(false);
  };
  

  console.log(transfer);
  return (
    <div>
      <h1>Transfer Out Report</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }}>#</TableCell>
              <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">To</TableCell>
              <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">Products</TableCell>
              <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">Total Bill</TableCell>
              <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">Print</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transfer.map((row, i) => (

              <TableRow
                key={row.name}
               
              >
                <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">{row.Store.Store}</TableCell>

                <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }}>#</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">ID</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">Name</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">Before Stock</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">Quantity</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">After Stock</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">Measure</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">Purchase Price</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">MRP</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">MSP</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">Transfer Cost</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {row.addProducts.map((items, i) => (
                        <TableRow>
                           <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">{i+1}</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">{items.Products.barcode}</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">{items.Products.name}</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">{items.beforeDC}</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">{items.quantity}</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">{items.afterDC}</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">{items.itemMeasure}</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">{items.oldPurchasePrice}</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">{items.itemMrp}</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">{items.itemMsp}</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">{items.transferPrice}</TableCell>                             
                        </TableRow>
                      ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TableCell>
                <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">
                  {(Number(row.addProducts.reduce((acc,item)=> acc + (Number(item.oldPurchasePrice) * Number(item.quantity)), 0))).toFixed(2)}
                </TableCell>
                <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">
                  <button onClick={()=>printHandler(row)}>
                  <LocalPrintshopOutlinedIcon />
                  </button>
                </TableCell>
              </TableRow>
              
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Printpos open={print}  product={Preview} onclose={handleClose} clicked={handleClose}/>
    </div>
  )
}

export default TransferReport