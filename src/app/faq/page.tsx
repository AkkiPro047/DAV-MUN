import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  const faqItems = [
    {
      question: "What is a Model United Nations (MUN)?",
      answer: "Model United Nations is an educational simulation and/or academic activity in which students can learn about diplomacy, international relations, and the United Nations. Participants in MUN conferences, known as delegates, are placed in committees and assigned countries to represent. They are presented with their assignments in advance, along with a topic or topics that their committee will discuss.",
    },
    {
      question: "Who can participate in the MUN?",
      answer: "Participation is open to all high school students. We welcome both beginners and experienced delegates. Please check the registration details for our upcoming conference for specific eligibility criteria.",
    },
    {
        question: "What is the dress code for the event?",
        answer: "The dress code for all our conferences is Western Business Attire. This means suits for male participants and formal business wear for female participants. Traditional formal wear of your country is also acceptable."
    },
    {
        question: "Do I need prior MUN experience?",
        answer: "Not at all! We encourage students of all experience levels to join. We offer workshops and resources for beginners to help them get acquainted with the rules of procedure and what to expect during a conference."
    }
  ];
  
  export default function FaqPage() {
    return (
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <div className="space-y-4 text-center mb-12">
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Find answers to common queries about the MUN conference.
          </p>
        </div>
  
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-lg border-border/40">
                <AccordionTrigger className="text-left font-semibold text-base hover:no-underline px-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground px-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    );
  }
