'use client';

import { useEffect, useState, useTransition } from 'react';
import { getRegistrations, Registration } from './actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw, Eye, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { updateRegistrationStatus, deleteRegistration } from './actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from 'next/link';


function RegistrationRow({ registration, refreshData }: { registration: Registration, refreshData: () => void }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const getStatusVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
        case 'approved': return <CheckCircle className="h-4 w-4 mr-2" />;
        case 'pending': return null;
        case 'rejected': return <XCircle className="h-4 w-4 mr-2" />;
        default: return null;
      }
  }

  const handleStatusChange = (status: 'approved' | 'rejected') => {
    startTransition(async () => {
      const result = await updateRegistrationStatus(registration.id, status);
      if (result.success) {
        toast({ title: "Status Updated", description: `${registration.fullName}'s status is now ${status}.`});
        refreshData();
      } else {
        toast({ variant: 'destructive', title: "Update Failed", description: "Could not update the status." });
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteRegistration(registration.id);
      if (result.success) {
        toast({ title: "Registration Deleted", description: `${registration.fullName}'s registration has been deleted.`});
        refreshData();
      } else {
        toast({ variant: 'destructive', title: "Delete Failed", description: "Could not delete the registration." });
      }
    });
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
        <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{registration.fullName}</p>
        </div>
        <div className="w-40 flex justify-center">
            <Badge variant={getStatusVariant(registration.status)} className="capitalize">
                {getStatusIcon(registration.status)}
                {registration.status}
            </Badge>
        </div>
        <div className="flex items-center gap-2 w-60 justify-end">
            <Button asChild variant="outline" size="sm">
              <Link href={`/admin/registrations/${registration.id}`}>
                <Eye className="mr-2 h-4 w-4" /> View
              </Link>
            </Button>
            
            {registration.status !== 'approved' && (
                <Button size="sm" onClick={() => handleStatusChange('approved')} disabled={isPending}>Approve</Button>
            )}
            {registration.status !== 'rejected' && (
                <Button size="sm" variant="destructive" onClick={() => handleStatusChange('rejected')} disabled={isPending}>Reject</Button>
            )}

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={isPending}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the registration for {registration.fullName}. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    </div>
  )
}


export default function RegistrationsPage() {
  const [data, setData] = useState<Registration[]>([]);
  const [isPending, startTransition] = useTransition();

  const fetchData = () => {
    startTransition(async () => {
      const registrations = await getRegistrations();
      setData(registrations);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-4">
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Registration Requests</CardTitle>
                        <CardDescription>Showing {data.length} registration(s).</CardDescription>
                    </div>
                    <Button onClick={fetchData} variant="outline" size="icon" disabled={isPending}>
                        <RefreshCw className={cn('h-4 w-4', isPending && 'animate-spin')} />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                 <div className="border-b grid grid-cols-[1fr_160px_240px] p-4 text-sm font-medium text-muted-foreground">
                    <div className="min-w-0">Full Name</div>
                    <div className="text-center">Status</div>
                    <div className="text-right pr-12">Actions</div>
                </div>
                {isPending && data.length === 0 ? (
                    <div className="space-y-2 p-4">
                        <Skeleton className="h-14 w-full" />
                        <Skeleton className="h-14 w-full" />
                        <Skeleton className="h-14 w-full" />
                    </div>
                ) : data.length > 0 ? (
                    <div>
                        {data.map(reg => <RegistrationRow key={reg.id} registration={reg} refreshData={fetchData} />)}
                    </div>
                ) : (
                    <div className="h-24 text-center flex items-center justify-center text-muted-foreground">
                        No registrations found.
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
