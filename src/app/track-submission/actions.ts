
'use server';

import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import * as z from 'zod';

const ActionStateSchema = z.object({
    status: z.enum(['success', 'error', 'idle']),
    message: z.string().optional(),
    data: z.any().optional(),
});

type ActionState = z.infer<typeof ActionStateSchema>;

export async function getRegistrationStatus(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const trackingId = formData.get('trackingId') as string;

    if (!trackingId) {
        return { status: 'error', message: 'Tracking ID is required.' };
    }

    try {
        const docRef = doc(db, 'registrations', trackingId.trim());
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return { 
                status: 'success', 
                message: 'Registration found.',
                data: {
                    fullName: data.fullName,
                    status: data.status,
                    createdAt: data.createdAt.toDate().toLocaleString(),
                }
            };
        } else {
            return { status: 'error', message: 'No registration found with this ID.' };
        }
    } catch (error) {
        console.error("Error fetching registration status:", error);
        return { status: 'error', message: 'An unexpected error occurred.' };
    }
}

    