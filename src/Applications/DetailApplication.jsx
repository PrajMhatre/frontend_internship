import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function DetailApplication() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("a");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://backend-internship.onrender.com/api/application/${id}`);
        setData([response.data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleAcceptAndReject = async (id, action) => {
    try {
      const response = await axios.put(`https://backend-internship.onrender.com/api/application/${id}`, { action });
      const updatedApplication = data.map(app => (app._id === id ? response.data.data : app));
      setData(updatedApplication);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {data.map((application) => (
        <section key={application._id} className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img alt="company" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover rounded" src={application.user.photo} />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">{t('detailApplication.companyName')}</h2>
                <h1 className="text-gray-900 font-bold title-font mb-1 -mt-8">{application.company}</h1>
                <h2>{t('detailApplication.coverLetter')}</h2>
                <p className="leading-relaxed font-bold -mt-8">{application.coverLetter}</p>
                <div className="flex mt-6 pb-5 border-b-2 border-gray-100 mb-5">
                  <span className="mr-3">{t('detailApplication.applicationDate')}</span><br />
                  <p className="font-bold">{new Date(application.createAt).toLocaleDateString()}</p>
                </div>
                <h4 className="mt-9">{t('detailApplication.appliedBy')}</h4>
                <p className="font-bold -mt-8">{application.user.name}</p>
                <div className="flex mt-24 justify-around">
                  <button className="bg-blue-700 text-green-400 w-24 font-bold" onClick={() => handleAcceptAndReject(application._id, "accepted")}>{t('detailApplication.accept')}</button>
                  <button className="bg-blue-700 text-red-600 w-24 font-bold" onClick={() => handleAcceptAndReject(application._id, "rejected")}>{t('detailApplication.reject')}</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default DetailApplication;
