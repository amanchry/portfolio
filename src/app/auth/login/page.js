'use client';

import PageTitle from '@/components/PageTitle';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    setError('');
    setIsLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    setIsLoading(false);

    if (res?.ok) {
      router.push('/');
    } else {
      setError('Oops! Wrong email or password. Try again?');
    }
  };

  return (
    <div className="page-content bg-white">
      <div className="dlab-bnr-inr overlay-primary" style={{ backgroundImage: 'url(/images/background/banner_1.png)' }}>
        <PageTitle motherMenu="Login" activeMenu="Login" />
      </div>
      <div className="section-full content-inner shop-account">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2 className="font-weight-700 m-t0 m-b30">Login Your Account</h2>
            </div>
          </div>
          <div>
            <div className="max-w500 m-auto m-b30">
              <div className="p-a30 border-1 seth">
                <form onSubmit={handleSubmit(onSubmit)} className="col-12 p-a0">
                  <h4 className="font-weight-700">LOGIN</h4>
                  <p className="font-weight-600">If you have an account with us, please log in.</p>
                  {error && <p className="text-danger m-b15">{error}</p>}
                  <div className="form-group">
                    <label className="font-weight-700">E-MAIL *</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="Your Email Id"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Please enter a valid email',
                        },
                      })}
                    />
                    {errors.email && <span className="text-danger small">{errors.email.message}</span>}
                  </div>
                  <div className="form-group">
                    <label className="font-weight-700">PASSWORD *</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Type Password"
                        {...register('password', { required: 'Password is required' })}
                      />
                      <span
                        className="input-group-addon cursor-pointer"
                        style={{ padding: '8px 12px', border: '1px solid #ced4da', borderRadius: '0 4px 4px 0', background: '#fff' }}
                        onClick={() => setShowPassword(!showPassword)}
                        onKeyDown={(e) => e.key === 'Enter' && setShowPassword((p) => !p)}
                        role="button"
                        tabIndex={0}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </span>
                    </div>
                    {errors.password && <span className="text-danger small">{errors.password.message}</span>}
                  </div>
                  <div className="text-left">
                    <button
                      type="submit"
                      className="site-button m-r5 button-lg radius-no"
                      disabled={!isValid || isLoading}
                    >
                      {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    <Link href="/auth/forgot-password" className="m-l5">
                      <i className="fa fa-unlock-alt"></i> Forgot Password
                    </Link>
                  </div>

                  <p className="m-t15">
            Don't have an account? <Link href="/auth/signup">Sign up instead</Link>
          </p>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
