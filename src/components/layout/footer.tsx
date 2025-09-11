export default function Footer() {
    return (
      <footer className="border-t border-border/40 py-6 md:py-8">
        <div className="container flex items-center justify-center">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} DavRohini MUN. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
  