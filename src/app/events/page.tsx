import { Clock, MapPin } from 'lucide-react';

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
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Event Schedule
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          The complete timeline for the Dav Rohini MUN 2025 conference.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {schedule.map((day) => (
          <div key={day.day}>
            <div className="flex items-center mb-8">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 font-headline text-lg font-bold text-primary-foreground">
                  {day.day}
                </span>
              </div>
              <div className="ml-4 border-t border-dashed border-border/70 flex-grow h-px"></div>
              <div className="ml-4 flex-shrink-0">
                <span className="font-semibold text-lg text-muted-foreground">{day.date}</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-6 h-full w-0.5 bg-border/70 -translate-x-1/2"></div>
              {day.events.map((event, index) => (
                <div key={index} className="relative pl-12 mb-8">
                   <div className="absolute top-1 left-6 h-3 w-3 bg-primary rounded-full -translate-x-1/2"></div>
                    <p className="font-mono text-sm text-primary">{event.time}</p>
                    <h3 className="font-headline text-xl font-semibold mt-1">{event.title}</h3>
                    <p className="flex items-center mt-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2"/>
                      {event.location}
                    </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}