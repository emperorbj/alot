'use client';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import VerifyLayout from '@/components/ui/VerificationLayout';
import Navbar from '@/components/ui/Navbar';

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid Email Address').required('Email is required'),
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
    
      title="An email has been sent to you"
      description="Enter the 6-digit verification code sent to h****@gmail.com."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <div className='flex items-center justify-center gap-3'>
        <InputField
        className='h-10 w-10'
          label=''
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
         <InputField
        className='h-10 w-10'
          label=""
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
         <InputField
        className='h-10 w-10'
          label=""
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
         <InputField
        className='h-10 w-10'
          label=""
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
         <InputField
        className='h-10 w-10'
          label=""
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
         <InputField
        className='h-10 w-10'
          label=""
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        </div>
       
        <div className='flex gap-5'>
        <Button className='bg-transparent border border-[#172D54] text-[#172D54]' type="submit">
          Resend Code
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          Submit
        </Button>
        </div>
      </form>
    </VerifyLayout>
    </>
  );
}
