import { Box, Modal } from '@mui/material'
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#ffffff',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


function Printpos(props) {
    const items = props.product

    const componentRef = useRef();
  const Print = useReactToPrint({
    content: () => componentRef.current,
});
    
    return (
        <div>
            <div>
                <Modal
                    open={props.open}
                    onClose={props.onclose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={style}>
                        <div className=''> 
                        <div className='mt-7 w-full border-2 border-black'/>
                        <div ref={componentRef} className='pb-4 '> 
                            <div className='text-center pt-3'>
                            <h2 className='text-base font-bold mb-4'>
                                My new Store For Grocery
                            </h2>
                        </div>

                        <div className='flex justify-between pt-3'>
                            <div className='text-center text-xs'>
                                <h3>GSTIN : 29AAICK2158E1ZH</h3>
                                <h6 className='font-extrabold mt-2'>INVOICE BILL</h6>
                            </div>
                            <div className='text-right text-xs'>
                                <h3>Phone Number : 29AAICK2158E1ZH</h3>
                                <h6>Address: INVOICE</h6>
                            </div>
                        </div>
                        <div className='flex justify-between font-semibold pt-3'>
                            <div>
                                <h6>Bill No. : 51560-8362-22/23-VIR</h6>
                                <h6>Date : 51560-8362-22/23-VIR</h6>
                                <h6>Time : 51560-8362-22/23-VIR</h6>
                            </div>
                            <div>
                                <h6>Store Name: Mala ittira</h6>

                            </div>
                        </div>

                        <div className='text-center pt-3'>
                            <table className='w-full'>
                                <tr>
                                    <th className='border border-solid'>#</th>
                                    <th className='border border-solid'>Barcode</th>
                                    <th className='border border-solid'>Item</th>
                                    <th className='border border-solid' >Unit Price</th>
                                    <th className='border border-solid'>Qty</th>
                                    <th className='border border-solid'>Cost</th>
                                </tr>
                                    {items.addProducts?.map((row,i) => (
                                <tr key={row._id}>
                                <td className='border border-solid'>{i+1}</td>
                                        <td className='border border-solid' >{row.Products.barcode}</td>
                                         <td className='border border-solid'>{row.Products.name}</td>
                                         <td className='border border-solid'>{row.oldPurchasePrice}</td>
                                         <td className='border border-solid'>{row.quantity}</td>
                                         <td className='border border-solid'>{(Number(row.quantity)*Number(row.oldPurchasePrice))}</td>
                                </tr>
                                ))}
                                
                                <tr className='border border-solid'>
                                    <td className='border border-solid text-right px-3'colSpan={5}>Total</td>
                                    <td className='border border-solid text-center' >
                                        {(Number(items.addProducts?.reduce((acc,item)=> acc + (Number(item.oldPurchasePrice) * Number(item.quantity)), 0))).toFixed(2)}
                                    </td>
                                </tr>
                            </table>
                            </div>
                            </div>

                            <div className='w-full border-2 border-black'/>

                            <div className='flex py-2 pt-3 justify-end'>
                                <button className='bg-green-600 px-3 py-1 mx-4 rounded-md text-slate-50 font-semibold' onClick={()=>Print()} type='button'>Print</button>
                                <button className='bg-gray-400 px-3  py-1 rounded-md text-slate-50 font-semibold' type='button' onClick={props.clicked}>Close</button>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default Printpos