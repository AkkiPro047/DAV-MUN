
'use client';

import { useActionState, useEffect, useState, useRef, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { handleRegistrationForm, uploadImageToImgBB } from './actions';
import { Copy, Loader2, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { conferences } from '@/lib/data';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const SubmitButton = () => {
    const [isPending, startTransition] = useTransition();
    return (
        <Button type="submit" size="lg" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Registration
        </Button>
    );
};


export default function RegistrationForm() {
  const { toast } = useToast();
  const [preview, setPreview] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [paymentScreenshotUrl, setPaymentScreenshotUrl] = useState('');
  
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formState, formAction] = useActionState(handleRegistrationForm, {
    success: false,
  });
  
  const [isPending, startTransition] = useTransition();


  useEffect(() => {
    if (formState.message && !formState.success) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: formState.message,
      });
    }

    if (formState.success && formState.trackingId) {
      toast({
        title: 'Registration Successful!',
        description: "We've received your registration.",
      });
      setTrackingId(formState.trackingId);
      setShowSuccessDialog(true);
      formRef.current?.reset();
      setPreview(null);
      setPaymentScreenshotUrl('');
      localStorage.removeItem('registrationDraft');
    }
  }, [formState, toast]);


  const upiId = 'placeholder@fam';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!', description: text });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setIsUploading(true);
    setPaymentScreenshotUrl('');

    const formData = new FormData();
    formData.append('image', file);

    const result = await uploadImageToImgBB(formData);

    setIsUploading(false);

    if (result.success && result.url) {
        setPaymentScreenshotUrl(result.url);
        toast({
            title: 'Image Uploaded!',
            description: 'Your payment screenshot is ready.',
        });
    } else {
        toast({
            variant: 'destructive',
            title: 'Upload Failed',
            description: result.message || 'Could not upload the image.',
        });
        setPreview(null);
    }
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
        formAction(formData);
    });
  }

  return (
    <>
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
        <input type="hidden" name="paymentScreenshotUrl" value={paymentScreenshotUrl} />
        {/* Chapter I: Identity */}
        <Card>
          <CardHeader><CardTitle className="font-headline text-2xl">Chapter I: Identity</CardTitle></CardHeader>
          <CardContent className="space-y-6">
             <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl><Input name="fullName" placeholder="Your full name" required /></FormControl>
            </FormItem>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl><Input name="email" type="email" placeholder="you@example.com" required /></FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel>Email Address (alt) *</FormLabel>
                    <FormControl><Input name="altEmail" type="email" placeholder="Alternate email" required /></FormControl>
                </FormItem>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormItem>
                    <FormLabel>WhatsApp Number *</FormLabel>
                    <FormControl>
                        <div className="flex items-center">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-background text-sm text-muted-foreground h-10">
                            +91
                            </span>
                            <Input name="whatsappNumber" placeholder="9XXXXXXXXX" className="rounded-l-none" required />
                        </div>
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel>Alternate Contact Number *</FormLabel>
                    <FormControl>
                        <div className="flex items-center">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-background text-sm text-muted-foreground h-10">
                            +91
                            </span>
                            <Input name="altContactNumber" placeholder="9XXXXXXXXX" className="rounded-l-none" required />
                        </div>
                    </FormControl>
                </FormItem>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormItem>
                    <FormLabel>Age (numerals) *</FormLabel>
                    <FormControl><Input name="age" type="number" placeholder="e.g., 17" required /></FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel>Grade (numerals) *</FormLabel>
                    <FormControl><Input name="grade" type="number" placeholder="e.g., 12" required /></FormControl>
                </FormItem>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormItem>
                    <FormLabel>Institution *</FormLabel>
                    <FormControl><Input name="institution" placeholder="School/College" required /></FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel>MUN Experience (number) *</FormLabel>
                    <FormControl><Input name="munExperience" type="number" placeholder="e.g., 5" required /></FormControl>
                </FormItem>
            </div>
          </CardContent>
        </Card>

        {/* Chapter II: Preferences */}
        <Card>
          <CardHeader><CardTitle className="font-headline text-2xl">Chapter II: Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-6">
             <FormItem>
                <FormLabel>Committee Preference 1 *</FormLabel>
                <Select name="committee1" required>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger></FormControl>
                    <SelectContent>
                        {conferences[0].committees.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                    </SelectContent>
                </Select>
            </FormItem>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormItem>
                    <FormLabel>Delegate/Country Preference 1 *</FormLabel>
                    <FormControl><Input name="portfolio1_1" placeholder="Top preference" required /></FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel>Delegate/Country Preference 2 *</FormLabel>
                    <FormControl><Input name="portfolio1_2" placeholder="Alternate preference" required /></FormControl>
                </FormItem>
            </div>
            <FormItem>
                <FormLabel>Committee Preference 2 *</FormLabel>
                <Select name="committee2" required>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger></FormControl>
                    <SelectContent>
                         {conferences[0].committees.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                    </SelectContent>
                </Select>
            </FormItem>
            <FormItem>
                <FormLabel>Any questions (optional)</FormLabel>
                <FormControl><Textarea name="questions" placeholder="Optional" /></FormControl>
            </FormItem>
            <FormItem>
                <FormLabel>Reference (optional)</FormLabel>
                <FormControl><Input name="reference" placeholder="Name/phone/invite code" /></FormControl>
            </FormItem>
          </CardContent>
        </Card>

        {/* Chapter III: Tribute */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Chapter III: Tribute</CardTitle>
            <FormDescription>Early Bird: ₹2,299 per delegate (IPL: ₹2,299). Payment & proof are required.</FormDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <FormItem>
                <FormLabel>Payment Method *</FormLabel>
                <div className="relative">
                    <FormControl>
                        <Input name="paymentMethod" value={`UPI: ${upiId}`} readOnly />
                    </FormControl>
                    <Button type="button" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-8" onClick={() => copyToClipboard(upiId)}>
                        <Copy className="h-4 w-4 mr-2" /> Copy
                    </Button>
                </div>
            </FormItem>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <FormItem>
                    <FormLabel>Upload Payment Screenshot *</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input 
                                type="file"
                                name="paymentScreenshotFile"
                                accept="image/png, image/jpeg, image/webp"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                                disabled={isUploading}
                                required={!paymentScreenshotUrl}
                            />
                            <div className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-6 text-center flex justify-center items-center min-h-[150px]">
                                {isUploading ? (
                                    <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                                ) : preview ? (
                                    <Image src={preview} alt="Screenshot preview" width={200} height={200} className="mx-auto rounded-md object-contain max-h-[150px]" />
                                ) : (
                                    <div className="space-y-2">
                                        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                                        <p className="text-muted-foreground">Click to choose file</p>
                                        <p className="text-xs text-muted-foreground">JPG/PNG/WEBP/JPEG</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </FormControl>
                </FormItem>

                <div className="flex flex-col items-center">
                    <p className="font-semibold mb-2">Scan UPI QR</p>
                    <Image src="https://i.postimg.cc/d1grCj2z/qr-code.png" alt="UPI QR Code" width={150} height={150} className="rounded-md border p-1" />
                    <p className="text-xs text-muted-foreground mt-2 text-center">After paying, upload your screenshot above.</p>
                </div>
            </div>
          </CardContent>
        </Card>

        {/* Chapter IV: Final Step */}
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Chapter IV: Final Step</CardTitle>
                <FormDescription>
                Please double-check details. On submit, don’t refresh or go back until it finishes.
                </FormDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
                 <Button type="submit" size="lg" disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Registration
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={() => {}} disabled={isPending}>
                    Save Draft
                </Button>
            </CardContent>
        </Card>

      </form>
    <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Registration Submitted!</AlertDialogTitle>
            <AlertDialogDescription>
              Your registration has been received. Please save your tracking ID to check your application status.
              <div className="mt-4 bg-muted p-3 rounded-md">
                <p className="font-mono text-sm text-foreground break-all">{trackingId}</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => copyToClipboard(trackingId)}>
                <Copy className="mr-2 h-4 w-4" /> Copy ID
            </Button>
            <AlertDialogAction onClick={() => setShowSuccessDialog(false)}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
