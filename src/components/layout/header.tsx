'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/data';
import Image from 'next/image';

const allNavLinks = [...navLinks, { href: '/faq', label: 'FAQ' }];


export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="https://i.postimg.cc/RFcZTyGf/image.png" alt="DavRohini MUN Logo" width={24} height={24} className="h-6 w-6" />
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
                <div className="flex items-center justify-between border-b pb-6">
                  <Link href="/" className="flex items-center space-x-2">
                    <Image src="https://i.postimg.cc/RFcZTyGf/image.png" alt="DavRohini MUN Logo" width={24} height={24} className="h-6 w-6" />
                    <span className="font-bold font-headline">DavRohini MUN</span>
                  </Link>
                  <SheetTrigger asChild>
                     <Button variant="ghost" className="px-2" onClick={() => setMobileMenuOpen(false)}>
                       <X className="h-6 w-6" />
                       <span className="sr-only">Close Menu</span>
                     </Button>
                  </SheetTrigger>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <nav className="grid items-start gap-4 px-2 py-6">
                    {allNavLinks.map((link) => (
                        <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                            'flex items-center rounded-md px-3 py-2 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                            pathname === link.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                        )}
                        >
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
