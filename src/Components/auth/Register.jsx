import React, { useState } from 'react';
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Import doc and setDoc
import './register.css';
import { auth, provider, db } from '../../firebase/firebase'; // Import Firestore instance
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Login from './login';

function Register() {
  const { t } = useTranslation();
  const [isStudent, setStudent] = useState(true);
  const [isDivVisible, setDivVisible] = useState(false);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  // Handle Google Sign-in
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        alert('Google Sign-in Successful');
        console.log(res);
        navigate('/profile');
      })
      .catch((err) => {
        alert('Error during Google Sign-in');
        console.log(err);
      });
    toast('Login Success');
  };

  // Handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert('User created successfully');
      console.log(user);

      // Save additional user info to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName: fname,
        lastName: lname,
        email: email,
      });
      alert('User data saved to Firestore');

      toast('Registration Success');
      navigate('/profile');
    } catch (error) {
      console.error("Error signing up:", error);
      alert(`Error: ${error.message}`);
      toast.error(error.message);
    }
  };

  // Toggle between Student and Employee/Company forms
  const setTrueForStudent = () => setStudent(false);
  const setFalseForStudent = () => setStudent(true);

  // Show and hide the login section
  const showLogin = () => {
    navigate('/login');
    alert('Showing Login Form'); // Add alert here
    setDivVisible(true);
  };
  const closeLogin = () => setDivVisible(false);

  return (
    <div className="register-container">
      <div className="form">
        <h1>{t('register.signup')}</h1>
        <p className="para3">{t('register.companiesHiring')}</p>

        {/* Registration Form */}
        <div className="regi">
          <div className="py-6">
            <div className="flex bg-white rounded-lg justify-center shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
              <div className="w-full p-8 lg:w-1/2">
                {/* Google Sign-in Button */}
                <a onClick={handleSignIn} className="flex items-center h-9 justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
                  <div className="px-4 py-3 cursor-pointer">
                    <svg className="h-6 w-6" viewBox="0 0 40 40">
                      {/* Include Google icon path here */}
                      <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107"/>
                      <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00"/>
                      <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50"/>
                      <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2"/>
                    </svg>
                  </div>
                  <h1 className="cursor-pointer px-4 py-3 w-5/6 text-center text-xl text-gray-600 font-bold">{t('register.signinWithGoogle')}</h1>
                </a>

                {/* Or Divider */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="border-b w-1/5 lg:w1/4"></span>
                  <a href="/" className="text-xs text-center text-gray-500 uppercase">{t('register.or')}</a>
                  <span className="border-b w-1/5 lg:w1/4"></span>
                </div>

                {/* Email Input */}
                <div className="mt-4">
                  <label htmlFor="email" className="text-gray-700 text-sm font-bold mb-2">{t('register.email')}</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" id="email" />
                </div>

                {/* Password Input */}
                <div className="mt-4">
                  <label htmlFor="password" className="text-gray-700 text-sm font-bold mb-2">{t('register.password')}</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" id="password" />
                </div>

                {/* First and Last Name Inputs */}
                <div className="mt-4 flex justify-between">
                  <div>
                    <label htmlFor="Fname" className="text-gray-700 text-sm font-bold mb-2">{t('firstName')}</label>
                    <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" id="Fname" />
                  </div>
                  <div className="ml-5">
                    <label htmlFor="Lname" className="text-gray-700 text-sm font-bold mb-2">{t('lastName')}</label>
                    <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" id="Lname" />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <small>{t('register.termsAndConditions')}<span className="text-blue-400"></span></small>

                {/* Sign Up Button */}
                <button onClick={handleSignUp} className="bg-blue-500 h-9 text-white font-bold py-2 mt-4 px-4 w-full rounded hover:bg-blue-600" >{t('register.signup')}</button>

                {/* Already Registered */}
                {/* <div className="mt-4 text-center">
                  {t('register.alreadyRegistered')}{' '}<span className="text-blue-400 cursor-pointer" onClick={showLogin}>{t('register.login')}</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {isDivVisible && <Login />}
      </div>
    </div>
  );
}

export default Register;
