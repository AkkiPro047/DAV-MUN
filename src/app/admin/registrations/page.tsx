'use client';

import { useEffect, useState, useTransition } from 'react';
import { getRegistrations, Registration } from './actions';
import { columns } from './columns';
import { DataTable } from './data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

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
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Delegate Registrations</h2>
            <Button onClick={fetchData} variant="outline" size="icon" disabled={isPending}>
                <RefreshCw className={cn('h-4 w-4', isPending && 'animate-spin')} />
            </Button>
        </div>
        
        {isPending && data.length === 0 ? (
            <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        ) : (
            <DataTable columns={columns} data={data} refreshData={fetchData} />
        )}
    </div>
  );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
