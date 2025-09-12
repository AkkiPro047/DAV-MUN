
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
  committee2: z.string().min(1, 'Committee Preference 2 is required'),
  questions: z.string().optional(),
  reference: z.string().optional(),
  paymentMethod: z.string(),
  // paymentScreenshot is handled via FormData directly
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

  const paymentScreenshot = formData.get('paymentScreenshot') as File;
  if (!paymentScreenshot || paymentScreenshot.size === 0) {
      return { success: false, message: 'Payment screenshot is required.' };
  }

  const validation = formSchema.safeParse(rawData);

  if (!validation.success) {
    console.error("Form validation failed:", validation.error.flatten().fieldErrors);
    return { success: false, message: 'Invalid form data. Please check your entries.' };
  }

  let downloadURL = '';

  try {
    // 1. Upload the paymentScreenshot to ImgBB
    const imgbbApiKey = 'bdb9d0f4b094582a0aac9675b4ac1928';
    const imgbbFormData = new FormData();
    imgbbFormData.append('image', paymentScreenshot);

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
    downloadURL = imgbbResult.data.url;

    if (!downloadURL) {
        throw new Error('Could not get image URL from ImgBB.');
    }

    // 2. Save the form data, including the file URL, to Firestore.
    const { paymentScreenshot: _, ...formDataToSave } = validation.data;
    const docRef = await addDoc(collection(db, 'registrations'), {
        ...formDataToSave,
        paymentScreenshotUrl: downloadURL,
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
