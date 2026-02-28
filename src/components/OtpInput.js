'use client';

import { useRef } from 'react';

const LENGTH = 6;

function OtpInput({ register, errors, setValue, otpError }) {
  const inputRefs = useRef([]);

  const getOtpValue = () => {
    let value = '';
    for (let i = 0; i < LENGTH; i++) {
      const el = inputRefs.current[i];
      if (el && el.value) value += el.value.replace(/\D/g, '').slice(-1);
    }
    return value.slice(0, LENGTH);
  };

  const syncToForm = () => {
    setValue('otp', getOtpValue(), { shouldValidate: true });
  };

  const handleChange = (index) => {
    const el = inputRefs.current[index];
    if (!el) return;
    const raw = el.value.replace(/\D/g, '');
    el.value = raw.slice(-1);
    syncToForm();
    if (el.value && index < LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    const el = inputRefs.current[index];
    if (e.key === 'Backspace' && el && !el.value && index > 0) {
      const prev = inputRefs.current[index - 1];
      if (prev) {
        prev.value = '';
        prev.focus();
        syncToForm();
      }
    }
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, LENGTH);
    if (text.length > 0) {
      e.preventDefault();
      const digits = text.split('');
      for (let i = 0; i < LENGTH; i++) {
        const input = inputRefs.current[i];
        if (input) input.value = digits[i] || '';
      }
      syncToForm();
      const nextIndex = Math.min(text.length, LENGTH) - 1;
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const hasError = errors?.otp || otpError;

  return (
    <div className="form-group">
      <div
        className="otp-input-wrap"
        style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {Array.from({ length: LENGTH }).map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            defaultValue=""
            className={`form-control text-center otp-input-box ${hasError ? 'is-invalid' : ''}`}
            style={{
              width: '2.75rem',
              minWidth: '2.75rem',
              height: '2.75rem',
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#212121',
              textAlign: 'center',
              padding: '0.25rem',
            }}
            onChange={() => handleChange(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            aria-label={`Digit ${index + 1}`}
          />
        ))}
      </div>
      <input
        type="hidden"
        {...register('otp', {
          required: 'Verification code is required',
          pattern: { value: /^[0-9]{6}$/, message: 'Must be a 6-digit number' },
        })}
      />
    </div>
  );
}

export default OtpInput;
