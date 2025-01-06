'use client';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import VerifyLayout from '@/components/ui/VerificationLayout';
import Navbar from '@/components/ui/Navbar';

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
    <><Navbar/>
    <VerifyLayout
    
      title="Forgot Password?"
      description="Reset Your Password"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <InputField
          label="Email Address"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <div className='flex gap-5'>
        <Button type="submit" isLoading={isSubmitting}>
          Reset Password
        </Button>
        <Button className='bg-transparent border border-[#172D54]' type="submit">
          <p className='text-[#172D54]'>Back</p>
        </Button>
        </div>
      </form>
    </VerifyLayout>
    </>
  );
}
