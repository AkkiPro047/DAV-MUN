'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { ADMIN_UID } from '@/lib/constants';
import { Loader2, Users, FileText, UserPlus, LogOut, UserCog } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const adminNavLinks = [
  { href: '/admin/registrations', label: 'Registrations', icon: FileText },
  { href: '/admin/users/list', label: 'Manage Users', icon: UserCog },
  { href: '/admin/users/add', label: 'Add User', icon: UserPlus },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, authLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.uid !== ADMIN_UID) {
        router.replace('/login');
      }
    }
  }, [user, authLoading, router]);

  if (authLoading || !user || user.uid !== ADMIN_UID) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Users className="h-6 w-6" />
            <span>Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {adminNavLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={pathname.startsWith(link.href) ? 'secondary' : 'ghost'}
                  className="w-full justify-start gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto p-4">
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={logout}>
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
            </Button>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <h1 className="text-xl font-semibold">
                {adminNavLinks.find(l => pathname.startsWith(l.href))?.label || 'Dashboard'}
            </h1>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
