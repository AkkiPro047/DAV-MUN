import { ArrowRight, Shield, Users, Landmark, Camera, Swords } from "lucide-react";
import { conferences } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const committeeIcons: { [key: string]: React.ElementType } = {
  unsc: Shield,
  disec: Shield,
  unhrc: Users,
  who: Users,
  uncsw: Users, 
  aippm: Landmark,
  ipc: Camera,
  ipl: Swords,
  'default': Shield
};

export default function CommitteesPage() {
  const currentConference = conferences.find(c => c.id === 1); 

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Committees
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Explore the diverse range of committees and agendas for this year&apos;s conference.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        {currentConference?.committees.map((committee) => {
           const Icon = committeeIcons[committee.id] || committeeIcons['default'];
          return (
          <Card key={committee.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <CardTitle className="font-headline text-xl leading-tight">{committee.name}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <div className="flex-grow">
                <p className="font-semibold text-muted-foreground mb-2">Agenda:</p>
                <p className="text-foreground/90">
                  {committee.topic}
                </p>
              </div>
              <Button asChild className="mt-6 w-fit">
                <Link href="#">
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )})}
      </div>
    </div>
  );
}
