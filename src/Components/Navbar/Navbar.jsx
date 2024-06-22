import React, { useState } from 'react';
import logo from '../../Assets/logo.png';
import { Link } from 'react-router-dom';
import "./navbar.css";
import Sidebar from './Sidebar';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../../firebase/firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Feature/Userslice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Navbar() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [isDivVisibleForintern, setDivVisibleForintern] = useState(false);
    const [isDivVisibleForJob, setDivVisibleForJob] = useState(false);
    const [isDivVisibleForlogin, setDivVisibleForlogin] = useState(false);
    const [isDivVisibleForProfile, setDivVisibleProfile] = useState(false);
    const [isStudent, setStudent] = useState(true);
    

    const loginFunction = () => {
        signInWithPopup(auth, provider).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
        setDivVisibleForlogin(false);
    };

    const showLogin = () => {
        setDivVisibleForlogin(true);
    };

    const closeLogin = () => {
        setDivVisibleForlogin(false);
    };

    const setTrueForStudent = () => {
        setStudent(false);
    };

    const setFalseForStudent = () => {
        setStudent(true);
    };

    const showtheProfile = () => {
        setDivVisibleProfile(true);
        document.getElementById("ico3").className = "bi bi-caret-up-fill";
    };

    const hidetheProfile = () => {
        document.getElementById("ico3").className = "bi bi-caret-down-fill";
        setDivVisibleProfile(false);
    };

    const showInternShips = () => {
        setDivVisibleForJob(false); // Close jobs dropdown if open
        document.getElementById("ico").className = "bi bi-caret-up-fill";
        setDivVisibleForintern(true);
    };

    const hideInternShips = () => {
        document.getElementById("ico").className = "bi bi-caret-down-fill";
        setDivVisibleForintern(false);
    };

    const showJobs = () => {
        setDivVisibleForintern(false); // Close internships dropdown if open
        document.getElementById("ico2").className = "bi bi-caret-up-fill";
        setDivVisibleForJob(true);
    };

    const hideJobs = () => {
        document.getElementById("ico2").className = "bi bi-caret-down-fill";
        setDivVisibleForJob(false);
    };

    const logoutFunction = () => {
        signOut(auth);
        navigate("/");
    };

    

    return (
        <div>
            <nav className='nav1'>
                <ul>
                    <div className="img">
                        <Link to={"/"}>
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                    <div className="elem">
                        <Link to={"/Internship"}>
                            <p id='int' className='' onMouseEnter={showInternShips} onMouseLeave={hideInternShips}>
                                {t('navbar.internships')} <i id='ico' className="bi bi-caret-down-fill"></i>
                            </p>
                        </Link>
                        <Link to={"/Jobs"}>
                            <p onMouseEnter={showJobs} onMouseLeave={hideJobs}>
                                {t('navbar.jobs')} <i id='ico2' className="bi bi-caret-down-fill"></i>
                            </p>
                        </Link>
                    </div>
                    <div className="search">
                        <i className="bi bi-search"></i>
                        <input type="text" placeholder={t('navbar.searchPlaceholder')} />
                    </div>
                    {
                        user ? (
                            
                            <div className='Profile'>
                                <Link to={"/profile"}>
                                    <img src={user?.photo} alt="Profile" onMouseEnter={showtheProfile} className='rounded-full w-12' id='picpro' />
                                    <i className='bi bi-caret-up-fill' id='ico3' onClick={hidetheProfile}></i>
                                </Link>
                            </div>
                            
                        ) : (
                            
                            <div className="auth">
                                <button className='btn1' onClick={showLogin}>{t('navbar.login')}</button>
                                <button className='btn2'>
                                    <Link to="/register">{t('navbar.register')}</Link>
                                </button>
                            </div>
                            
                        )
                    }
                    {
                        user ? (
                            
                            <button className='bt-log' id='bt' onClick={logoutFunction}>
                                {t('navbar.logout')} <i className="bi bi-box-arrow-right"></i>
                            </button>
                            
                        ) : (
                            <>
                                <div className="flex mt-7 hire">
                                    {t('navbar.hireTalent')}
                                </div>
                                <div className="admin">
                                    <Link to={"/adminLogin"}>
                                        <button>{t('navbar.admin')}</button>
                                    </Link>
                                </div>
                            </>
                        )
                    }
                </ul>
            </nav>

            {
                isDivVisibleForintern && (
                    <div className="profile-dropdown-2">
                        <div className="left-section">
                            <p>{t('navbar.topLocations')}</p>
                            <p>{t('navbar.profileLabel')}</p>
                            <p>{t('navbar.topCategory')}</p>
                            <p>{t('navbar.exploreInternships')}</p>
                        </div>
                        <div className="line flex bg-slate-400"></div>
                        <div className="right-section">
                            <p>{t('navbar.internAtIndia')}</p>
                            <p>{t('navbar.internAtIndia')}</p>
                            <p>{t('navbar.internAtIndia')}</p>
                            <p>{t('navbar.internAtIndia')}</p>
                            <p>{t('navbar.internAtIndia')}</p>
                        </div>
                    </div>
                )
            }
            {
                isDivVisibleForJob && (
                    <div className="profile-dropdown-1">
                        <div className="left-section">
                        <p>{t('navbar.topLocations')}</p>
                            <p>{t('navbar.profileLabel')}</p>
                            <p>{t('navbar.topCategory')}</p>
                            <p>{t('navbar.exploreJobs')}</p>
                        </div>
                        <div className="line flex bg-slate-400"></div>
                        <div className="right-section">
                            <p>{t('navbar.internAtIndia')}</p>
                            <p>{t('navbar.internAtIndia')}</p>
                            <p>{t('navbar.internAtIndia')}</p>
                            <p>{t('navbar.internAtIndia')}</p>
                            <p>{t('navbar.internAtIndia')}</p>
                        </div>
                    </div>
                )
            }
            
            <div className="login">
            {
                    isDivVisibleForlogin && (
                        <>
                            <button id='cross' onClick={closeLogin}><i className="bi bi-x"></i></button>
                            <h5 id='state' className='mb-4 justify-center text-center'>
                                <span id='Sign-in' style={{ cursor: "pointer" }} className={`auth-tab ${isStudent ? 'active' : ""}`} onClick={setFalseForStudent}>
                                {t('navbar.student')}
                                </span>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <span id='join-in' style={{ cursor: "pointer" }} className={`auth-tab ${isStudent ? 'active' : ""}`} onClick={setTrueForStudent}>
                                {t('navbar.employeeAndTP')}
                                </span>
                            </h5>
                            {isStudent ? (
                                <div className="py-6">
                                    <div className="flex bg-white rounded-lg justify-center overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                                        <div className="w-full p-8 lg:w-1/2">
                                            <p onClick={loginFunction} className='flex items-center h-9 justify-center mt-4 text-white bg-slate-100 rounded-lg hover:bg-gray-100'>
                                                <div className="px-4 py-3">
                                                    <svg className="h-6 w-6" viewBox="0 0 40 40">
                                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33334 10.7958 3.33334 20C3.33334 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.9783 36.5625 17.9783 36.3425 16.7358Z" fill="#4285F4" />
                                                        <path d="M4.91667 12.7458L10.6342 16.5642C12.2217 12.56 15.7983 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C14.1475 3.33333 9.02167 6.73583 6.73417 11.5625L4.91667 12.7458Z" fill="#EA4335" />
                                                        <path d="M20 36.6667C24.3058 36.6667 28.2233 35.0725 31.1483 32.5017L26.6842 28.135C25.0025 29.3642 22.8125 30 20 30C15.6683 30 11.9867 27.2317 10.6 23.3725L4.9175 27.315C7.17167 32.2358 12.1583 36.6667 20 36.6667Z" fill="#34A853" />
                                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.8217 24.9625 27.7283 26.3667 26.1983 27.315L26.6842 27.7983L31.1483 32.5017C30.8483 32.7683 36.6667 28.3333 36.6667 20C36.6667 18.9783 36.5625 17.9783 36.3425 16.7358Z" fill="#4285F4" />
                                                    </svg>
                                                </div>
                                                <h1 className="border w-40 h-9 text-black text-lg">{t('navbar.signInWithGoogle')}</h1>
                                            </p>
                                        </div>
                                        <div className="w-full py-6 px-8 lg:w-1/2">
                                        <form action="#">
                                            <div className="mt-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">{t('navbar.emailAddress')}</label>
                                                <input className="bg-gray-200 text-black h-10 rounded-lg w-full mt-2 border-none focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none" type="email" />
                                            </div>
                                            <div className="mt-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">{t('navbar.password')}</label>
                                                <input className="bg-gray-200 text-black h-10 rounded-lg w-full mt-2 border-none focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none" type="password" />
                                            </div>
                                            <div className="mt-8">
                                                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 focus:outline-none w-full">Login</button>
                                            </div>
                                        </form>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-6">
                                    <div className="flex bg-white rounded-lg justify-center overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                                        <div className="w-full p-8 lg:w-1/2">
                                            <p onClick={loginFunction} className='flex items-center h-9 justify-center mt-4 text-white bg-slate-100 rounded-lg hover:bg-gray-100'>
                                                <div className="px-4 py-3">
                                                    <svg className="h-6 w-6" viewBox="0 0 40 40">
                                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33334 10.7958 3.33334 20C3.33334 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.9783 36.5625 17.9783 36.3425 16.7358Z" fill="#4285F4" />
                                                        <path d="M4.91667 12.7458L10.6342 16.5642C12.2217 12.56 15.7983 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C14.1475 3.33333 9.02167 6.73583 6.73417 11.5625L4.91667 12.7458Z" fill="#EA4335" />
                                                        <path d="M20 36.6667C24.3058 36.6667 28.2233 35.0725 31.1483 32.5017L26.6842 28.135C25.0025 29.3642 22.8125 30 20 30C15.6683 30 11.9867 27.2317 10.6 23.3725L4.9175 27.315C7.17167 32.2358 12.1583 36.6667 20 36.6667Z" fill="#34A853" />
                                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.8217 24.9625 27.7283 26.3667 26.1983 27.315L26.6842 27.7983L31.1483 32.5017C30.8483 32.7683 36.6667 28.3333 36.6667 20C36.6667 18.9783 36.5625 17.9783 36.3425 16.7358Z" fill="#4285F4" />
                                                    </svg>
                                                </div>
                                                <h1 className="px-4 py-3 w-5/6 text-black font-bold text-center">{t('navbar.signInWithGoogle')}</h1>
                                            </p>
                                        </div>
                                        <div className="w-full py-6 px-8 lg:w-1/2">
                                        <form action="#">
                                            <div className="mt-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">{t('navbar.emailAddress')}</label>
                                                <input className="bg-gray-200 text-black h-10 rounded-lg w-full mt-2 border-none focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none" type="email" />
                                            </div>
                                            <div className="mt-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">{t('navbar.password')}</label>
                                                <input className="bg-gray-200 text-black h-10 rounded-lg w-full mt-2 border-none focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none" type="password" />
                                            </div>
                                            <div className="mt-8">
                                                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 focus:outline-none w-full">Login</button>
                                            </div>
                                        </form>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )
                }
            </div>
            <Sidebar />
        </div>
    );
}

export default Navbar;
