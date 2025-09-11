'use server';

import * as z from 'zod';

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

type FormState = {
  success: boolean;
  message?: string;
};

export async function handleContactForm(
  data: z.infer<typeof formSchema>
): Promise<FormState> {
  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, message: 'Invalid form data.' };
  }

  // In a real application, you would process the data here:
  // - Send an email
  // - Save to a database
  // - etc.
  console.log('Received contact form submission:', validation.data);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For this example, we'll just return a success message.
  return { success: true };
}
