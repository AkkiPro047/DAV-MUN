import { Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/data";

const footerNavLinks = [
    { href: '/events', label: 'Schedule' },
    { href: '/committees', label: 'Committees' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
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
  );
}
