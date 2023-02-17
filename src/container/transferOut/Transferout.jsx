import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md';
import BaseApiUrl from '../../axios/axios'



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
import { createTransferItem, deleteTransferItem, resetTransferItem, } from '../../redux/features/transfer';
import Toast from '../../components/toast/toast';
import { postTransferOut } from '../../redux/reducers/transferOut';
import SelectField from '../../components/autocomplete/autocomplete';



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

function TransferOut() {
    const [scanItem, setScanItem] = useState(false);
    const [ProductSearch, setProductSearch] = useState('');
    const [Qty, setQty] = useState();
    const [storeData, setStoreData] = useState([]);
    const [storeID, setStoreID] = useState();
    const [storeName, setStoreName] = useState();
    const [TransferPrice, setTransferPrice] = useState();
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

    useEffect(() => {
        BaseApiUrl.get("/store")
            .then((res) => {
                setStoreData(
                    res.data.data.map((e) => ({
                        Name: e.Store,
                        id: e._id
                    })
                    ))
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const { Products } = useSelector(state => state.products)
    const { TransferItems } = useSelector(state => state.AddTransfer)
    console.log("test", storeID,
        storeName?.toLowerCase());

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

        else if (TransferPrice === '' || TransferPrice === null || TransferPrice === undefined) {
            setSOpen(true)
            setSeverity("error")
            setText("Add Transfer price or add 0")
        }

        else {
            console.log("sucess");
            const found = TransferItems.some(el => el.Products === id._id);
            if (!found) {
                dispatch(
                    createTransferItem({
                        Products: id._id,
                        barcode: id.barcode,
                        name: id.name,
                        quantity: Number(Qty),
                        oldPurchasePrice: id.purchasePrice,
                        afterDC: Number(Number(id.availableQuantity) - Number(Qty)),
                        beforeDC: id.availableQuantity,
                        purchasePrice: Number((Number(id.purchasePrice) + Number(TransferPrice)).toFixed(2)),
                        itemMrp: id.itemMrp,
                        itemMsp: id.itemMsp,
                        itemGst: id.itemGst,
                        transferPrice: Number(TransferPrice),
                        itemMeasure: id.itemMeasure,

                    }))
            }
            else {
                setSOpen(true)
                setSeverity("error")
                setText("Item Already Present")
            }
        }
        setQty('')

        setTransferPrice('')


        // dispatch(getItem());

        console.log("handleAdd");
    }
    const Closehandle = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSOpen(false);
    };
    const handleDelete = (row) => {
        dispatch(deleteTransferItem(row))
    }
    const clickedTransfer = () => {
        if (TransferItems.length === 0) {
            setSOpen(true)
            setSeverity("error")
            setText("Add Items")
        }
        else {
            console.log(TransferItems);
            dispatch(
                postTransferOut({
                    addproducts: TransferItems,
                    Storename: storeName,
                    Store: storeID,
                })
            )
            dispatch(resetTransferItem())
        }
    }
    return (
        <div>
            <Toast open={open} severity={severity} text=
                {text} handleClose={Closehandle} />
            <div className='flex flex-row w-[100%] mt-2'>
                <div className='mx-5 '>
                    {!scanItem ?
                        <button className='bg-red-600 px-3 py-1 rounded-md text-slate-50 font-semibold' onClick={() => setScanItem(true)} type='button'>Barcode</button>
                        :
                        <h5 className='font-bold' onClick={
                            () => setScanItem(false)}>Searching....</h5>

                    }

                    {scanItem === true ? (
                        <BarcodeReader
                            // onError={handleError}
                            onScan={handleScan}
                        // onKeyDetect={handleScan}
                        />) : null}
                </div>
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
                <SelectField data={storeData} label={"Store"} changeHandler={(e, v) => {
                    setStoreID(v.id)
                    setStoreName(v.Name)

                }} />
            </div>
            <div className='py-5'>
                {/* <CustomPaginationActionsTable data={filteredProducts} clicked={()=>handleAdd()}/> */}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow

                                sx={{ 'td,  th': { border: '1px solid black' } }}
                            >
                                <TableCell  sx={{
                                    width: 'auto'
                                }} ># </TableCell>
                                <TableCell sx={{
                                    width: 'auto'
                                }} align="center">ID</TableCell>
                                <TableCell sx={{
                                    width: '25px'
                                }} align="center">Name</TableCell>
                                <TableCell sx={{
                                    width: '50px'
                                }} align="center">In stock</TableCell>
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
                                }} align="center">MSP</TableCell>
                                <TableCell sx={{
                                    width: '50px'
                                }} align="center">Transfer Cost</TableCell>
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
                                            {row.availableQuantity}
                                        </TableCell>
                                        <TableCell align="center">
                                            <input type="text" className='px-1 w-10 border-2 border-black-600' placeholder={row.availableQuantity} onChange={(e) => { setQty(e.target.value) }} />
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.purchasePrice}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.itemMrp}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.itemMsp}
                                        </TableCell>
                                        <TableCell align="center">
                                            <input type="text" className='px-1 w-10 border-2 border-black-600' placeholder={row.stockTransferPrice} onChange={(e) => { setTransferPrice(e.target.value) }} />
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
                {/* // <CustomPaginationActionsTable data={filteredProducts} clicked={()=>handleAdd()}/> */}
                <TableContainer component={Paper}>
                    <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead sx={{}} >
                            <TableRow
                                sx={{
                                    'td,  th': { border: '1px solid black' },
                                }}>
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
                                }} align="center">PP x Qty</TableCell>
                                <TableCell sx={{
                                    width: 'auto',
                                    backgroundColor: 'black',
                                    color: 'white'
                                }} align="center">Transfer cost</TableCell>
                                <TableCell sx={{
                                    width: 'auto',
                                    backgroundColor: 'black',
                                    color: 'white'
                                }} align="center">Adjusted PP.</TableCell>

                                <TableCell sx={{
                                    width: 'auto',
                                    backgroundColor: 'black',
                                    color: 'white'
                                }} align="center">Measure</TableCell>

                                <TableCell sx={{
                                    width: 'auto',
                                    backgroundColor: 'black',
                                    color: 'white'
                                }} align="center">Remove</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(TransferItems
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
                                        <label>{row.oldPurchasePrice}</label>
                                    </TableCell>

                                    <TableCell align="center">

                                        <label> {
                                            (Number(Number(row.oldPurchasePrice)) * Number(row.quantity)).toFixed(2)
                                        }</label>

                                    </TableCell>
                                    <TableCell align="center">
                                        <label>{row.transferPrice} </label>
                                    </TableCell>

                                    <TableCell align="center">
                                        <label>{(Number(row.oldPurchasePrice) + Number(row.transferPrice)).toFixed(2)}</label>

                                    </TableCell>
                                    <TableCell align="center">
                                        {row.itemMeasure}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Delete onClick={() => handleDelete(row)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className='flex flex-row justify-center mt-7'>

                <Button
                    type="submit"
                    variant="outlined"
                    color="secondary"
                    endIcon={<MdKeyboardArrowRight />}
                    onClick={() => clickedTransfer()}
                >
                    Transfer Out
                </Button>

            </div>

        </div>
    )
}

export default TransferOut