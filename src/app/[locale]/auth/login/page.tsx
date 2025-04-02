'use client';

import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/client';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    
    setErrors(newErrors);
  };

  useEffect(() => {
    validateFormEffect();
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      
      if (result?.error) {
        setErrors({ form: t('auth.invalid_credentials') });
      } else {
        router.push('/crypto-news');
      }
    } catch (error) {
      setErrors({ form: t('common.error') });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-text-primary">
          {t('auth.login_title')}
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          {t('auth.or')}{' '}
          <Link href="/auth/signup" className="font-medium text-primary hover:text-primary-light">
            {t('auth.signup_link')}
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
            <label htmlFor="email" className="form-label">
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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="form-label">
                {t('auth.password')}
                
                {errors.password && (
                  <p className="error-message absolute top-0 right-0 text-align-right">{errors.password}</p>
                )}
              </label>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full text-text-primary px-3 py-2 bg-background-dark border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="text-sm">
            <Link href="/auth/forgot-password" className="font-medium text-primary hover:text-primary-light">
              {t('auth.forgot_password')}
            </Link>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading || !isValidForm}
              className={`btn btn-primary w-full flex justify-center py-2 px-4 ${isLoading || !isValidForm ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? t('common.loading') : t('auth.login')}
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}
