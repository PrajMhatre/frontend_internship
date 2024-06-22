// Footer.js
import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <div>
      <footer className="bg-gray-800 text-white">
        <div className="container px-6 py-12 mx-auto">
          <div className="grid grid-cols-2 gap-6 mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            <div>
              <h3 className="text-sm font-bold">{t('footer.internshipByPlaces')}</h3>
              <div className="flex flex-col items-start mt-4 space-y-4">
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.locations.newYork')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.locations.losAngeles')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.locations.chicago')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.locations.sanFrancisco')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.locations.miami')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.locations.seattle')}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold">{t('footer.internshipByStream')}</h3>
              <div className="flex flex-col items-start mt-4 space-y-4">
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.internshipStreams.aboutUs')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.internshipStreams.careers')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.internshipStreams.press')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.internshipStreams.news')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.internshipStreams.mediaKit')}</p>
                <p className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.internshipStreams.contact')}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold">{t('footer.jobPlaces')}</h3>
              <div className="flex flex-col items-start mt-4 space-y-4">
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.jobPlacesLinks.blog')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.jobPlacesLinks.newsletter')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.jobPlacesLinks.events')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.jobPlacesLinks.helpCenter')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.jobPlacesLinks.tutorials')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.jobPlacesLinks.supports')}</a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold">{t('footer.jobsByStream')}</h3>
              <div className="flex flex-col items-start mt-4 space-y-4">
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.jobsByStreamsLinks.startups')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.jobsByStreamsLinks.enterprise')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.jobsByStreamsLinks.government')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.jobsByStreamsLinks.saas')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.jobsByStreamsLinks.marketplaces')}</a>
                <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.jobsByStreamsLinks.ecommerce')}</a>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200 md:my-10" />

          <div>
            <h3 className="text-sm font-bold">{t('footer.aboutUs')}</h3>
            <div className="flex flex-col items-start mt-4 space-y-4">
              <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.internshipStreams.aboutUs')}</a>
              <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.internshipStreams.careers')}</a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold">{t('footer.teamDiary')}</h3>
            <div className="flex flex-col items-start mt-4 space-y-4">
              <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.internshipStreams.aboutUs')}</a>
              <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.internshipStreams.careers')}</a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold">{t('footer.termsConditions')}</h3>
            <div className="flex flex-col items-start mt-4 space-y-4">
              <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.internshipStreams.aboutUs')}</a>
              <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.internshipStreams.careers')}</a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold">{t('footer.sitemap')}</h3>
            <div className="flex flex-col items-start mt-4 space-y-4">
              <a href="/" className="transition-colors duration-200 hover:underline hover:text-blue-600">{t('footer.internshipStreams.aboutUs')}</a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between sm:flex-row">
            <p className="border-white">
              <i className="bi bi-google-play text-black"></i> {t('footer.getAndroidApp')}
            </p>
            <div className="social-icons">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
            </div>
            <p className="mt-4 text-sm sm:mt-0">{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
