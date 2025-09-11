import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Library } from "lucide-react";
import { conferences } from "@/lib/data";

export default function CommitteesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Committee & Topic Browser
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Browse the committees and topics being simulated at our upcoming conferences.
        </p>
      </div>

      <Accordion type="multiple" defaultValue={[conferences[0].name]} className="w-full max-w-4xl mx-auto">
        {conferences.map((conference) => (
          <AccordionItem key={conference.id} value={conference.name}>
            <AccordionTrigger className="font-headline text-xl">
                {conference.name}
            </AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[35%] font-semibold">Committee</TableHead>
                    <TableHead className="font-semibold">Topic</TableHead>
                    <TableHead className="text-right font-semibold">Background Guide</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conference.committees.map((committee) => (
                    <TableRow key={committee.id}>
                      <TableCell className="font-medium">{committee.name}</TableCell>
                      <TableCell>{committee.topic}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild>
                          <a href={committee.guideUrl} download>
                            <Download className="h-5 w-5" />
                            <span className="sr-only">Download guide</span>
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
