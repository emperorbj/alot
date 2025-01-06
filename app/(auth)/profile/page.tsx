


'use client';

import { useState,useEffect } from 'react';
import axios from 'axios';
import { useRouter,useSearchParams } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import Image from 'next/image';

const UploadProfilePhotoPage: React.FC = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const userIdFromParams = searchParams.get("userId");
    if (userIdFromParams) {
      setUserId(userIdFromParams);
    }
  }, [searchParams]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!photo) {
      setError('Please select an image to upload.');
      return;
    }
    setError(null);
    setUploading(true);
    const formData = new FormData();
      formData.append('file', photo);
      formData.append('userId', userId);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setPhotoUrl(response.data.url);
        alert('Photo uploaded successfully!');
        router.push('/verify-email');
      } else {
        throw new Error('Photo upload failed.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Photo upload failed.');
      router.push('/verify-email');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="p-6">
          <h1 className="text-3xl font-bold my-9 text-center">Upload Profile Picture</h1>
          <p className="text-center">We require that you use your picture</p>
          <div className="flex md:flex-row-reverse gap-4 flex-col">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <h2 className="mt-5">
                  We require that you use a professional picture.
                  <br /> Do not upload any picture that is not yours.
                </h2>
                <h2 className="font-bold">Recommended</h2>
                <h2>Square JPG, PNG, at least 1,000 pixels per side.</h2>
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block"
                />
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className={`flex items-center justify-center gap-5 px-4 py-2 bg-[#172D54] text-white rounded ${
                    uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                  }`}
                >
                  <Image src="/plus.png" alt="plus" width={30} height={30} />
                  {uploading ? 'Uploading...' : 'Add Photo'}
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            </div>

            {photoUrl ? (
              <div className="mt-6">
                <p className="text-sm">Uploaded Image:</p>
                <img
                  src={photoUrl}
                  alt="Uploaded Profile"
                  className="w-40 h-40 rounded-full border"
                />
              </div>
            ) : (
              <div className="mt-6">
                <img
                  src="/profile.png"
                  alt="Default Profile"
                  className="w-40 h-40 bg-[#D9D9D9] rounded-md border"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadProfilePhotoPage;
