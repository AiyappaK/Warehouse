import React, { useEffect } from 'react'
import { useState } from 'react';
import BaseApiUrl from '../../axios/axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function TransferinReport() {
  const [transfer, setTransfer] = useState([]);
  useEffect(() => {
    BaseApiUrl.get("/inventory")
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
  console.log(transfer);
  return (
    <div className=''>
      <h1>Transfer In Report</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650,
        border: '1px solid black',
       
         }} size="small" aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell align="center" sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }}>#</TableCell>
              <TableCell  sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }}  align="center">From</TableCell>
              <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }}  align="center">Invoice No.</TableCell>
              <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }}  align="center">Products</TableCell>
              <TableCell  sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transfer.map((row, i) => (
              <TableRow
                key={row.name}
                
              >
                <TableCell align="center" sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }}  component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px',
                  
                }}align="center">{row.Vendor.VendorName}</TableCell>
                <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">{row.VendorInvoice}</TableCell>

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
                }} >#</TableCell>
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
                }} align="center">Quantity</TableCell>
                          
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
                }} align="center">Discount</TableCell>
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
                }} align="center">GST</TableCell>
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
                }} align="center">{items.quantity}</TableCell>
                          
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">{items.itemMeasure}</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">{items.purchasePrice}</TableCell>
                          <TableCell sx={{
                  fontSize:'0.75rem',
                   
                  padding:'1px'
                }} align="center">{items.discount}</TableCell>
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
                }} align="center">{items.itemGst}</TableCell>
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
                  {(Number(row.addProducts.reduce((acc,item)=> acc + ((Number(item.purchasePrice) * Number(item.quantity)) - Number(item.discount)), 0))).toFixed(2)}
                </TableCell>
              
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TransferinReport