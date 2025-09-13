
'use client';

import { useEffect, useState, useTransition } from 'react';
import { getRegistrations, Registration } from './actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw, Eye, CheckCircle, XCircle, Trash2, Download } from 'lucide-react';
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Extend the jsPDF type to include autoTable
declare module 'jspdf' {
    interface jsPDF {
      autoTable: (options: any) => jsPDF;
    }
  }

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
  const [activeTab, setActiveTab] = useState('all');

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

  const getVisibleData = () => {
    switch (activeTab) {
      case 'pending': return filtered('pending');
      case 'approved': return filtered('approved');
      case 'rejected': return filtered('rejected');
      default: return allData;
    }
  }

  const downloadFile = (data: string, fileName: string, fileType: string) => {
    const blob = new Blob([data], { type: fileType });
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const exportToCsv = () => {
    const dataToExport = getVisibleData();
    if(dataToExport.length === 0) return;

    let csv = Object.keys(dataToExport[0]).join(',');
    dataToExport.forEach(item => {
        csv += '\n' + Object.values(item).map(v => `"${String(v).replace(/"/g, '""')}"`).join(',');
    });

    downloadFile(csv, `registrations-${activeTab}.csv`, 'text/csv');
  };

  const exportToJson = () => {
    const dataToExport = getVisibleData();
    if(dataToExport.length === 0) return;
    
    const json = JSON.stringify(dataToExport, null, 2);
    downloadFile(json, `registrations-${activeTab}.json`, 'application/json');
  };

  const exportToXlsx = () => {
    const dataToExport = getVisibleData();
    if(dataToExport.length === 0) return;
    
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');
    XLSX.writeFile(workbook, `registrations-${activeTab}.xlsx`);
  };

  const exportToPdf = () => {
    const dataToExport = getVisibleData();
    if (dataToExport.length === 0) return;

    const doc = new jsPDF({ orientation: 'landscape' });
    
    const columns = [
        { header: 'Name', dataKey: 'fullName' },
        { header: 'Email', dataKey: 'email' },
        { header: 'Phone', dataKey: 'whatsappNumber' },
        { header: 'Institution', dataKey: 'institution' },
        { header: 'Committee 1', dataKey: 'committee1' },
        { header: 'Portfolio 1', dataKey: 'portfolio1_1' },
        { header: 'Portfolio 2', dataKey: 'portfolio1_2' },
        { header: 'Committee 2', dataKey: 'committee2' },
        { header: 'Status', dataKey: 'status' },
    ];

    const body = dataToExport.map(item => {
        return {
            fullName: item.fullName,
            email: item.email,
            whatsappNumber: item.whatsappNumber,
            institution: item.institution,
            committee1: item.committee1,
            portfolio1_1: item.portfolio1_1,
            portfolio1_2: item.portfolio1_2,
            committee2: item.committee2,
            status: item.status,
        };
    });

    doc.autoTable({
        columns: columns,
        body: body,
        styles: {
            fontSize: 8,
        },
        headStyles: {
            fillColor: [22, 160, 133], // theme color
            fontSize: 8,
        },
    });
    
    doc.save(`registrations-${activeTab}.pdf`);
  };


  return (
    <div className="space-y-4">
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Registration Requests</CardTitle>
                        <CardDescription>Showing {allData.length} total registration(s).</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="icon" disabled={getVisibleData().length === 0}>
                                    <Download className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Export Data</DialogTitle>
                                    <DialogDescription>
                                        Select the format to export the currently visible registration data.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="gap-2 sm:justify-center flex-wrap">
                                    <Button onClick={exportToCsv}>Export as CSV</Button>
                                    <Button onClick={exportToJson}>Export as JSON</Button>
                                    <Button onClick={exportToXlsx}>Export as XLSX</Button>
                                    <Button onClick={exportToPdf}>Export as PDF</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Button onClick={fetchData} variant="outline" size="icon" disabled={isPending}>
                            <RefreshCw className={cn('h-4 w-4', isPending && 'animate-spin')} />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Tabs defaultValue="all" onValueChange={setActiveTab}>
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
