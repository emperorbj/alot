'use client';

import { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const VerifyEmailPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const verifyEmail = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/auth/verify-email?token=${token}`);
      setMessage(response.data.message);
      setTimeout(() => router.push('/login'), 3000); // Redirect after 3 seconds
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/send-email-verification', { email: '<USER_EMAIL>' });
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to resend email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
    <div className="p-10 border border-[#172D54]">
      <h1 className="text-xl text-center font-bold mb-4">Verify Your Email</h1>
      <p className="mb-4 px-10 text-center">{message || 'A mail has been sent to you please! Kindly verify your account by clicking on the link to sign in'}</p>
      {!message && (
        <div className='flex gap-5 items-center justify-center'>
          <Link href="/login">
          <button
            
            disabled={loading}
            className="px-4 py-2 bg-[#172D54] text-white rounded mb-4"
          >
            Check Email
          </button>
          </Link>
          <button
            onClick={resendVerificationEmail}
            disabled={loading}
            className="px-4 py-2 text-[#172D54] border border-[#172D54] mb-4 rounded hover:bg-[#172D54] hover:text-white"
          >
            Resend
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default VerifyEmailPage;
