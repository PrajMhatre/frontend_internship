import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../Feature/Userslice';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './Profile.css'; // Add this import for the new CSS

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
        <div className="profile-container">
            <div className="profile-card">
                <div className="photo-wrapper">
                    <img src={user.photo} alt="" className="profile-photo" />
                </div>
                <div className="profile-info">
                    <h3 className="profile-name">{user.name}</h3>
                    <div className="profile-details">
                        <h3 className="profile-label">{t('profile.uid')}</h3>
                        <h3 className="profile-value">{user.uid}</h3>
                    </div>
                    <div className="profile-details">
                        <h3 className="profile-label">{t('profile.email')}</h3>
                        <h3 className="profile-value">{user.email}</h3>
                    </div>
                    <div className="profile-action">
                        <Link to="/userapplication" className="profile-button">
                            {t('profile.viewApplications')}
                        </Link>
                    </div>
                    <div className="login-history">
                        <h3 className="profile-label">{t('profile.loginHistory')}</h3>
                        {loginHistory.length > 0 ? (
                            <ul>
                                {loginHistory.map((login, index) => (
                                    <li key={index} className="login-item">
                                        {login.timestamp} - {login.ip} - {login.device} - {login.os} - {login.browser}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="no-login-history">{t('profile.noLoginHistory')}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
