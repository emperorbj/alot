'use client';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import FormLayout from '@/components/ui/FormLayout';
import Navbar from '@/components/ui/Navbar';
import Link from 'next/link';

const signInSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});

type SignInFormValues = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormValues) => {
    console.log(data); // Handle sign-in logic
  };

  return (
    <><Navbar/>
    <FormLayout
      title="Sign In"
      description="Please sign into your account."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Email Address"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <InputField
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
      <Link href="/dashboard">
        <Button type="submit" className='w-full'>Sign In</Button>
      </Link>
        <div className='flex gap-5'>
          <p>Are you a student?</p>
          <p>Sign in</p>
        </div>
      </form>
    </FormLayout>
    </>
  );
}


