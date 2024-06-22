import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook for i18n

function Job() {
    const { t } = useTranslation(); // Specify 'job' namespace for translations

    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("Big Brands");
    const [JobData, setJobData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://backend-internship.onrender.com/api/job`);
                setJobData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleJob = (direction) => {
        const contianer = document.getElementById("container3");
        const step = 100;
        if (direction === 'left') {
            setCurrentSlide((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : 0));
        } else {
            setCurrentSlide((prevSlide) => (prevSlide < 3 ? prevSlide + 1 : 3));
        }
        sideScrollJob(contianer, direction, 25, step, 10);
    }

    const filterJobs = JobData.filter((item) =>
        !selectedCategory || item.category === selectedCategory
    );

    return (
        <div>
            <div className="info-intern mt-12">
                <div className="categories flex flex-wrap mt-14">
                    <p>{t('job.popularCategories')}</p>
                    <span className={`category mr-4 ml-6 ${selectedCategory === 'Big Brands' ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory('Big Brands')}>{t('job.bigBrands')}</span>
                    <span className={`category mr-4 ml-6 ${selectedCategory === "Work From Home" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("Work From Home")}>{t('job.workFromHome')}</span>
                    <span className={`category mr-4 ml-6 ${selectedCategory === "Part-time" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("Part-time")}>{t('job.partTime')}</span>
                    <span className={`category mr-4 ml-6 ${selectedCategory === "MBA" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("MBA")}>{t('job.mba')}</span>
                    <span className={`category mr-4 ml-6 ${selectedCategory === "Engineering" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("Engineering")}>{t('job.engineering')}</span>
                    <span className={`category mr-4 ml-6 ${selectedCategory === "Media" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("Media")}>{t('job.media')}</span>
                    <span className={`category mr-4 ml-6 ${selectedCategory === "Design" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("Design")}>{t('job.design')}</span>
                    <span className={`category mr-4 ml-6 ${selectedCategory === "Data Science" ? 'bg-blue-500 text-white' : ""}`} onClick={() => setSelectedCategory("Data Science")}>{t('job.dataScience')}</span>
                </div>
            </div>
            <div className="internships" id='container3'>
                <div className="internShip-Info flex">
                    {filterJobs.map((data, index) => (
                        <div className="int-1 mt-6" key={index}>
                            <p className='mb-4 mt-3' id='boxer'> <i className='bi bi-arrow-up-right text-blue-500' ></i> {t('job.companiesHiring')}</p>
                            <p>{data.title}</p>
                            <small className='text-slate-400 text-sm'>{data.company}</small>
                            <hr className='mt-5' />
                            <p className='mt-3' ><i className="bi bi-geo-alt-fill"></i> {data.location}  </p>
                            <p className='mt-1'> <i className="bi bi-cash-stack"></i> {data.CTC}</p>
                            <p className='mt-1'><i className="bi bi-calendar-fill"></i> {data.Experience}</p>
                            <div className='more flex justify-between mt-6'>
                                <span className='bg-slate-200 text-slate-400 w-20 rounded-sm text-center'>{t('job.job')}</span>
                                <Link to={`detailjob?q=${data._id}`}>
                                    <span className='text-blue-500 mr-2'>
                                        {t('job.register')} <i className="bi bi-chevron-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex BUttons mt-9">
                <button className='back' onClick={() => handleJob('left')}> <i className='bi bi-chevron-left' id='sideBack'></i></button>
                <button className="next" onClick={() => handleJob('right')}> <i className='bi bi-chevron-right' id='slide'></i></button>
            </div>
        </div>
    );
}

export default Job;

function sideScrollJob(element, direction, speed, distance, step) {
    let scrollAmount = 0;
    const slideTimer = setInterval(function () {
        if (direction === 'left') {
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
            window.clearInterval(slideTimer);
        }
    }, speed);
}
