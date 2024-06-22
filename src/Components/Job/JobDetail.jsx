import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next'; // Importing i18n translation hook

import Jobs from '../Data/JobsDataAvl'; // Assuming this is your JobsDataAvl file with dummy data
import { selectUser } from '../../Feature/Userslice';

import './job.css';

function JobDetail() {
  const { t } = useTranslation(); // Translation hook

  const user = useSelector(selectUser);
  const [isDivVisible, setDivVisible] = useState(false);
  const [textarea, setTextarea] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get('q');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://backend-internship.onrender.com/api/job/${id}`);
        const { company, category } = response.data;
        setCompany(company);
        setCategory(category);
        setData(response.data);
      } catch (error) {
        console.log('Error fetching job details:', error);
      }
    };
    fetchData();
  }, [id]);

  const show = () => {
    setDivVisible(true);
  };

  const hide = () => {
    setDivVisible(false);
  };

  const submitApplication = async () => {
    const text = document.getElementById('text');
    if (text.value === '') {
      alert('Fill the mandatory fields');
    } else {
      const bodyJson = {
        coverLetter: textarea,
        category: category,
        company: company,
        user: user,
        Application: id,
      };

      try {
        await axios.post('https://backend-internship.onrender.com/api/application', bodyJson);
        alert('Application submitted successfully!');
        navigate('/Jobs');
      } catch (error) {
        alert('Error submitting application. Please try again later.');
        console.error('Error submitting application:', error);
      }
    }
  };

  return (
    <div className="details-app">
      <h1 className="font-bold text-3xl">{data.title}</h1>
      <div className="m-14 shadow-sm rounded-md border">
        <p className="mb-4 mt-3" id="boxer">
          {' '}
          <i className="bi bi-arrow-up-right text-blue-500"></i> {t('JobDetail.activelyHiring')}
        </p>
        <div className="main-info align-baseline mr-96 mt-7">
          <p className="text-xl font-bold mt-4"> {data.title}</p>
          <p className="text-sm text-slate-300 font-bold">{data.title}</p>
          <p>
            {' '}
            <i className="bi bi-geo-alt-fill"></i> {data.location}
          </p>
        </div>
        <div className="flex tedxt-sm justify-between">
          <p className="mt-3 text-slate-400">
            {' '}
            <i className="bi bi-play-circle-fill"></i> {t('JobDetail.startDate')} <br /> {data.StartDate}
          </p>

          <p className="mt-3 text-slate-400">
            {' '}
            <i className="bi bi-calendar-check-fill"></i> {t('JobDetail.experience')} <br /> {data.Experience}
          </p>

          <p className="mt-3 text-slate-400">
            {' '}
            <i className="bi bi-cash"></i> {t('JobDetail.stipend')} <br /> {data.CTC}
          </p>
        </div>
        <div className="flex">
          <p className="bg-green-100 rounded-md ml-4 text-green-300">
            {' '}
            <i className="bi bi-clock"></i> 12/12/2012
          </p>
        </div>
        <hr />
        <div className="aboutCompany flex justify-start">
          <p className="mt-3 text-xl font-bold text-start"> {t('JobDetail.about')} {data.company}</p>
          <br />
        </div>
        <div className="flex">
          <p className="text-blue-500">
            {' '}
            {t('JobDetail.instagramPage')} <i className="bi bi-arrow-up-right-square"></i>
          </p>
        </div>
        <p className="mt-4"> {data.aboutCompany}</p>
        <div className="about-Job">
          <p className="mt-3 text-xl font-bold text-start">{t('JobDetail.aboutJob')}</p>
          <p>{data.aboutJob}</p>
        </div>
        <p className="text-blue-500 justify-start"> {t('JobDetail.learnBusinessCommunication')}</p>
        <div className="whocan">
          <p className="mt-3 text-xl font-bold text-start">{t('JobDetail.whoCanApply')}</p>
          <p>{data.Whocanapply}</p>
        </div>
        <p className="mt-3 text-xl font-bold text-start">{t('JobDetail.perks')}</p>
        <p>{data.perks}</p>
        <p className="mt-3 text-xl font-bold text-start">{t('JobDetail.additionalInfo')}</p>
        <p>{data.AdditionalInfo}</p>
        <p className="mt-3 text-xl font-bold text-start">{t('JobDetail.numberOfOpening')}</p>
        <p className="text-start">{data.numberOfopning}</p>
        <div className="flex justify-center mt-6 bg-blue-500 w-40 text-center text-white font-bold ">
          <button className="flex justify-center align-middle" onClick={show}>
            {t('JobDetail.apply')}
          </button>
        </div>
      </div>
      {isDivVisible && (
        <>
          <div className="application-page">
            <div className="bg">
              <button className="close2" onClick={hide}>
                <i className="bi-bi-x"></i> {t('JobDetail.close')}
              </button>
              <p>{t('JobDetail.applyForCompany')} {data.company}</p>
              <p className="mt-3 text-sm font-bold text-start mb-3">{data.aboutCompany}</p>
            </div>
            <div className="moreSteps">
              <p className="font-semibold text-xl">{t('JobDetail.yourResume')}</p>
              <small>{t('JobDetail.yourCurrentResume')}</small>
              <p className="mt-5 font-semibold text-xl">{t('JobDetail.coverLetter')}</p>
              <br />
              <p>{t('JobDetail.whyShouldWeHire')}</p>
              <textarea
                name="coverLetter"
                placeholder=""
                id="text"
                value={textarea}
                onChange={(e) => setTextarea(e.target.value)}
              ></textarea>
              <p className="mt-5 font-semibold text-xl">{t('JobDetail.yourAvailability')}</p>
              <p>{t('JobDetail.confirmYourAvailability')}</p>
            </div>
            <div>
              <label>
                <input type="radio" value="Yes, I am available to join immediately" />
                {t('JobDetail.immediatelyAvailable')}
              </label>
            </div>
            <div>
              <label>
                <input type="radio" value="No, I am currently on notice period" />
                {t('JobDetail.noticePeriod')}
              </label>
            </div>
            <div>
              <label>
                <input type="radio" value="No, I will have to serve notice period" />
                {t('JobDetail.serveNoticePeriod')}
              </label>
            </div>
            <div>
              <label>
                <input type="radio" value="Other" />
                {t('JobDetail.other')}{' '}
                <span className="text-slate-500">{t('JobDetail.specifyAvailability')}</span>
              </label>
            </div>
            <p className="mt-5 font-semibold text-xl">
              {t('JobDetail.customResume')}{' '}
              <span className="text-slate-500">{t('JobDetail.customResumeOptional')}</span>
            </p>
            <small className="text-slate-500">{t('JobDetail.employerCanDownload')}</small>

            <div className="submit flex justify-center">
              {user ? (
                <button className="submit-btn" onClick={submitApplication}>
                  {t('JobDetail.submitApplication')}
                </button>
              ) : (
                <Link to={'/register'}>
                  <button className="submit-btn">{t('JobDetail.submitApplication')}</button>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default JobDetail;
