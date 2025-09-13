
'use server';

import * as z from 'zod';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('A valid email is required'),
  altEmail: z.string().email('A valid alternate email is required'),
  whatsappNumber: z.string().min(10, 'A valid WhatsApp number is required'),
  altContactNumber: z.string().min(10, 'An alternate contact number is required'),
  age: z.coerce.number().min(1, 'Age is required'),
  grade: z.coerce.number().min(1, 'Grade is required'),
  institution: z.string().min(2, 'Institution name is required'),
  munExperience: z.coerce.number().min(0, 'MUN experience is required'),
  committee1: z.string().min(1, 'Committee Preference 1 is required'),
  portfolio1_1: z.string().min(1, 'Portfolio Preference 1 is required'),
  portfolio1_2: z.string().min(1, 'Portfolio Preference 2 is required'),
  committee2: zstring().min(1, 'Committee Preference 2 is required'),
  questions: z.string().optional(),
  reference: z.string().optional(),
  paymentMethod: z.string(),
  paymentScreenshotUrl: z.string().url('A valid payment screenshot is required.'),
});

type FormState = {
  success: boolean;
  message?: string;
  trackingId?: string;
};

export async function handleRegistrationForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = Object.fromEntries(formData.entries());
  // Hardcode payment method as it's no longer a user input
  rawData.paymentMethod = 'Bank Transfer';

  const validation = formSchema.safeParse(rawData);

  if (!validation.success) {
    console.error("Form validation failed:", validation.error.flatten().fieldErrors);
    return { success: false, message: 'Invalid form data. Please check your entries.' };
  }

  try {
    const docRef = await addDoc(collection(db, 'registrations'), {
        ...validation.data,
        status: 'pending', // Initial status
        createdAt: serverTimestamp(),
    });

    console.log('Registration submitted with ID:', docRef.id);
    return { success: true, trackingId: docRef.id };

  } catch (error) {
    console.error("Error processing registration:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
    return { success: false, message: errorMessage };
  }
}

type UploadState = {
    success: boolean;
    message?: string;
    url?: string;
};

export async function uploadImageToImgBB(formData: FormData): Promise<UploadState> {
    const imageFile = formData.get('image') as File;
    if (!imageFile) {
        return { success: false, message: 'No image file found.' };
    }

    try {
        const imgbbApiKey = 'bdb9d0f4b094582a0aac9675b4ac1928';
        const imgbbFormData = new FormData();
        imgbbFormData.append('image', imageFile);

        const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
            method: 'POST',
            body: imgbbFormData,
        });

        if (!imgbbResponse.ok) {
            const errorData = await imgbbResponse.json();
            console.error('ImgBB upload failed:', errorData);
            throw new Error(`Image upload failed: ${errorData.error.message}`);
        }

        const imgbbResult = await imgbbResponse.json();
        const downloadURL = imgbbResult.data.url;

        if (!downloadURL) {
            throw new Error('Could not get image URL from ImgBB.');
        }

        return { success: true, url: downloadURL };
    } catch (error) {
        console.error("Error uploading image:", error);
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during image upload.';
        return { success: false, message: errorMessage };
    }
}
