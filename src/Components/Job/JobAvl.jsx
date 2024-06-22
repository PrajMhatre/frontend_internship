import React, { useEffect, useState } from 'react';
import './job.css';
import compLogo from '../../Assets/netflix.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function JobAvl() {
  const { t } = useTranslation();

  const [searchCategory, setSearchCategory] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [jobData, setJobData] = useState([]);
  const [filterJob, setFilterJob] = useState([]);
  const [isDivVisible, setDivVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend-internship.onrender.com/api/job');
        setJobData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const showDiv = () => {
    setDivVisible(true);
  };

  const hideDiv = () => {
    setDivVisible(false);
  };

  const handleCategoryChange = (e) => {
    const categoryValue = e.target.value;
    setSearchCategory(categoryValue);
    filterJobs(categoryValue, searchLocation);
  };

  const handleCategoryLocationChange = (e) => {
    const locationValue = e.target.value;
    setSearchLocation(locationValue);
    filterJobs(searchCategory, locationValue);
  };

  const filterJobs = (category, location) => {
    const filteredData = jobData.filter(
      (job) =>
        job.category.toLowerCase().includes(category.toLowerCase()) &&
        job.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilterJob(filteredData);
  };

  return (
    <>
      <div className='flex internship-filter'>
        <div className='first-int mb-14'>
          <div className='filter-section w-1/6'>
            <p className='text-center'>
              <i className='bi bi-funnel text-blue-400'></i> {t('JobAvl.filter')}
            </p>
            <div className='fill flex flex-col ml-2'>
              <label htmlFor='pro'>{t('JobAvl.profile')}</label>
              <input
                type='text'
                id='pro'
                value={searchCategory}
                onChange={handleCategoryChange}
                className='profile border-2 mr-3 w-full'
                placeholder={t('JobAvl.profileManager')}
              />
              <label htmlFor='loc'>{t('JobAvl.location')}</label>
              <input
                type='text'
                id='loc'
                value={searchLocation}
                onChange={handleCategoryLocationChange}
                className='location border-2 -ml-8 w-full'
                placeholder={t('JobAvl.mumbai')}
              />
            </div>
            <div className='preferences mt-8 flex flex-col'>
              <div className='flex mt-3 ml-3 mr-3'>
                <input type='checkbox' name='wfh' id='whf' className='mr-2 ml-3' />
                <label htmlFor='wfh'>{t('JobAvl.workFromHome')}</label>
              </div>
              <div className='flex mt-3 ml-3 mr-3'>
                <input type='checkbox' name='pt' id='whf' className='mr-2 ml-3' />
                <label htmlFor='pt'>{t('JobAvl.partTime')}</label>
              </div>
              <p>{t('JobAvl.annualSalaryInLakhs')}</p>
              <input type='range' name='' id='' />
              <p className='mt-2 ml-3 mr-3'>0 2K &nbsp; 4k &nbsp; 6K &nbsp; 8k &nbsp; 10K</p>
            </div>

            <p className='mt-5 text-blue-400'>
              {t('JobAvl.viewMoreFilters')} <i className='bi bi-chevron-down'></i>
            </p>
            <span className='justify-end flex text-blue-400 mr-3'>{t('JobAvl.clearAll')}</span>
          </div>
          <div className='search-2'>
            <div className='search-container'>
              <label htmlFor='ex'>{t('JobAvl.experience')}</label>
              <input type='text' id='ex' placeholder={t('JobAvl.exampleExperience')} />
              <div className='search-icon'>
                <i className='bi bi-search'></i>
              </div>
            </div>
          </div>
        </div>

        <div className='all-internships'>
          <div className='show show2 flex justify-center'>
            <p id='filter-ico' className='filterico text-center'>
              {t('JobAvl.filter')} <i className='bi bi-funnel text-blue-400' onClick={showDiv}></i>{' '}
            </p>
          </div>
          <p className='head font-bold text-lg text-center'>{filterJob.length} {t('JobAvl.totalJobs')}</p>
          {filterJob.map((data, index) => (
            <div className='shadow-lg rounded-lg bg-white m-7' id='display' key={index}>
              <div className='m-4'>
                <p className='mb-4 mt-3' id='boxer'>
                  <i className='bi bi-arrow-up-right text-blue-500'></i> {t('JobAvl.activelyHiring')}
                </p>
                <div className='flex justify-end'>
                  <img src={compLogo} className='w-14' alt='' />
                </div>
                <div className='all-ele'>
                  <div className='text-lg text-black m-2 mt-7 font-bold'>{data.title}</div>
                  <div className='info'>
                    <p className='text-sm text-slate-300 font-bold'>{data.company}</p>
                    <p className=' mt-2'>{data.location}</p>
                  </div>
                  <div className='flex text-sm justify-between'>
                    <p className='mt-3'>
                      <i className='bi bi-play-circle-fill'></i> {t('JobAvl.startDate')} <br /> {data.startDate}
                    </p>
                    <p className='mt-3'>
                      <i className='bi bi-calendar-check-fill'></i> {t('JobAvl.experience')} <br /> {data.experience}
                    </p>
                    <p className='mt-3'>
                      <i className='bi bi-cash'></i> {t('JobAvl.annualSalaryInLakhs')} <br /> {data.CTC}
                    </p>
                  </div>
                </div>
                <span className='bg-slate-200 text-slate-400 w-20 rounded-sm text-center'>Job</span>
                <br />
                <span>
                  <i className='bi bi-stopwatch text-green-300'></i> 23/11/2065
                </span>
                <div className='flex justify-end' id='hr'>
                  <Link className='mt-10' to={`/detailjob?q=${data._id}`}>
                    <button id='viewButtons' className='bg-transparent text-blue-500'>
                      {t('JobAvl.viewInDetails')}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isDivVisible && (
        <>
          <div className='first2-int mb-14'>
            <div className='filter-section w-1/6'>
              <button id='close-btn' onClick={hideDiv}>
                <i className=' text-3xl bi bi-x'></i>
              </button>
              <p className='text-center'>
                <i className='bi bi-funnel text-blue-400'></i> {t('JobAvl.filter')}
              </p>
              <div className='fill flex flex-col ml-2'>
                <label htmlFor='pro'>{t('JobAvl.profile')}</label>
                <input
                  type='text'
                  id='pro'
                  value={searchCategory}
                  onChange={handleCategoryChange}
                  className='profile border-2 mr-3 w-full'
                  placeholder={t('JobAvl.profileManager')}
                />
                <label htmlFor='loc'>{t('JobAvl.location')}</label>
                <input
                  type='text'
                  id='loc'
                  value={searchLocation}
                  onChange={handleCategoryLocationChange}
                  className='location border-2 mt-10 -ml-8 w-full'
                  placeholder={t('JobAvl.mumbai')}
                />
              </div>
              <div className='preferences mt-8 flex flex-col'>
                <div className='flex mt-3 ml-3 mr-3'>
                  <input type='checkbox' name='wfh' id='whf' className='mr-2 ml-3' />
                  <label htmlFor='wfh'>{t('JobAvl.workFromHome')}</label>
                </div>
                <div className='flex mt-3 ml-3 mr-3'>
                  <input type='checkbox' name='pt' id='whf' className='mr-2 ml-3' />
                  <label htmlFor='pt'>{t('JobAvl.partTime')}</label>
                </div>
                <p>{t('JobAvl.annualSalaryInLakhs')}</p>
                <input type='range' name='' id='' />
                <p className='mt-2 ml-3 mr-3'>0 2K &nbsp; 4k &nbsp; 6K &nbsp; 8k &nbsp; 10K</p>
              </div>

              <p className= ' mt-5 text-blue-400'>{t('JobAvl.viewMoreFilters')} <i class="bi bi-chevron-down"></i></p>
              <span className='justify-end flex text-blue-400 mr-3'>{t('JobAvl.clearAll')}</span>
              </div>
              <div className="search-2"><div className="search-container">
                <label htmlFor="ex ">{t('JobAvl.Experience')}</label>
                <input type="text" id='ex' placeholder='eg. 0-1 year' />
                <div className="search-icon">
                <i class="bi bi-search"></i>
                </div>
                </div></div>
                </div>
                  </>
  )
}
</>
  )
}
export default JobAvl
