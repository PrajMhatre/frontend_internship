import React, { useState, useEffect, useRef } from 'react';
import logo from '../../Assets/logo.png';
import { Link } from 'react-router-dom';
import "./navbar.css";
import Sidebar from './Sidebar'; // Ensure Sidebar is imported
import { signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';
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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginFormRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (loginFormRef.current && !loginFormRef.current.contains(event.target)) {
                setDivVisibleForlogin(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const loginFunction = () => {
        signInWithPopup(auth, provider).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
        setDivVisibleForlogin(false);
    };

    const loginWithEmailPassword = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                setEmail('');
                setPassword('');
            })
            .catch((error) => {
                console.error(error);
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
        setDivVisibleForJob(false);
        document.getElementById("ico").className = "bi bi-caret-up-fill";
        setDivVisibleForintern(true);
    };

    const hideInternShips = () => {
        document.getElementById("ico").className = "bi bi-caret-down-fill";
        setDivVisibleForintern(false);
    };

    const showJobs = () => {
        setDivVisibleForintern(false);
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
                <ul className="navbar-container">
                    <div className="img">
                        <Link to={"/"}>
                            <img src={logo} alt="Logo" />
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
            <div className='main' onMouseEnter={hideInternShips} onMouseLeave={hideJobs}>
                {
                    isDivVisibleForlogin && (
                        <div className="login-form-container" ref={loginFormRef}>
                            <div className="py-6">
                                <div className="flex bg-white rounded-lg justify-center overflow-hidden mx-auto">
                                    <div className="w-full p-8">
                                        <h2>{t('navbar.login')}</h2>
                                        <button onClick={loginFunction} className='flex items-center h-9 justify-center mt-4 text-white bg-slate-900 rounded-md tracking-wide font-semibold cursor-pointer'>
                                            <i className="bi bi-google mr-2"></i> {t('navbar.signInWithGoogle')}
                                        </button>
                                        <div className="separator">Or</div>
                                        <form onSubmit={loginWithEmailPassword}>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-600">{t('navbar.emailAddress')}</label>
                                                <input
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    type="email"
                                                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md"
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <label className="block mb-2 text-sm font-medium text-gray-600">{t('navbar.password')}</label>
                                                <input
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    type="password"
                                                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md"
                                                />
                                            </div>
                                            <button type="submit" className="w-full px-4 py-2 mt-6 text-white bg-slate-900 rounded-md">
                                                {t('navbar.signin')}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <Sidebar /> {/* Add Sidebar component && no need*/}
        </div>
    );
}

export default Navbar;
