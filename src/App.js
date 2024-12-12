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

function App() {
  
  return (
    <div className="main-container">
      <BrowserRouter>
        <HeaderNavbar/>
        <Routes>
          <Route path='/' element={<PageHome/>}/>         
        </Routes>
        <Footer/>
      </BrowserRouter>

      {/* Modern UI */}
      {/* <BrowserRouter>
        <ButtonBar/>
        <Routes>
          <Route path='/' element={<CenterSection/>}/>         
        </Routes>
        <NewsBar/>
      </BrowserRouter> */}
      </div>
  )
  }
export default App;
