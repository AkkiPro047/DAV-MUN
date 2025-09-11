import ContactForm from "./contact-form";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Get In Touch
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Have a question or want to get involved? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-xl">
        <ContactForm />
      </div>
    </div>
  );
}
