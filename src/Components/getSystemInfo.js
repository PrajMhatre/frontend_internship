import axios from 'axios';

const getSystemInfo = async () => {
  const ipResponse = await axios.get("https://api64.ipify.org?format=json");
  const ip = ipResponse.data.ip;

  const systemInfo = {
    userAgent: navigator.userAgent,
    browser: {
      name: navigator.appName,
      version: navigator.appVersion,
      platform: navigator.platform,
      language: navigator.language,
      isMobile: /Mobi|Android/i.test(navigator.userAgent)
    },
    ipAddress: ip
  };

  return systemInfo;
};

export default getSystemInfo;
