'use client';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import FormLayout from '@/components/ui/FormLayout';

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
    <FormLayout
      title="Sign In to Your Account"
      description="Enter your credentials to access your account."
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
        <Button type="submit">Sign In</Button>
      </form>
    </FormLayout>
  );
}
