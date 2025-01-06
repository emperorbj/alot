
// import { NextResponse } from 'next/server';
// import cloudinary from '@/lib/cloudinary';
// import User from '@/models/User'; // Assuming you have a User model
// import { connect } from '@/dbConfig/DbConfig';

// export async function POST(req: Request) {
//   await connect();

//   const formData = await req.formData();
//   const file = formData.get('file') as File | null;
//   const userId = formData.get('userId') as string | null;
//   // User ID should be passed from the frontend
// // Debugging: Log incoming data
// console.log('Debug - Incoming request:');
// console.log('User ID:', userId);
// console.log('File:', file ? { name: file.name, type: file.type, size: file.size } : 'No file received');

//   if (!file) {
//     console.log('Debug - No file provided');
//     return NextResponse.json({ message: 'File is required' }, { status: 400 });
//   }

//   if (!userId) {
//     console.log('Debug - No userId provided');
//     return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
//   }

//   try {
//     // Validate file type and size
//     const validTypes = ['image/jpeg', 'image/png', 'image/webp','image/jpg'];
//     if (!validTypes.includes(file.type)) {
//       return NextResponse.json(
//         { message: 'Only JPEG, PNG, and WEBP formats are allowed' },
//         { status: 400 }
//       );
//     }

//     const MAX_SIZE_MB = 5;
//     const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
//     if (file.size > MAX_SIZE_BYTES) {
//         console.log('Debug - File size exceeds limit:', file.size);
//       return NextResponse.json(
//         { message: `File size must not exceed ${MAX_SIZE_MB} MB` },
//         { status: 400 }
//       );
//     }

//     // Convert the file to a Buffer
//     const fileBuffer = Buffer.from(await file.arrayBuffer());
//     console.log('Debug - File buffer created successfully');

//     // Upload to Cloudinary
//     const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         { folder: 'profile_pictures' },
//         (error, result) => {
//           if (error) {
//             console.log('Debug - Cloudinary upload error:', error);
//             return reject(error);}
//           if (result) {
//             resolve(result);
//           } else {
//             reject(new Error('Upload failed, no result returned'));
//           }
//         }
//       );

//       uploadStream.end(fileBuffer);
//     });

//     // Update user's profile in the database
//     const user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     user.profileImage = result.secure_url;
//     await user.save();

//     return NextResponse.json({
//       message: 'Image uploaded successfully',
//       url: result.secure_url,
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     return NextResponse.json({ message: 'Upload failed', error }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import User from '@/models/User'; // Assuming you have a User model
import { connect } from '@/dbConfig/DbConfig';

export async function POST(req: Request) {
  await connect();

  // Parse form data
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const userId = formData.get('userId') as string | null;

  // Debugging: Log incoming data
  console.log('Debug - Incoming request:');
  console.log('User ID:', userId);
  console.log('File:', file ? { name: file.name, type: file.type, size: file.size } : 'No file received');

  // Validate file and userId
  if (!file) {
    console.log('Debug - No file provided');
    return NextResponse.json({ success: false, message: 'File is required' }, { status: 400 });
  }

  if (!userId) {
    console.log('Debug - No userId provided');
    return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
  }

  try {
    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      console.log('Debug - Invalid file type:', file.type);
      return NextResponse.json(
        { success: false, message: 'Only JPEG, PNG, and WEBP formats are allowed' },
        { status: 400 }
      );
    }

    const MAX_SIZE_MB = 5;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      console.log('Debug - File size exceeds limit:', file.size);
      return NextResponse.json(
        { success: false, message: `File size must not exceed ${MAX_SIZE_MB} MB` },
        { status: 400 }
      );
    }

    // Convert file to a Buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    console.log('Debug - File buffer created successfully');

    // Upload to Cloudinary
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'profile_pictures' },
        (error, result) => {
          if (error) {
            console.log('Debug - Cloudinary upload error:', error);
            return reject(error);
          }
          if (result) {
            console.log('Debug - Cloudinary upload success:', result.secure_url);
            resolve(result);
          } else {
            console.log('Debug - Cloudinary upload failed: No result returned');
            reject(new Error('Upload failed, no result returned'));
          }
        }
      );

      uploadStream.end(fileBuffer);
    });

    // Find and update the user in the database
    console.log('Debug - Searching for user in database with ID:', userId);
    const user = await User.findById(userId);
    if (!user) {
      console.log('Debug - User not found for ID:', userId);
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    console.log('Debug - User found:', user);

    user.profileImage = result.secure_url;
    await user.save();
    console.log('Debug - User profile image updated successfully');

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully',
      url: result.secure_url,
    });
  } catch (error) {
    console.error('Debug - Upload error:', error);
    return NextResponse.json({ success: false, message: 'Upload failed', error }, { status: 500 });
  }
}
