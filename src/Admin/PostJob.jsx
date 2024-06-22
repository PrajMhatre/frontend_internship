import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function PostJob() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [aboutCompany, setAboutCompany] = useState('');
  const [aboutInternship, setAboutInternship] = useState('');
  const [whoCanApply, setWhoCanApply] = useState('');
  const [perks, setPerks] = useState('');
  const [numberOfOpening, setNumberOfOpening] = useState('');
  const [CTC, setCTC] = useState('');
  const [startDate, setStartDate] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const sendData = (e) => {
    e.preventDefault();

    if (
      title === '' ||
      companyName === '' ||
      location === '' ||
      category === '' ||
      aboutCompany === '' ||
      aboutInternship === '' ||
      whoCanApply === '' ||
      perks === '' ||
      numberOfOpening === '' ||
      CTC === '' ||
      startDate === '' ||
      additionalInfo === ''
    ) {
      alert(t('postJob.fillTheBlanks'));
    } else {
      const bodyJson = {
        title,
        company: companyName,
        location,
        category,
        aboutCompany,
        aboutInternship,
        Whocanapply: whoCanApply,
        perks,
        numberOfopning: numberOfOpening,
        CTC,
        StartDate: startDate,
        AdditionalInfo: additionalInfo,
      };

      axios
        .post('https://backend-internship.onrender.com/api/jobs', bodyJson)
        .then((res) => {
          console.log(res.data);
          alert(t('postJob.jobPostedSuccessfully'));
          navigate('/AdminPanel');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            {t('postJob.title')}
          </h2>
        </div>

        <form className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2" onSubmit={sendData}>
          <div>
            <label htmlFor="title" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
              {t('postJob.fields.title')}
            </label>
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div>
            <label
              htmlFor="company-name"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              {t('postJob.companyName')}
            </label>
            <input
              name="company-name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="Location" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
              {t('postJob.location')}
            </label>
            <input
              name="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="category" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
              {t('postJob.category')}
            </label>
            <input
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="aboutCompany"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              {t('postJob.aboutCompany')}
            </label>
            <input
              name="aboutCompany"
              value={aboutCompany}
              onChange={(e) => setAboutCompany(e.target.value)}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="aboutInternship"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              {t('postJob.aboutInternship')}
            </label>
            <textarea
              name="aboutInternship"
              value={aboutInternship}
              onChange={(e) => setAboutInternship(e.target.value)}
              className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            ></textarea>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="Whocanapply" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
              {t('postJob.whoCanApply')}
            </label>
            <textarea
              name="Whocanapply"
              value={whoCanApply}
              onChange={(e) => setWhoCanApply(e.target.value)}
              className="h-34 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            ></textarea>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="perks" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
              {t('postJob.perks')}
            </label>
            <input
              name="perks"
              value={perks}
              onChange={(e) => setPerks(e.target.value)}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="numberOfOpening"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              {t('postJob.numberOfOpening')}
            </label>
            <input
              name="numberOfOpening"
              value={numberOfOpening}
              onChange={(e) => setNumberOfOpening(e.target.value)}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>


          <div className="sm:col-span-2">
            <label htmlFor="CTC" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
              {t('postJob.CTC')}
            </label>
            <input
              name="CTC"
              value={CTC}
              onChange={(e) => setCTC(e.target.value)}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="startDate"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              {t('postJob.startDate')}
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              name="startDate"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>
      
          <div class="sm:col-span-2">
            <label
             htmlFor="additionalInfo" 
             class="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              {t('postJob.additionalInfo')}
            </label>
            <textarea
               name="additionalInfo"
               value={additionalInfo} 
               onChange={(e)=>setAdditionalInfo(e.target.value)} 
               class="h-12 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring">
                
            </textarea>
      </div>

     <button  className='hover:bg-blue-600'>{t('postJob.title')}</button>
    </form>
  </div>
</div>
  );
}

export default PostJob
