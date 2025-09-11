import Image from 'next/image';
import { Gavel, Globe, Users, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: Gavel,
    title: 'Formal Proceedings',
    description: 'Experience formal debates following official UN rules of procedure.',
  },
  {
    icon: Globe,
    title: 'International Relations',
    description: 'Engage with global issues and understand diverse international perspectives.',
  },
  {
    icon: Users,
    title: 'Expert Panels',
    description: 'Learn from seasoned diplomats and experts in various fields.',
  },
  {
    icon: MessageSquare,
    title: 'Live Announcements',
    description: 'Stay updated with real-time announcements and schedule changes.',
  },
];

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

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">Why Join Us?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover the unique features of our MUN conference.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:grid-cols-4 md:gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="grid gap-4 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="grid gap-1.5">
                    <h3 className="text-lg font-bold font-headline">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
