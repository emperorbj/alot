'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import FormLayout from '@/components/ui/FormLayout';

const resetPasswordSchema = yup.object().shape({
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromParams = searchParams.get('token');
    setToken(tokenFromParams);
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      console.log({ token, ...data }); // Replace with API call to reset password
      alert('Password reset successful! You can now log in.');
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  // Fallback if token is missing
  if (token === null) {
    return <p>Loading...</p>;
  }

  if (!token) {
    return <p>Invalid or missing token.</p>;
  }

  return (
    <FormLayout
      title="Reset Your Password"
      description="Enter a new password below to reset your account password."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="New Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
        <InputField
          label="Confirm New Password"
          type="password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
        <Button type="submit" isLoading={isSubmitting}>
          Reset Password
        </Button>
      </form>
    </FormLayout>
  );
}
