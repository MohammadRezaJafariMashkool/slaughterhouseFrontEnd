import { useState } from 'react';
import './App.css';
import './Assets/Fonts/BYekan.ttf';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import HeaderNavbar from './Components/HeaderNavbar/HeaderNavbar';
import PageHome  from './Components/PageHome/PageHome';
import Footer  from './Components/Footer/Footer'; 

import Cart from './Components/CartModal/CartModal';
import Profile from './Components/ProfileModal/ProfileModal';
import AdminProfile from './Components/AdminModal/AdminModal';
import SignInUp from './Components/SigninModal/SigninModal';

function App() {

  // State for modal visibility
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Handlers for toggling modals
  const toggleCartModal = () => setIsCartModalOpen((prev) => !prev);
  const toggleSignInModal = () => setIsSignInModalOpen((prev) => !prev);
  const toggleProfileModal = () => setIsProfileModalOpen((prev) => !prev);

  // State for checking isAdmin
  //const [adminState, setAdminState] = useState("noadmin")
  const [adminState, setAdminState] = useState("admin")
  
  // Function to update the state
  const updateState = (newValue) => {setAdminState(newValue);}
  
  return (
    <div className="main-container">
      <BrowserRouter>
        <HeaderNavbar
          onToggleCartModal={toggleCartModal}
          onToggleProfileModal={toggleProfileModal}
          onToggleSignInModal={toggleSignInModal}
        />
        <Routes>
          <Route path='/' element={<PageHome onToggleCartModal={toggleCartModal}/>} onToggleSignInModal={toggleSignInModal}/>         
        </Routes>
        <Footer/>
      </BrowserRouter>

        {/* Open Modals */}
          {isCartModalOpen && <Cart />}
          {/* {isProfileModalOpen && (adminState === "noadmin"?<Profile/>:<AdminProfile/>)} */}
          {isProfileModalOpen && <SignInUp />}
          {isSignInModalOpen && <SignInUp />}
      </div>
  )
  }
export default App;
