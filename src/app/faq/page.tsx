import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  const faqItems = [
    {
      question: "What is Model United Nations (MUN)?",
      answer: "Model United Nations is an educational simulation and/or academic activity in which students can learn about diplomacy, international relations, and the United Nations. Participants in MUN conferences, known as delegates, are placed in committees and assigned countries to represent. They are presented with their assignments in advance, along with a topic or topics that their committee will discuss.",
    },
    {
      question: "Who can participate in DavRohini MUN?",
      answer: "Participation is open to all high school students. We welcome both beginners and experienced delegates. Please check the registration details for our upcoming conference for specific eligibility criteria.",
    },
    {
      question: "How do I register for a conference?",
      answer: "Registration details for our annual conference and other events are posted on our 'Events' page. You can typically register as a delegation (from a school) or as an individual delegate. Follow the instructions on the registration form provided.",
    },
    {
      question: "What is a position paper?",
      answer: "A position paper is a document that details your assigned country's stance on the topics being discussed in your committee. It is usually one to two pages long and serves as a starting point for your research and debate. You can find guidelines on how to write one in our 'Resources' section.",
    },
    {
        question: "What is the dress code for the conference?",
        answer: "The dress code for all our conferences is Western Business Attire. This means suits for male participants and formal business wear for female participants. Traditional formal wear of your country is also acceptable."
    },
    {
        question: "Do I need to have prior experience to participate?",
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
            Find answers to common questions about our Model UN club and conferences.
          </p>
        </div>
  
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    );
  }