
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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"


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
    <div className="grid grid-cols-[1fr_160px_240px] items-center p-4 border-b">
        <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{registration.fullName}</p>
        </div>
        <div className="w-40 flex justify-center">
            <Badge variant={getStatusVariant(registration.status)} className="capitalize">
                {getStatusIcon(registration.status)}
                {registration.status}
            </Badge>
        </div>
        <div className="flex items-center gap-2 justify-end">
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

function RegistrationList({ registrations, refreshData, isLoading }: { registrations: Registration[], refreshData: () => void, isLoading: boolean }) {
    if (isLoading) {
        return (
            <div className="space-y-2 p-4">
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
            </div>
        );
    }

    if (registrations.length === 0) {
        return (
            <div className="h-24 text-center flex items-center justify-center text-muted-foreground">
                No registrations found in this category.
            </div>
        );
    }
    
    return (
        <div>
            {registrations.map(reg => <RegistrationRow key={reg.id} registration={reg} refreshData={refreshData} />)}
        </div>
    );
}


export default function RegistrationsPage() {
  const [allData, setAllData] = useState<Registration[]>([]);
  const [isPending, startTransition] = useTransition();

  const fetchData = () => {
    startTransition(async () => {
      const registrations = await getRegistrations();
      setAllData(registrations);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = (status: 'pending' | 'approved' | 'rejected') => allData.filter(r => r.status === status);

  return (
    <div className="space-y-4">
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Registration Requests</CardTitle>
                        <CardDescription>Showing {allData.length} total registration(s).</CardDescription>
                    </div>
                    <Button onClick={fetchData} variant="outline" size="icon" disabled={isPending}>
                        <RefreshCw className={cn('h-4 w-4', isPending && 'animate-spin')} />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Tabs defaultValue="all">
                    <div className="px-6 border-b">
                        <TabsList>
                            <TabsTrigger value="all">All ({allData.length})</TabsTrigger>
                            <TabsTrigger value="pending">Pending ({filtered('pending').length})</TabsTrigger>
                            <TabsTrigger value="approved">Approved ({filtered('approved').length})</TabsTrigger>
                            <TabsTrigger value="rejected">Rejected ({filtered('rejected').length})</TabsTrigger>
                        </TabsList>
                    </div>
                    <div className="border-b grid grid-cols-[1fr_160px_240px] p-4 text-sm font-medium text-muted-foreground">
                        <div className="min-w-0">Full Name</div>
                        <div className="text-center">Status</div>
                        <div className="text-right pr-12">Actions</div>
                    </div>
                    <TabsContent value="all">
                        <RegistrationList registrations={allData} refreshData={fetchData} isLoading={isPending && allData.length === 0} />
                    </TabsContent>
                    <TabsContent value="pending">
                        <RegistrationList registrations={filtered('pending')} refreshData={fetchData} isLoading={isPending && allData.length === 0} />
                    </TabsContent>
                    <TabsContent value="approved">
                        <RegistrationList registrations={filtered('approved')} refreshData={fetchData} isLoading={isPending && allData.length === 0} />
                    </TabsContent>
                    <TabsContent value="rejected">
                        <RegistrationList registrations={filtered('rejected')} refreshData={fetchData} isLoading={isPending && allData.length === 0} />
                    </TabsContent>
              </Tabs>
            </CardContent>
        </Card>
    </div>
  );
}
