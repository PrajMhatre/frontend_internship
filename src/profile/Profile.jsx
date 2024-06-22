import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../Feature/Userslice';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function Profile() {
    const { t } = useTranslation();
    const user = useSelector(selectUser);
    const [loginHistory, setLoginHistory] = useState([]);

    useEffect(() => {
        const fetchLoginHistory = async () => {
            try {
                const response = await axios.get(`https://backend-internship.onrender.com/api/user/${user._id}/loginHistory`);
                setLoginHistory(response.data.loginHistory);
            } catch (error) {
                console.error('Error fetching login history:', error);
            }
        };

        fetchLoginHistory();
    }, [user._id]);

    return (
        <div>
            <div className="flex items-center mt-9 mb-4 justify-center">
                <div className='max-w-xs'>
                    <div className='bg-white shadow-lg rounded-lg py-3'>
                        <div className="photo-wrapper p-2">
                            <img src={user.photo} alt="" className='w-32 h-32 rounded-full mx-auto' />
                        </div>
                        <div className='p-2'>
                            <h3 className='text-center text-xl text-gray-900'>{user.name}</h3>
                        </div>
                        <div className='text-xs my-3'>
                            <h3 className='text-xl font-bold'>{t('profile.uid')}</h3>
                            <h3 className='text-center text-lg text-gray-900'>{user.uid}</h3>
                        </div>
                        <div>
                            <h3 className='text-xl font-bold'>{t('profile.email')}</h3>
                            <h3 className='text-center text-xl text-gray-900'>{user.email}</h3>
                        </div>
                        <div className='flex justify-center mt-3'>
                            <Link to="/userapplication" className="relative items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-white group">
                                <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">{t('profile.viewApplications')}</span>
                            </Link>
                        </div>
                        <div className='p-2'>
                            <h3 className='text-xl font-bold'>{t('profile.loginHistory')}</h3>
                            {loginHistory.length > 0 ? (
                                <ul>
                                    {loginHistory.map((login, index) => (
                                        <li key={index} className='text-sm text-gray-700'>
                                            {login.timestamp} - {login.ip} - {login.device} - {login.os} - {login.browser}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className='text-sm text-gray-500'>{t('profile.noLoginHistory')}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
