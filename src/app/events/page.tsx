import { Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const schedule = [
  {
    day: 'Day 1',
    date: 'October 25, 2025',
    events: [
      { time: '09:00 - 10:00', title: 'Registration & Breakfast', location: 'Main Hall' },
      { time: '10:00 - 11:30', title: 'Opening Ceremony', location: 'Auditorium' },
      { time: '11:30 - 13:00', title: 'Committee Session I', location: 'Assigned Rooms' },
      { time: '13:00 - 14:00', title: 'Lunch', location: 'Cafeteria' },
      { time: '14:00 - 16:30', title: 'Committee Session II', location: 'Assigned Rooms' },
    ],
  },
  {
    day: 'Day 2',
    date: 'October 26, 2025',
    events: [
      { time: '09:30 - 12:30', title: 'Committee Session III', location: 'Assigned Rooms' },
      { time: '12:30 - 13:30', title: 'Lunch', location: 'Cafeteria' },
      { time: '13:30 - 15:30', title: 'Committee Session IV', location: 'Assigned Rooms' },
      { time: '16:00 - 17:30', title: 'Closing Ceremony & Awards', location: 'Auditorium' },
      { time: '17:30 - 18:30', title: 'High Tea', location: 'Main Hall' },
    ],
  },
];

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="space-y-4 text-center mb-16">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Event Schedule
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          The complete timeline for the Dav Rohini MUN 2025 conference.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-16">
        {schedule.map((day) => (
          <div key={day.day} className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-4 h-[calc(100%_-_2rem)] w-0.5 bg-border/70 -translate-x-1/2" />

            <div className="relative pl-12 space-y-8">
                {/* Day Header */}
                <div>
                    <div className="absolute top-0 left-4 w-4 h-4 bg-primary rounded-full -translate-x-1/2" />
                    <h2 className="font-headline text-2xl font-bold">{day.day}</h2>
                    <p className="text-muted-foreground">{day.date}</p>
                </div>

                {/* Events */}
                {day.events.map((event, index) => (
                    <div key={index} className="relative">
                        <div className="absolute top-1 left-[-2.1rem] h-3 w-3 bg-primary/70 rounded-full -translate-x-1/2" />
                        <Card className="bg-card/60">
                            <CardContent className="p-4 grid grid-cols-[1fr_2fr] items-center gap-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                                    <Clock className="h-4 w-4" />
                                    <span>{event.time}</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base">{event.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}