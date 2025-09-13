'use client';

import { useEffect, useState, useTransition } from 'react';
import { getUsers, UserRecord } from './actions';
import { columns } from './columns';
import { DataTable } from './data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function UsersListPage() {
  const [data, setData] = useState<UserRecord[]>([]);
  const [isPending, startTransition] = useTransition();

  const fetchData = () => {
    startTransition(async () => {
      const users = await getUsers();
      setData(users);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Users</h2>
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
