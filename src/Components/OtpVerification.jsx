import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { signInWithPhoneNumber, ConfirmationResult, getAuth, RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const OtpVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const history = useNavigate ();

  const handleSendOtp = async () => {
    try {
      const authInstance = getAuth(auth);
      const verifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
      });
      const confirmation = await signInWithPhoneNumber(authInstance, phoneNumber, verifier);
      setConfirmationResult(confirmation);
    } catch (error) {
      console.error('Error sending OTP:', error);
      // Handle error (e.g., display error message)
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (!confirmationResult) return;

      await confirmationResult.confirm(verificationCode);
      console.log('Successfully verified OTP');
      // Redirect or perform actions after successful verification
      history.push('/dashboard'); // Example redirect
    } catch (error) {
      console.error('Error verifying OTP:', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      <div>
        <label htmlFor="phone">Enter Phone Number:</label>
        <input
          type="text"
          id="phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={handleSendOtp}>Send OTP</button>
      </div>
      {confirmationResult && (
        <div>
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            id="otp"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}
      <div id="recaptcha-container"></div> {/* Required for RecaptchaVerifier */}
    </div>
  );
};

export default OtpVerification;
