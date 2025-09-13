'use server';

import { initializeAdmin } from '@/lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { ADMIN_UID } from '@/lib/constants';

export type UserRecord = {
  uid: string;
  email: string | undefined;
  displayName: string | undefined;
  creationTime: string;
};

export async function getUsers(): Promise<UserRecord[]> {
  const adminApp = initializeAdmin();
  const auth = getAuth(adminApp);
  const userRecords = await auth.listUsers();
  
  return userRecords.users.map(user => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    creationTime: new Date(user.metadata.creationTime).toLocaleDateString(),
  }));
}

export async function deleteUserAction(uid: string): Promise<{ success: boolean; message?: string }> {
  if (uid === ADMIN_UID) {
    return { success: false, message: "Cannot delete the primary admin account." };
  }
  try {
    const adminApp = initializeAdmin();
    const auth = getAuth(adminApp);
    await auth.deleteUser(uid);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete user:", error);
    return { success: false, message: error.message || "Could not delete the user." };
  }
}
