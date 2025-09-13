'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { UserRecord } from './actions';
import { ADMIN_UID } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<UserRecord>[] = [
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-2">
          <span>{user.email}</span>
          {user.uid === ADMIN_UID && <Badge>Admin</Badge>}
        </div>
      );
    }
  },
  {
    accessorKey: 'displayName',
    header: 'Display Name',
    cell: ({ row }) => row.getValue('displayName') || 'N/A',
  },
  {
    accessorKey: 'creationTime',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created On
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
