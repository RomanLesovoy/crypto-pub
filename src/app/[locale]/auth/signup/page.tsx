'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/client';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const isValidForm = Object.keys(errors).length === 0;

  const validateFormEffect = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = t('validation.email_required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validation.email_invalid');
    }

    if (!formData.password) {
      newErrors.password = t('validation.password_required');
    } else if (formData.password.length < 8) {
      newErrors.password = t('validation.password_too_short');
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('validation.password_mismatch');
    }

    setErrors(newErrors);
  };

  useEffect(() => {
    validateFormEffect();
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!isValidForm) return;

    e.preventDefault();

    setIsLoading(true);
    
    try {
      const result = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(formData),
      }).then(res => res.json());
      
      if (result?.error) {
        setErrors({ form: result?.error });
      } else {
        router.push('/auth/login');
      }
    } catch (error) {
      setErrors({ form: t('common.error') });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-text-primary">
          {t('auth.signup')}
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          {t('auth.already_have_account')}{' '}
          <Link href="/auth/login" className="font-medium text-primary hover:text-primary-light">
            {t('auth.login')}
          </Link>
        </p>
      </div>
      
      <div className="mt-8 bg-background-lighter rounded-lg shadow-md p-6 sm:p-8">
        {errors.form && (
          <div className="mb-4 p-3 rounded-md bg-red-900/30 border border-red-700">
            <p className="text-sm text-red-400">{errors.form}</p>
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-text-primary">
              {t('auth.email')}

              {errors.email && (
                <p className="error-message absolute top-0 right-0 text-align-right">{errors.email}</p>
              )}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full text-text-primary px-3 py-2 bg-background-dark border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-text-primary">
              {t('auth.password')}

              {errors.password && (
                <p className="error-message absolute top-0 right-0 text-align-right">{errors.password}</p>
              )}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full text-text-primary px-3 py-2 bg-background-dark border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary">
              {t('auth.confirm_password')}

              {errors.confirmPassword && (
                <p className="error-message absolute top-0 right-0 text-align-right">{errors.confirmPassword}</p>
              )}
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full text-text-primary px-3 py-2 bg-background-dark border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading || !isValidForm}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${isLoading || !isValidForm ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? t('common.loading') : t('auth.signup')}
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}
