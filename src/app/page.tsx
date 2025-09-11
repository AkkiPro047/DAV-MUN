import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <section className="flex flex-1 items-center justify-center py-24 md:py-32">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="mb-6 flex items-center justify-center space-x-3">
            <Image
              src="https://i.postimg.cc/RFcZTyGf/image.png"
              alt="DavRohini MUN Logo"
              width={56}
              height={56}
              className="h-14 w-14"
            />
            <div className="text-left">
              <h2 className="font-headline text-2xl font-bold tracking-tight text-foreground">
                DAV Rohini
              </h2>
              <p className="text-md text-muted-foreground">
                Public School MUN
              </p>
            </div>
          </div>

          <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            Dav Rohini Model United Nations 2025
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            A platform for young leaders to debate, deliberate, and design
            solutions for a better tomorrow. Join us for an unforgettable
            experience.
          </p>
        </div>
      </section>
    </div>
  );
}