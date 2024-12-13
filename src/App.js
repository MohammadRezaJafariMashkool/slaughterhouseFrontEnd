import './App.css';
import './Assets/Fonts/BYekan.ttf';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

/* 
// Modern UI
import CenterSection from './Components/ModernUI/CenterSection';
import ButtonBar  from './Components/ModernUI/ButtonBar';
import NewsBar  from './Components/ModernUI/NewsBar'; 
*/


import HeaderNavbar from './Components/HeaderNavbar/HeaderNavbar';
import PageHome  from './Components/PageHome/PageHome';
import Footer  from './Components/Footer/Footer'; 

import Cart from './Components/CartModal/CartModal';
import Order from './Components/OrdersModal/OrdersModal';
import Signin from './Components/SigninModal/SigninModal';
import Signup from './Components/SignupModal/SignupModal';
import { useState } from 'react';

function App() {

  // State for modal visibility
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Handlers for toggling modals
  const toggleCartModal = () => setIsCartModalOpen((prev) => !prev);
  const toggleSignInModal = () => setIsSignInModalOpen((prev) => !prev);
  const toggleSignUpModal = () => setIsSignUpModalOpen((prev) => !prev);
  const toggleOrderModal = () => setIsOrderModalOpen((prev) => !prev);
  
  return (
    <div className="main-container">
      <BrowserRouter>
        <HeaderNavbar
          onToggleCartModal={toggleCartModal}
          onToggleSignInModal={toggleSignInModal}
          onToggleSignUpModal={toggleSignUpModal}
          onToggleOrderModal={toggleOrderModal}
        />
        <Routes>
          <Route path='/' element={<PageHome onToggleCartModal={toggleCartModal}/>}/>         
        </Routes>
        <Footer/>
      </BrowserRouter>

        {/* Open Modals */}
          {isCartModalOpen && <Cart />}
          {isOrderModalOpen && <Order />}
          {isSignInModalOpen && <Signin />}
          {isSignUpModalOpen && <Signup />}
      </div>
  )
  }
export default App;
