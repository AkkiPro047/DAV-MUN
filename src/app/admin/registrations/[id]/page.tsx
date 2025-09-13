'use client';

import { useEffect, useState, useTransition } from 'react';
import { getRegistrationById, Registration, updateRegistrationStatus, updateRegistrationResponse } from '../actions';
import { notFound, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Mail, Phone, User, XCircle, FileText, Landmark, Users, Briefcase, Hash, Info, MessageSquare, Link as LinkIcon, Image as ImageIcon, Loader2, Save, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';


function DetailCard({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: React.ReactNode }) {
    if (!value) return null;
    return (
        <Card className="bg-card/50">
            <CardContent className="p-4">
                <div className="flex items-start gap-4">
                    <div className="text-muted-foreground pt-1">
                        <Icon className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <p className="font-medium text-base break-words">{String(value)}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

type Allotment = {
    committee: string;
    portfolio: string;
}

export default function RegistrationDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { toast } = useToast();
    const [registration, setRegistration] = useState<Registration | null>(null);
    const [adminResponse, setAdminResponse] = useState('');
    const [isPending, startTransition] = useTransition();
    const [actionPending, startActionTransition] = useTransition();
    const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [allotment, setAllotment] = useState<Allotment | null>(null);


    useEffect(() => {
        startTransition(async () => {
            const data = await getRegistrationById(params.id);
            if (!data) {
                notFound();
            }
            setRegistration(data);
            setAdminResponse(data.adminResponse || '');
            if (data.committee1 && data.portfolio1_1) {
                setAllotment({ committee: data.committee1, portfolio: data.portfolio1_1 });
            }
        });
    }, [params.id]);

    const handleStatusChange = (status: 'approved' | 'rejected') => {
        if (!registration) return;
        startActionTransition(async () => {
            const result = await updateRegistrationStatus(registration.id, status);
            if (result.success) {
                toast({ title: 'Status Updated', description: `Registration is now ${status}.` });
                setRegistration(prev => prev ? { ...prev, status } : null);
            } else {
                toast({ variant: 'destructive', title: 'Update Failed', description: 'Could not update status.' });
            }
        });
    };
    
    const handleResponseSave = () => {
        if (!registration) return;
        startActionTransition(async () => {
            const result = await updateRegistrationResponse(registration.id, adminResponse);
            if (result.success) {
                toast({ title: 'Response Saved', description: 'Your response has been saved.' });
                setRegistration(prev => prev ? { ...prev, adminResponse } : null);
            } else {
                toast({ variant: 'destructive', title: 'Save Failed', description: 'Could not save the response.' });
            }
        });
    }

    const generateConfirmationMessage = () => {
        if (!registration || !allotment) return '';
        const message = `Hello ${registration.fullName},\n\nYour MUN Delegate form had been Approved ✅\n\nWe have given you the ${allotment.committee} Committee.\nYour Portfolio - ${allotment.portfolio}\n\nLooking forward for your Enthusiastic Participation.\nJoin WhatsApp Group for Further Announcements.\n\n》 Link of WhatsApp Group: [WhatsApp Link will be updated later]\n\nBest Regards,\nTeam DAVPS MUN Secretariat`;
        return message;
    }

    const handleSendWhatsApp = () => {
        if (!registration) return;
        const message = generateConfirmationMessage();
        const whatsappUrl = `https://wa.me/${registration.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        setConfirmDialogOpen(false);
    }
    
    const handleSendEmail = () => {
        if (!registration) return;
        const subject = "Confirmation for DAV Rohini MUN 2025";
        const body = generateConfirmationMessage();
        const mailtoUrl = `mailto:${registration.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
        setConfirmDialogOpen(false);
    }

    const handlePortfolioSelection = (value: string) => {
        if (!registration) return;
        const [committee, portfolio] = value.split('||');
        setAllotment({ committee, portfolio });
    };


    if (isPending || !registration) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
            </div>
        );
    }

    const getStatusVariant = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'approved': return 'default';
            case 'pending': return 'secondary';
            case 'rejected': return 'destructive';
            default: return 'outline';
        }
    };
    
    const portfolioOptions = [
        { committee: registration.committee1, portfolio: registration.portfolio1_1, label: `Committee 1: ${registration.committee1} - ${registration.portfolio1_1}` },
        { committee: registration.committee1, portfolio: registration.portfolio1_2, label: `Committee 1: ${registration.committee1} - ${registration.portfolio1_2}` },
        { committee: registration.committee2, portfolio: 'N/A', label: `Committee 2: ${registration.committee2}` },
    ];
    

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Registration Details</h1>
                    <p className="text-muted-foreground">Reviewing application for {registration.fullName}.</p>
                </div>
            </div>

            <Card>
                <CardContent className="p-6 space-y-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold">{registration.fullName}</h2>
                            <p className="text-sm text-muted-foreground">
                                Submitted on: {new Date(registration.createdAt).toLocaleString()}
                            </p>
                        </div>
                        <Badge variant={getStatusVariant(registration.status)} className="capitalize text-base">
                            {registration.status}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DetailCard icon={Mail} label="Email" value={registration.email} />
                <DetailCard icon={Mail} label="Alternate Email" value={registration.altEmail} />
                <DetailCard icon={Phone} label="WhatsApp Number" value={registration.whatsappNumber} />
                <DetailCard icon={Phone} label="Alternate Contact" value={registration.altContactNumber} />
                <DetailCard icon={User} label="Age" value={registration.age} />
                <DetailCard icon={FileText} label="Grade" value={registration.grade} />
                <DetailCard icon={Landmark} label="Institution" value={registration.institution} />
                <DetailCard icon={Briefcase} label="MUN Experience" value={`${registration.munExperience} MUNs`} />
                <DetailCard icon={Users} label="Committee Pref 1" value={registration.committee1} />
                <DetailCard icon={Hash} label="Portfolio Preference 1" value={registration.portfolio1_1} />
                <DetailCard icon={Hash} label="Portfolio Preference 2" value={registration.portfolio1_2} />
                <DetailCard icon={Users} label="Committee Pref 2" value={registration.committee2} />
                <DetailCard icon={MessageSquare} label="Questions" value={registration.questions} />
                <DetailCard icon={Info} label="Reference" value={registration.reference} />
                <DetailCard icon={LinkIcon} label="Payment Method" value={registration.paymentMethod} />
                
                <Card className="bg-card/50">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                            <div className="text-muted-foreground pt-1">
                                <ImageIcon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Payment Screenshot</p>
                                <a href={registration.paymentScreenshotUrl} target="_blank" rel="noopener noreferrer">
                                    <Image src={registration.paymentScreenshotUrl} alt="Payment Screenshot" width={200} height={200} className="mt-2 rounded-md object-contain border" />
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
             <Card>
                <CardHeader>
                    <CardTitle>Admin Response</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea 
                        placeholder="Provide feedback or a note for the applicant..."
                        value={adminResponse}
                        onChange={(e) => setAdminResponse(e.target.value)}
                        rows={4}
                    />
                    <Button onClick={handleResponseSave} disabled={actionPending}>
                        {actionPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Save Response
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6 flex items-center gap-4">
                    <Button onClick={() => handleStatusChange('approved')} disabled={actionPending || registration.status === 'approved'} variant="default">
                        {actionPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                        Approve
                    </Button>
                    <Button onClick={() => handleStatusChange('rejected')} disabled={actionPending || registration.status === 'rejected'} variant="destructive">
                        {actionPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="mr-2 h-4 w-4" />}
                        Reject
                    </Button>
                    <Dialog open={isConfirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" disabled={registration.status !== 'approved'}>
                                <Send className="mr-2 h-4 w-4" />
                                Send Confirmation
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Send Confirmation to {registration.fullName}</DialogTitle>
                                <DialogDescription>
                                    Select the allotted committee and portfolio, then choose the method to send the confirmation.
                                </DialogDescription>
                            </DialogHeader>
                            
                            <div className="py-4">
                                <Label className="font-semibold">Allotment</Label>
                                <RadioGroup 
                                    defaultValue={allotment ? `${allotment.committee}||${allotment.portfolio}` : undefined}
                                    onValueChange={handlePortfolioSelection} 
                                    className="mt-2 space-y-2"
                                >
                                    {portfolioOptions.map((opt, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <RadioGroupItem value={`${opt.committee}||${opt.portfolio}`} id={`opt-${index}`} />
                                            <Label htmlFor={`opt-${index}`}>{opt.label}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>

                            <DialogFooter className="gap-2 sm:justify-end">
                                <Button onClick={handleSendWhatsApp} disabled={!allotment}>Send via WhatsApp</Button>
                                <Button onClick={handleSendEmail} disabled={!allotment}>Send via Email</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>

        </div>
    );
}
