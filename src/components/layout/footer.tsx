'use client';

import { Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const footerNavLinks = [
    { href: '/events', label: 'Schedule' },
    { href: '/committees', label: 'Committees' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <>
      <footer className="border-t border-border/40 bg-background">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Column 1: Logo and Motto */}
            <div className="flex flex-col items-start">
                <Link href="/" className="flex items-center space-x-2">
                  <Image
                    src="https://i.postimg.cc/RFcZTyGf/image.png"
                    alt="DavRohini MUN Logo"
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                  <div className="flex flex-col">
                      <span className="font-bold font-headline text-lg">
                      DAV Rohini
                      </span>
                      <span className="text-sm text-muted-foreground">Public School MUN</span>
                  </div>
                </Link>
              <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                Fostering diplomacy, leadership, and global awareness.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                {footerNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                 <li>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                          Location Map
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                          <DialogTitle>School Location</DialogTitle>
                        </DialogHeader>
                        <div className="aspect-video">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.813635798835!2d77.112117!3d28.725224999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d01b924976c69%3A0x442342e0325658d!2sDAV%20Public%20School%2C%20Rohini!5e0!3m2!1sen!2sin!4v1720547370388!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </li>
              </ul>
            </div>

            {/* Column 3: Contact Us */}
            <div>
              <h3 className="font-headline text-lg font-semibold">Contact Us</h3>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p>
                  Email:{" "}
                  <a
                    href="mailto:davpsrohini85@gmail.com"
                    className="hover:text-foreground transition-colors"
                  >
                    davpsrohini85@gmail.com
                  </a>
                </p>
                <p>Phone: 46054892, 8595003414</p>
                <p>Sector 7, Rohini, New - Delhi 110085</p>
              </div>
            </div>
            
            {/* Column 4: Follow Us */}
            <div>
                <h3 className="font-headline text-lg font-semibold">Follow Us</h3>
                <div className="mt-4 flex space-x-4">
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Facebook className="h-6 w-6" />
                        <span className="sr-only">Facebook</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Instagram className="h-6 w-6" />
                        <span className="sr-only">Instagram</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Youtube className="h-6 w-6" />
                        <span className="sr-only">YouTube</span>
                    </Link>
                </div>
            </div>
          </div>

          <div className="mt-12 border-t border-border/40 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Dav Rohini Public School. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
