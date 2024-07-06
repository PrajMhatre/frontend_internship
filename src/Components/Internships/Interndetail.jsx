import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Feature/Userslice';
import "./detail.css";
import axios from 'axios';

function Interndetail() {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const [isDivVisible, setDivVisible] = useState(false);
  const [textare, setTextare] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");

  const show = () => {
    setDivVisible(true);
  }

  const hide = () => {
    setDivVisible(false);
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://backend-internship.onrender.com/api/internship/${id}`);
      setData(response.data);
      const { company, category } = response.data;
      setCompany(company);
      setCategory(category);
    }
    fetchData();
  }, [id]);

  const submitApplication = async () => {
    const text = document.getElementById("text");
    if (text.value === "") {
      alert(t('apply.fillMandatoryFields'));
    } else {
      const bodyJson = {
        coverLetter: textare,
        category: category,
        company: company,
        user: user,
        Application: id
      }

      try {
        await axios.post("https://backend-internship.onrender.com/api/application", bodyJson);
        alert(t('apply.done'));
        navigate("/Jobs");
      } catch (error) {
        alert(t('apply.errorOccurred'));
      }
    }
  }

  return (
    <div>
      <div className="details-app">
        <>
          <h1 className='font-bold text-3xl'>{data.title}</h1>
          <div className="m-14 shadow-sm rounded-md border">
            <p className='mb-4 mt-3' id='boxer'> <i className='bi bi-arrow-up-right text-blue-500' ></i> {t('interndetail.activelyHiring')}</p>
            <div className="main-info align-baseline mr-96 mt-7">
              <p className='text-xl font-bold mt-4'> {data.title}</p>
              <p className='text-sm text-slate-300 font-bold'>{data.title}</p>
              <p> <i className="bi bi-geo-alt-fill"></i> {data.location}</p>
            </div>
            <div className="flex text-sm justify-between">
              <p className='mt-3 text-slate-400'> <i className="bi bi-play-circle-fill"></i> {t('interndetail.startDate')} <br />  {data.StartDate}</p>
              <p className='mt-3 text-slate-400' > <i className="bi bi-calendar-check-fill"></i> {t('interndetail.duration')} <br /> {data.Duration}</p>
              <p className='mt-3 text-slate-400'> <i className="bi bi-cash"></i> {t('interndetail.stipend')} <br /> {data.stipend}</p>
            </div>
            <div className="flex">
              <p className='bg-green-100 rounded-md ml-4 text-green-300'> <i className="bi bi-clock"></i> 12/12/2012</p>
            </div>
            <hr />
            <div className="aboutCompany flex justify-start">
              <p className='mt-3 text-xl font-bold text-start'> {t('interndetail.about')} {data.company}</p>
            </div>
            <div className="flex">
              <p className='text-blue-500'> {t('interndetail.instagramPage')} <i className='bi bi-arrow-up-right-square'></i></p>
            </div>
            <p className='mt-4'> {data.aboutCompany}</p>
            <div className="about-Job">
              <p className='mt-3 text-xl font-bold text-start'>{t('interndetail.aboutJob')}</p>
              <p>{data.aboutJob}</p>
            </div>
            <p className='text-blue-500 justify-start'>{t('interndetail.learnBusinessCommunication')}</p>
            <div className="whocan">
              <p className='mt-3 text-xl font-bold text-start'>{t('interndetail.whoCanApply')}</p>
              <p>{data.Whocanapply}</p>
            </div>
            <p className='mt-3 text-xl font-bold text-start'>{t('interndetail.perks')}</p>
            <p>{data.perks}</p>
            <p className='mt-3 text-xl font-bold text-start'>{t('interndetail.additionalInformation')}</p>
            <p>{data.AdditionalInfo}</p>
            <p className='mt-3 text-xl font-bold text-start'>{t('interndetail.numberOfOpening')}</p>
            <p className='text-start'>{data.numberOfopning}</p>
            <div className='flex justify-center mt-6 bg-blue-500 w-40 text-center text-white font-bold '>
              <button className='flex justify-center align-middle' onClick={show}>{t('interndetail.apply')}</button>
            </div>
          </div>
        </>
      </div>
      {isDivVisible && (
        <>
          <div className="application-page">
  <div className="bg">
    <button className="close2" onClick={hide}>
      <i className="bi-bi-x"></i> {t('interndetail.close')}
    </button>
    <p>{t('interndetail.applyFor')} {data.company}</p>
    <p className="mt-3 text-sm font-bold text-start mb-3">{data.aboutCompany}</p>
  </div>
  <div className="moreSteps">
    
    <p className="mt-5 font-semibold text-xl">{t('interndetail.coverLetter')}</p>
    <br />
    <p>{t('interndetail.whyShouldWeHire')}</p>
    <textarea
      name="coverLetter"
      placeholder=""
      id="text"
      value={textare}
      onChange={(e) => setTextare(e.target.value)}
    ></textarea>
    <p className="mt-5 font-semibold text-xl">{t('interndetail.availability')}</p>
    <p>{t('interndetail.confirmAvailability')}</p>
  </div>
  <div>
    <label>
      <input
        type="radio"
        value={t('interndetail.immediatelyAvailable')}
        name="availabilityOption"
      />
      {t('interndetail.immediatelyAvailable')}
    </label>
  </div>
  <div>
    <label>
      <input
        type="radio"
        value={t('interndetail.noticePeriod')}
        name="availabilityOption"
      />
      {t('interndetail.noticePeriod')}
    </label>
  </div>
  <div>
    <label>
      <input
        type="radio"
        value={t('interndetail.serveNoticePeriod')}
        name="availabilityOption"
      />
      {t('interndetail.serveNoticePeriod')}
    </label>
  </div>
  <div>
    <label>
      <input
        type="radio"
        value={t('interndetail.other')}
        name="availabilityOption"
      />
      {t('interndetail.other')}{' '}
      <span className="text-slate-500">
        {t('interndetail.specifyAvailability')}{' '}
      </span>
    </label>
  </div>
  
  <small className="text-slate-500">{t('interndetail.employerDownload')}</small>
  <div className="submit flex justify-center">
    {user ? (
      <button className="submit-btn" onClick={submitApplication}>
        {t('interndetail.submitApplication')}
      </button>
    ) : (
      <Link to={'/register'}>
        <button className="submit-btn">{t('interndetail.submitApplication')}</button>
      </Link>
    )}
  </div>
</div>
        </>
      )}
    </div>
  )
}

export default Interndetail;
