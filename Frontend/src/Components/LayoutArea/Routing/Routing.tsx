import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../../HomeArea/Home/Home';
import Addproduct from '../../ProductsArea/Addproduct/Addproduct';
import ProductsList from '../../ProductsArea/ProductsList/ProductsList';
import PageNotFound from '../PageNotFound/PageNotFound';

function Routing(): JSX.Element {
    return (
        <Routes>
          <Route path="/home" element={<Home/>}/>
          {/* <Route path="/" element={<Home/>}/> */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/products-list" element={<ProductsList/>}/>
          <Route path='/add-prdouct' element={<Addproduct/>}/>

          <Route path="*" element={<PageNotFound/>} />
        </Routes>
    );
}

export default Routing;
