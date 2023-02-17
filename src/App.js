import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from './layout/layout';
import Product from './components/Products/Product';
import TransferIn from './components/transferin/transferin';
import TransferOut from './container/transferOut/Transferout';
import TransferReport from './container/transferOut/transferReport';
import TransferinReport from './container/transferInReport/TransferinReport';
import Allvendors from './container/vendor/Allvendor';

function App() {
  return (
    <div className="">
      <Router>
        <CssBaseline />
        <Layout>
          <Routes>
            <Route path='/products' element={<Product />} />
            <Route path='/transferin' element={<TransferIn />} />
            <Route path='/transferout' element={<TransferOut/>} />
            <Route path='/transfer-out_report' element={<TransferReport/>} />
            <Route path='/transfer-in_report' element={<TransferinReport/>} />
            <Route path='/vendors' element={<Allvendors/>} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
