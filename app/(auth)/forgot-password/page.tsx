'use client';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import FormLayout from '@/components/ui/FormLayout';

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
});

type ForgotPasswordFormValues = {
  email: string;
};

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      console.log(data); // Replace with API call to trigger email
      alert('Password reset link sent! Check your email.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };

  return (
    <FormLayout
      title="Forgot Password?"
      description="Enter your email address below to receive a password reset link."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Email Address"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Button type="submit" isLoading={isSubmitting}>
          Send Reset Link
        </Button>
      </form>
    </FormLayout>
  );
}
