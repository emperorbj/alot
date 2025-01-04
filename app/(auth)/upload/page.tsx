import React from 'react'
import Image from 'next/image'
import UploadPixLayout from '@/components/ui/UploadPixLayout';
const UploadImage = () => {
    return (
        <UploadPixLayout
            title="Upload Profile Picture"
            description="We require that you upload a profile picture">

            <div className="flex bg-purple-500 md:flex-row flex-col items-center justify-center px-10 gap-5">
                <div className="flex items-center justify-center bg-gray-200 h-52 w-[40%] rounded-md mx-auto">
                    <Image src="/vector.png" width={100} height={100} alt="Avatar" className="object-cover" />
                </div>
                <div className="bg-yellow-400 flex items-center justify-start flex-col gap-3 w-1/2">
                    <div>
                        <h2>We require that you use a professional picture. Do not upload any Picture that is not yours. </h2>
                        <h2>Recommended </h2>
                        <h2>Square JPG, PNG, at least 1,000 pixels per side.</h2>
                    </div>
                    < div className='bg-red-600 w-full flex items-center justify-start' >
                        <button className="bg-blue-600 items-start text-white px-4 py-2 rounded-md">
                            Upload Picture
                        </button>
                    </div>
                </div>

            </div>
        </UploadPixLayout>
    )
}

export default UploadImage