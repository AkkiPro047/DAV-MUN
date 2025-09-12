'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Menu, X, Crown } from 'lucide-react';
import { navLinks } from '@/lib/data';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { ADMIN_UID } from '@/lib/constants';

const allNavLinks = [...navLinks, { href: '/faq', label: 'FAQ' }];

export default function Header() {
  const pathname = usePathname();
  const { user, logout, authLoading } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = user?.uid === ADMIN_UID;

  const authNavLinks = user
    ? [
        ...(isAdmin ? [{ href: '/admin', label: 'Admin', variant: 'destructive' as const }] : []),
        { href: '#', label: 'Logout', onClick: logout, variant: 'outline' as const },
      ]
    : [
        { href: '/login', label: 'Login', variant: 'outline' as const },
        { href: '/register', label: 'Register', variant: 'default' as const },
        { href: '/track-submission', label: 'Track Submission', variant: 'outline' as const },
      ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="https://i.postimg.cc/RFcZTyGf/image.png" alt="DavRohini MUN Logo" width={24} height={24} className="h-6 w-6 rounded-full" />
            <span className="font-bold font-headline sm:inline-block">
              DavRohini MUN
            </span>
          </Link>
        </div>
        
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {allNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === link.href ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden items-center gap-2 md:flex">
             {authNavLinks.map((link) => (
                <Button key={link.label} asChild={!link.onClick} variant={link.variant || 'outline'} size="sm" onClick={link.onClick}>
                    {!link.onClick ? (
                      <Link href={link.href}>
                        {link.label === 'Admin' && <Crown className="mr-2 h-4 w-4" />}
                        {link.label}
                      </Link>
                    ) : (
                      <>
                        {link.label}
                      </>
                    )}
                </Button>
            ))}
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
               <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
               <SheetDescription className="sr-only">Main navigation links for mobile devices.</SheetDescription>
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-6 pr-6">
                  <Link href="/" className="flex items-center space-x-2">
                    <Image src="https://i.postimg.cc/RFcZTyGf/image.png" alt="DavRohini MUN Logo" width={24} height={24} className="h-6 w-6 rounded-full" />
                    <span className="font-bold font-headline">DavRohini MUN</span>
                  </Link>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <nav className="grid items-start gap-4 px-2 py-6">
                    {[...allNavLinks, ...authNavLinks].map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={() => {
                            if (link.onClick) link.onClick();
                            setMobileMenuOpen(false)
                          }}
                          className={cn(
                              'flex items-center rounded-md px-3 py-2 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                              pathname === link.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                          )}
                        >
                          {link.label === 'Admin' && <Crown className="mr-2 h-4 w-4" />}
                          {link.label}
                        </Link>
                    ))}
                    </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
