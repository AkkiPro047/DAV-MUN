'use server';

import { z } from 'zod';
import { initializeAdmin } from '@/lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

export type FormState = {
  success: boolean;
  message: string;
};

export async function createUserAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validation = formSchema.safeParse(Object.fromEntries(formData));
  if (!validation.success) {
    return {
      success: false,
      message: validation.error.flatten().fieldErrors.email?.[0] || validation.error.flatten().fieldErrors.password?.[0] || "Invalid data",
    };
  }
  
  try {
    const adminApp = initializeAdmin();
    const adminAuth = getAuth(adminApp);
    
    await adminAuth.createUser({
      email: validation.data.email,
      password: validation.data.password,
    });
    
    return { success: true, message: `User ${validation.data.email} created successfully.` };

  } catch (error: any) {
    console.error('Error creating user:', error);
    return { success: false, message: error.message || 'Failed to create user.' };
  }
}
