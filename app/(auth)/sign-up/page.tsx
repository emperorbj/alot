'use client';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import FormLayout from '@/components/ui/FormLayout';

const signUpSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormValues) => {
    console.log(data); // Handle sign-up logic
  };

  return (
    <FormLayout
      title="Create an Account"
      description="Sign up to access your account and start managing your profile."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Full Name"
          type="text"
          {...register('name')}
          error={errors.name?.message}
        />
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
        <Button type="submit">Sign Up</Button>
      </form>
    </FormLayout>
  );
}
