import Image from 'next/image';
import { newsItems } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="space-y-4 text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          News & Updates
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Stay informed with the latest announcements, conference highlights, and delegate achievements from DavRohini MUN.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item) => (
          <Card key={item.id} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative h-56 w-full">
               <Image
                src={item.image.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
                data-ai-hint={item.image.imageHint}
              />
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
              <CardDescription>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{item.summary}</p>
            </CardContent>
            <CardFooter>
                <Button variant="link" className="p-0 text-primary-foreground/80 hover:text-primary-foreground">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
