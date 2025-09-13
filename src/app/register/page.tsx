import RegistrationForm from "./registration-form"; 

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="space-y-4 text-center mb-12">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Delegate Registration
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Complete the form below to register for Dav Rohini MUN 2025.
            </p>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
}
