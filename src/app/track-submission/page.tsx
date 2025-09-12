
import TrackingForm from "./tracking-form";

export default function TrackSubmissionPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Track Submission
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Enter your tracking ID to check the status of your registration.
        </p>
      </div>

      <div className="mx-auto max-w-xl">
        <TrackingForm />
      </div>
    </div>
  );
}
