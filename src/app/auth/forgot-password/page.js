'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import PageTitle from '@/components/PageTitle';
import OtpInput from '@/components/OtpInput';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [otpError, setOtpError] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    let t;
    if (isResendDisabled && countdown > 0) {
      t = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(t);
  }, [countdown, isResendDisabled]);

  const handleSendOtp = async (data) => {
    setIsLoading(true);
    setMessage('');
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, otp }),
      });
      const json = await res.json();
      if (json.success) {
        setUserEmail(data.email);
        setShowOtpField(true);
        setCountdown(10);
        setIsResendDisabled(true);
      } else {
        setMessage('Failed to send verification code. Please try again.');
      }
    } catch {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = (data) => {
    setIsLoading(true);
    setOtpError('');
    if (String(data.otp) === String(generatedOtp)) {
      setShowPasswordField(true);
    } else {
      setOtpError('Invalid verification code. Please try again.');
    }
    setIsLoading(false);
  };

  const handleCreatePassword = async (data) => {
    if (data.password !== data.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email || userEmail, password: data.password }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setMessage('Password reset successful! Redirecting...');
        setTimeout(() => router.push('/auth/login'), 1500);
      } else {
        setMessage(result.message || 'Failed to reset password');
      }
    } catch {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data) => {
    if (!showOtpField) handleSendOtp(data);
    else if (!showPasswordField) handleVerifyOtp(data);
    else handleCreatePassword(data);
  };

  const handleResendCode = () => {
    setCountdown(10);
    setIsResendDisabled(true);
    handleSendOtp({ email: userEmail });
  };

  const renderForm = () => {
    if (!showOtpField) {
      return (
        <form onSubmit={handleSubmit(onSubmit)} className="col-12 p-a0">
          <h4 className="font-weight-700">FORGOT PASSWORD</h4>
          <p className="font-weight-600">Enter your email and we&apos;ll send you a code to reset your password.</p>
          {message && <p className="text-danger m-b15">{message}</p>}
          <div className="form-group">
            <label className="font-weight-700">E-MAIL *</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Your Email Id"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Please enter a valid email' },
              })}
            />
            {errors.email && <span className="text-danger small">{errors.email.message}</span>}
          </div>
          <div className="text-left">
            <button type="submit" className="site-button button-lg radius-no" disabled={!isValid || isLoading}>
              {isLoading ? 'Sending code...' : 'Send me the code'}
            </button>
          </div>
          <p className="m-t15">
            <Link href="/auth/login"><i className="fa fa-arrow-left"></i> Back to Sign in</Link>
          </p>
        </form>
      );
    }

    if (!showPasswordField) {
      return (
        <form onSubmit={handleSubmit(onSubmit)} className="col-12 p-a0">
          <h4 className="font-weight-700">ENTER VERIFICATION CODE</h4>
          <p className="font-weight-600">A code was sent to <strong>{userEmail}</strong></p>
          {(otpError || errors.otp) && (
            <p className="text-danger m-b15">{otpError || errors.otp?.message}</p>
          )}
          <OtpInput register={register} setValue={setValue} watch={watch} errors={errors} otpError={otpError} />
          <div className="text-left m-t15">
            <button type="submit" className="site-button button-lg radius-no" disabled={!isValid || isLoading}>
              {isLoading ? 'Checking...' : 'Verify'}
            </button>
          </div>
          <p className="m-t15">
            Didn&apos;t receive an email?{' '}
            <button type="button" className="btn-link p-a0" onClick={handleResendCode} disabled={isResendDisabled}>
              {isResendDisabled ? `Resend code in ${countdown}s` : 'Resend code'}
            </button>
          </p>
        </form>
      );
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="col-12 p-a0">
        <h4 className="font-weight-700">CREATE NEW PASSWORD</h4>
        <p className="font-weight-600">Your password must be at least 8 characters.</p>
        {message && <p className="text-danger m-b15">{message}</p>}
        <div className="form-group">
          <label className="font-weight-700">E-MAIL</label>
          <input type="email" className="form-control" value={userEmail} readOnly disabled />
        </div>
        <div className="form-group">
          <label className="font-weight-700">PASSWORD *</label>
          <div className="input-group">
            <input
              type={showPass ? 'text' : 'password'}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="New password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'At least 8 characters' },
              })}
            />
            <span
              className="input-group-addon"
              style={{ cursor: 'pointer', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '0 4px 4px 0', background: '#fff' }}
              onClick={() => setShowPass(!showPass)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setShowPass((p) => !p)}
              aria-label={showPass ? 'Hide password' : 'Show password'}
            >
              <i className={`fa ${showPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </span>
          </div>
          {errors.password && <span className="text-danger small d-block">{errors.password.message}</span>}
        </div>
        <div className="form-group">
          <label className="font-weight-700">CONFIRM PASSWORD *</label>
          <div className="input-group">
            <input
              type={showConfPass ? 'text' : 'password'}
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              placeholder="Confirm password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (v, f) => v === f.password || 'Passwords do not match',
              })}
            />
            <span
              className="input-group-addon"
              style={{ cursor: 'pointer', padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '0 4px 4px 0', background: '#fff' }}
              onClick={() => setShowConfPass(!showConfPass)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setShowConfPass((p) => !p)}
              aria-label={showConfPass ? 'Hide password' : 'Show password'}
            >
              <i className={`fa ${showConfPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </span>
          </div>
          {errors.confirmPassword && <span className="text-danger small d-block">{errors.confirmPassword.message}</span>}
        </div>
        <div className="text-left">
          <button type="submit" className="site-button button-lg radius-no" disabled={!isValid || isLoading}>
            {isLoading ? 'Resetting...' : 'Reset password'}
          </button>
        </div>
        <p className="m-t15">
          <Link href="/auth/login"><i className="fa fa-arrow-left"></i> Back to Sign in</Link>
        </p>
      </form>
    );
  };

  return (
    <div className="page-content bg-white">
      <div className="dlab-bnr-inr overlay-primary" style={{ backgroundImage: 'url(/images/background/banner_1.png)' }}>
        <PageTitle motherMenu="Forgot Password" activeMenu="Forgot Password" />
      </div>
      <div className="section-full content-inner shop-account">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2 className="font-weight-700 m-t0 m-b30">Reset Your Password</h2>
            </div>
          </div>
          <div>
            <div className="max-w500 m-auto m-b30">
              <div className="p-a30 border-1 seth">
                {renderForm()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
