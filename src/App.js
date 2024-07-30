import './App.css';
import AddNurse from './components/addnurse/AddNurse';
import AddTests from './components/addtests/AddTests';
import LabTests from './components/labtests/LabTests';
import MainContent from './components/maincontent/MainContent';
import MyBooking from './components/mybooking/MyBooking';
import NotFound from './components/notfound/NotFound';
import Nurses from './components/nurses/Nurses';
import Profile from './components/profile/Profile';
import SignIn from './components/signin/SignIn';
import SignUp from './components/signup/SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <div className="App">
  
          <Routes>
            <Route index element={<MainContent />} /> 
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addnurses" element={<AddNurse />} />
            <Route path="/viewnurses" element={<Nurses />} />
            <Route path="/addtests" element={<AddTests />} />
            <Route path="/viewtests" element={<LabTests />} />
            <Route path="/mybookings" element={<MyBooking />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
