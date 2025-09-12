
'use client';

import { useActionState, useEffect, useState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { handleRegistrationForm } from './actions';
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

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name is required.'),
  email: z.string().email('Please enter a valid email.'),
  altEmail: z.string().email('Please enter a valid alternate email.'),
  whatsappNumber: z.string().min(10, 'Please enter a valid WhatsApp number.'),
  altContactNumber: z.string().min(10, 'Alternate contact number is required.'),
  age: z.coerce.number().min(1, 'Age is required.'),
  grade: z.coerce.number().min(1, 'Grade is required.'),
  institution: z.string().min(2, 'Institution name is required.'),
  munExperience: z.coerce.number().min(0, 'MUN experience is required.'),
  committee1: z.string().min(1, 'Please select a committee.'),
  portfolio1_1: z.string().min(1, 'Delegate/Country preference is required.'),
  portfolio1_2: z.string().min(1, 'Alternate Delegate/Country is required.'),
  committee2: z.string().min(1, 'Please select a committee.'),
  questions: z.string().optional(),
  reference: z.string().optional(),
  paymentMethod: z.string(),
  paymentScreenshot: z.any().refine(files => files?.length == 1, 'Payment screenshot is required.'),
});


const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="lg" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Registration
        </Button>
    );
};


export default function RegistrationForm() {
  const { toast } = useToast();
  const [preview, setPreview] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formState, formAction] = useActionState(handleRegistrationForm, {
    success: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      altEmail: '',
      whatsappNumber: '',
      altContactNumber: '',
      age: '' as any,
      grade: '' as any,
      institution: '',
      munExperience: 0,
      committee1: '',
      portfolio1_1: '',
      portfolio1_2: '',
      committee2: '',
      questions: '',
      reference: '',
      paymentMethod: 'upi',
      paymentScreenshot: undefined,
    },
  });

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
      form.reset();
      setPreview(null);
      formRef.current?.reset();
    }
  }, [formState, toast, form]);


  const upiId = 'placeholder@fam';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!', description: text });
  };
  
  const { pending } = useFormStatus();

  return (
    <>
    <Form {...form}>
      <form ref={formRef} action={formAction} className="space-y-8">
        {/* Chapter I: Identity */}
        <Card>
          <CardHeader><CardTitle className="font-headline text-2xl">Chapter I: Identity</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="altEmail" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email Address (alt) *</FormLabel>
                        <FormControl><Input placeholder="Alternate email" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="whatsappNumber" render={({ field }) => (
                    <FormItem>
                        <FormLabel>WhatsApp Number *</FormLabel>
                        <FormControl><Input placeholder="+91 9XXXXXXXXX" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="altContactNumber" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Alternate Contact Number *</FormLabel>
                        <FormControl><Input placeholder="Required" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="age" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Age (numerals) *</FormLabel>
                        <FormControl><Input type="number" placeholder="e.g., 17" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="grade" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Grade (numerals) *</FormLabel>
                        <FormControl><Input type="number" placeholder="e.g., 12" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="institution" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Institution *</FormLabel>
                        <FormControl><Input placeholder="School/College" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="munExperience" render={({ field }) => (
                    <FormItem>
                        <FormLabel>MUN Experience (number) *</FormLabel>
                        <FormControl><Input type="number" placeholder="e.g., 5" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
            </div>
          </CardContent>
        </Card>

        {/* Chapter II: Preferences */}
        <Card>
          <CardHeader><CardTitle className="font-headline text-2xl">Chapter II: Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <FormField control={form.control} name="committee1" render={({ field }) => (
                <FormItem>
                    <FormLabel>Committee Preference 1 *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger></FormControl>
                        <SelectContent>
                            {conferences[0].committees.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="portfolio1_1" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Delegate/Country Preference 1 *</FormLabel>
                        <FormControl><Input placeholder="Top preference" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="portfolio1_2" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Delegate/Country Preference 2 *</FormLabel>
                        <FormControl><Input placeholder="Alternate preference" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
            </div>
            <FormField control={form.control} name="committee2" render={({ field }) => (
                <FormItem>
                    <FormLabel>Committee Preference 2 *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger></FormControl>
                        <SelectContent>
                             {conferences[0].committees.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}/>
            <FormField control={form.control} name="questions" render={({ field }) => (
                <FormItem>
                    <FormLabel>Any questions (optional)</FormLabel>
                    <FormControl><Textarea placeholder="Optional" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )}/>
            <FormField control={form.control} name="reference" render={({ field }) => (
                <FormItem>
                    <FormLabel>Reference (optional)</FormLabel>
                    <FormControl><Input placeholder="Name/phone/invite code" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )}/>
          </CardContent>
        </Card>

        {/* Chapter III: Tribute */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Chapter III: Tribute</CardTitle>
            <FormDescription>Early Bird: ₹2,299 per delegate (IPL: ₹2,299). Payment & proof are required.</FormDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                <FormItem>
                    <FormLabel>Payment Method *</FormLabel>
                    <div className="relative">
                        <FormControl>
                            <Input value={`UPI: ${upiId}`} readOnly name={field.name} />
                        </FormControl>
                        <Button type="button" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-8" onClick={() => copyToClipboard(upiId)}>
                            <Copy className="h-4 w-4 mr-2" /> Copy
                        </Button>
                    </div>
                    <FormMessage />
                </FormItem>
            )}/>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <FormField
                control={form.control}
                name="paymentScreenshot"
                render={({ field: { onChange, value, ...rest }}) => (
                    <FormItem>
                    <FormLabel>Upload Payment Screenshot *</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input 
                                type="file" 
                                accept="image/png, image/jpeg, image/webp"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                {...rest}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    onChange(e.target.files);
                                    if (file) {
                                        setPreview(URL.createObjectURL(file));
                                    } else {
                                        setPreview(null);
                                    }
                                }}
                            />
                            <div className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-6 text-center">
                                {preview ? (
                                    <Image src={preview} alt="Screenshot preview" width={200} height={200} className="mx-auto rounded-md" />
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
                    <FormMessage />
                    </FormItem>
                )}
                />

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
                 <SubmitButton />
                <Button type="button" variant="outline" size="lg" onClick={() => console.log("Draft saved!")} disabled={pending}>
                    Save Draft
                </Button>
            </CardContent>
        </Card>

      </form>
    </Form>
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
