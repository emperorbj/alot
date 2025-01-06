// // src/app/auth/sign-up/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Navbar from '@/components/ui/Navbar';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

const signUpSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

type SignUpFormValues = {
  fullName: string;
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: SignUpFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('/api/auth/signup', data);
      if (response.status === 201) {
        setSuccess(true);
        console.log(response);
        const userId = response.data.userId;
        // router.push("/profile");
        router.push(`/profile?userId=${userId}`);
      }
    } catch (err: unknown) {
      setError(err.response?.data?.message || 'Something went wrong');
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-[#EEEFF8]">
        <div className="w-full max-w-xl h-[70vh] bg-white rounded-md p-6">
          <h1 className="text-3xl font-bold text-center mb-4">Sign Up</h1>
          <p className="text-center">Please sign with your details</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('fullName')}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block p-3 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('email')}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full p-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register('password')}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md focus:ring-2 focus:ring-offset-2 ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#172D54] hover:bg-indigo-700 text-white'
              }`}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          {success && <p className="text-green-500 text-sm mt-4">Registration successful!</p>}
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>
      </div>
    </>
  );
}

