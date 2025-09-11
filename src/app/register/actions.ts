'use server';

import * as z from 'zod';

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
  portfolio2_1: z.string(),
  portfolio2_2: z.string(),
  questions: z.string().optional(),
  reference: z.string().optional(),
  paymentMethod: z.string(),
  paymentScreenshot: z.any(),
});

type FormState = {
  success: boolean;
  message?: string;
};

export async function handleRegistrationForm(
  data: z.infer<typeof formSchema>
): Promise<FormState> {
  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    console.error("Form validation failed:", validation.error.flatten().fieldErrors);
    return { success: false, message: 'Invalid form data. Please check your entries.' };
  }
  
  // In a real application, you would:
  // 1. Upload the paymentScreenshot to a file storage (like Firebase Storage).
  // 2. Get the URL of the uploaded file.
  // 3. Save the form data, including the file URL, to a database (like Firestore).
  
  console.log('Received registration submission:', validation.data);
  
  // Simulate network delay for processing
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For this example, we'll just return a success message.
  return { success: true };
}
