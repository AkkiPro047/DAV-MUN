'use server';

import { initializeAdmin } from '@/lib/firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

export type Registration = {
  id: string;
  fullName: string;
  email: string;
  altEmail: string;
  whatsappNumber: string;
  altContactNumber: string;
  age: number;
  grade: number;
  institution: string;
  munExperience: number;
  committee1: string;
  portfolio1_1: string;
  portfolio1_2: string;
  committee2: string;
  questions?: string;
  reference?: string;
  paymentMethod: string;
  paymentScreenshotUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  adminResponse?: string;
};

export async function getRegistrations(): Promise<Registration[]> {
  const adminApp = initializeAdmin();
  const db = getFirestore(adminApp);
  const registrationsRef = db.collection('registrations');
  const q = registrationsRef.orderBy('createdAt', 'desc');
  const querySnapshot = await q.get();

  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt.toDate(),
    } as Registration;
  });
}

export async function getRegistrationById(id: string): Promise<Registration | null> {
    const adminApp = initializeAdmin();
    const db = getFirestore(adminApp);
    const docRef = db.collection('registrations').doc(id);
    const docSnap = await docRef.get();
  
    if (!docSnap.exists) {
      return null;
    }
  
    const data = docSnap.data()!;
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt.toDate(),
    } as Registration;
  }

export async function updateRegistrationStatus(id: string, status: 'pending' | 'approved' | 'rejected'): Promise<{success: boolean}> {
    try {
        const adminApp = initializeAdmin();
        const db = getFirestore(adminApp);
        const docRef = db.collection('registrations').doc(id);
        await docRef.update({ status });
        return { success: true };
    } catch (error) {
        console.error("Failed to update status:", error);
        return { success: false };
    }
}

export async function updateRegistrationResponse(id: string, response: string): Promise<{success: boolean}> {
    try {
        const adminApp = initializeAdmin();
        const db = getFirestore(adminApp);
        const docRef = db.collection('registrations').doc(id);
        await docRef.update({ adminResponse: response });
        return { success: true };
    } catch (error) {
        console.error("Failed to update response:", error);
        return { success: false };
    }
}

export async function deleteRegistration(id: string): Promise<{success: boolean}> {
    try {
        const adminApp = initializeAdmin();
        const db = getFirestore(adminApp);
        const docRef = db.collection('registrations').doc(id);
        await docRef.delete();
        return { success: true };
    } catch (error) {
        console.error("Failed to delete registration:", error);
        return { success: false };
    }
}
