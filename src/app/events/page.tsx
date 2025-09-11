'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { events } from '@/lib/data';
import { CalendarDays } from 'lucide-react';

export default function EventsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const eventDates = events.map(event => event.date.toDateString());

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Conference & Events Calendar
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Explore upcoming Model UN conferences, workshops, and club meetings.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="flex justify-center items-start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
              event: (d) => eventDates.includes(d.toDateString())
            }}
            modifiersStyles={{
              event: {
                border: '2px solid hsl(var(--primary))',
                color: 'hsl(var(--primary))'
              }
            }}
          />
        </div>
        
        <div className="space-y-6">
          <h2 className="font-headline text-2xl font-semibold flex items-center">
            <CalendarDays className="mr-3 h-6 w-6" />
            Upcoming Events
          </h2>
          <div className="space-y-4">
            {events
                .filter(event => event.date >= new Date())
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .map(event => (
              <Card key={event.id} className="transition-all hover:bg-accent">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="font-headline text-lg">{event.title}</CardTitle>
                        <CardDescription className="mt-1">{event.description}</CardDescription>
                    </div>
                    <div className="text-right text-sm text-muted-foreground whitespace-nowrap pl-4">
                        <div className="font-medium">{event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                        <div>{event.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
