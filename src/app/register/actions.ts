'use server';

import * as z from 'zod';
import { db, storage } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { randomUUID } from 'crypto';

const formSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  altEmail: z.string().email(),
  whatsappNumber: z.string(),
  altContactNumber: z.string(),
  age: z.coerce.number(),
  grade: z.coerce.number(),
  institution: z.string(),
  munExperience: z.coerce.number(),
  committee1: z.string(),
  portfolio1_1: z.string(),
  portfolio1_2: z.string(),
  committee2: z.string(),
  questions: z.string().optional(),
  reference: z.string().optional(),
  paymentMethod: z.string(),
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
  
  const validation = formSchema.safeParse(rawData);

  if (!validation.success) {
    console.error("Form validation failed:", validation.error.flatten().fieldErrors);
    return { success: false, message: 'Invalid form data. Please check your entries.' };
  }
  
  const paymentScreenshot = formData.get('paymentScreenshot') as File;
  if (!paymentScreenshot || paymentScreenshot.size === 0) {
      return { success: false, message: 'Payment screenshot is required.' };
  }

  try {
    // 1. Upload the paymentScreenshot to Firebase Storage
    const fileExtension = paymentScreenshot.name.split('.').pop();
    const fileName = `${randomUUID()}.${fileExtension}`;
    const storageRef = ref(storage, `payment_screenshots/${fileName}`);
    const fileBuffer = Buffer.from(await paymentScreenshot.arrayBuffer());
    
    await uploadBytes(storageRef, fileBuffer, {
        contentType: paymentScreenshot.type,
    });

    // 2. Get the URL of the uploaded file.
    const downloadURL = await getDownloadURL(storageRef);

    // 3. Save the form data, including the file URL, to a database (like Firestore).
    const docRef = await addDoc(collection(db, 'registrations'), {
        ...validation.data,
        paymentScreenshotUrl: downloadURL,
        status: 'pending', // Initial status
        createdAt: serverTimestamp(),
    });

    console.log('Registration submitted with ID:', docRef.id);

    return { success: true, trackingId: docRef.id };

  } catch (error) {
    console.error("Error processing registration:", error);
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
  }
}
