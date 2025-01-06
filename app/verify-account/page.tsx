// src/app/auth/sign-up/page.tsx
'use client';

import Button from "@/components/ui/Button";
import Navbar from "@/components/ui/Navbar";

export default function Verify () {
  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-red-400">
      <div className="w-full max-w-md bg-white border border-[#3D6FAB] rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Account Verification</h1>
        <p>A mail has been sent to you! Kindly verify your account by clicking on the link to Sign In</p>
        <div className="flex items-center justify-center gap-4">
            <Button>Check Email</Button>
            <Button>Resend</Button>
        </div>
      </div>
    </div>
    </>
  );
}
