
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Login from './Pages/Login';
import Product from './Pages/Product';
import Footer from './Components/Footer/Footer';


function App() {
  return (
    <div>

      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory category='men'/>}/>
        <Route path='/womens' element={<ShopCategory category='women'/>}/>
        <Route path='/kids' element={<ShopCategory category='kids'/>}/>
        <Route path='/accessories' element={<ShopCategory category='accessories'/>}/>
        <Route path='/product' element={<Product/>}> 
          <Route path=':productId' element={<Product/>}/> 
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/signup' element={<LoginSignup/>}/>
        <Route path='/login' element={<Login />} />
      </Routes>
      </BrowserRouter>

      <Footer/>


    </div>
  );
}

export default App;
