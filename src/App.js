import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router,Routes, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './Feature/Userslice';
import { auth } from './firebase/firebase';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Register from './Components/auth/Register';
import Intern from './Components/Internships/Intern';
import JobAvl from './Components/Job/JobAvl';
import JobDetail from './Components/Job/JobDetail';
import Interndetail from './Components/Internships/Interndetail';
import Profile from './profile/Profile';
import AdminLogin from './Admin/AdminLogin';
import AdminPanel from './Admin/AdminPanel';
import ViewAllApplication from './Admin/ViewAllApplication';
import PostInternships from './Admin/PostInternships';
import PostJob from './Admin/PostJob';
import DetailApplication from './Applications/DetailApplication';
import UserApplication from './profile/UserApplication';
import UserapplicationDetail from './Applications/DetailApplicationUser';
import LanguageSelector from './Components/LanguageSelector';
import { BackgroundColorProvider, useBackgroundColor } from './BackgroundColorContext';
import './App.css';
import OtpVerification from './Components/OtpVerification'; 

function AppContent() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { backgroundColor } = useBackgroundColor(); // Consume background color context

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            name: authUser.displayName,
            email: authUser.email,
            phoneNumber: authUser.phoneNumber,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
   
    <div className="app" style={{ backgroundColor }}>
      <Navbar />
      <LanguageSelector />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/internship" element={<Intern />} />
        <Route path="/Jobs" element={<JobAvl />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detailjob" element={<JobDetail />} />
        <Route path="/detailInternship" element={<Interndetail />} />
        <Route path="/detailApplication" element={<DetailApplication />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/AdminPanel" element={<AdminPanel />} />
        <Route path="/PostInternship" element={<PostInternships />} />
        <Route path="/PostJob" element={<PostJob />} />
        <Route path="/applications" element={<ViewAllApplication />} />
        <Route path="/UserapplicationDetail" element={<UserapplicationDetail />} />
        <Route path="/userapplication" element={<UserApplication />} />
        <Route exact path="/otp-verification" component={OtpVerification} />
        </Routes>
      <Footer />
    </div>  
      
    
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BackgroundColorProvider>
        <AppContent />
      </BackgroundColorProvider>
    </I18nextProvider>
  );
}

export default App;
