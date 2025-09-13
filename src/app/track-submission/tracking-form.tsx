
'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getRegistrationStatus } from './actions';
import { Loader2, Search, History, User, Mail, Copy, CheckCircle, XCircle, Hourglass } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
      Track
    </Button>
  );
}

function DetailField({ label, value }: { label: string, value: string }) {
    return (
        <div className="border rounded-md p-3">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
    )
}


export default function TrackingForm() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(getRegistrationStatus, { status: 'idle' });
  const [trackingIdInput, setTrackingIdInput] = useState('');
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem('trackingIds') || '[]');
    setSavedIds(storedIds);
  }, []);

  const handleSavedIdClick = (id: string) => {
    setTrackingIdInput(id);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!', description: text });
  };

  const getStatusVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const statusInfo: {[key: string]: { icon: React.ElementType, message: string, alertVariant: 'default' | 'destructive' | 'secondary' }} = {
      approved: {
          icon: CheckCircle,
          message: 'Congratulations! Your registration has been approved. Further details will be sent to your email.',
          alertVariant: 'default',
      },
      rejected: {
          icon: XCircle,
          message: 'We regret to inform you that your application was not approved at this time. Thank you for your interest.',
          alertVariant: 'destructive',
      },
      pending: {
          icon: Hourglass,
          message: 'Your application is currently under review. Please check back later for an update.',
          alertVariant: 'secondary',
      }
  }

  const currentStatusInfo = state.status === 'success' && state.data?.status ? statusInfo[state.data.status] : null;

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <form action={formAction}>
            <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full space-y-2">
                    <label htmlFor='trackingId' className="text-sm font-medium">Tracking ID</label>
                    <Input
                        id="trackingId"
                        name="trackingId"
                        placeholder="Enter your tracking ID"
                        value={trackingIdInput}
                        onChange={(e) => setTrackingIdInput(e.target.value)}
                        required
                        className="h-12"
                    />
                </div>
                <div className="w-full md:w-auto self-end">
                    <SubmitButton />
                </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {state.status !== 'idle' && (
        <Card>
          <CardHeader>
            <CardTitle>Registration Status</CardTitle>
            {state.status === 'success' && state.trackingId && <CardDescription>Details for Tracking ID: {state.trackingId}</CardDescription>}
          </CardHeader>
          <CardContent>
            {state.status === 'success' && state.data && currentStatusInfo && (
              <div className="space-y-6">
                <Alert variant={currentStatusInfo.alertVariant === 'destructive' ? 'destructive' : 'default'} className={
                    currentStatusInfo.alertVariant === 'secondary' ? 'bg-secondary/30 border-secondary' : ''
                }>
                  <currentStatusInfo.icon className="h-5 w-5" />
                  <AlertTitle className="flex items-center gap-2">
                    Status: <Badge variant={getStatusVariant(state.data.status)}>{state.data.status}</Badge>
                  </AlertTitle>
                  <AlertDescription>
                    {currentStatusInfo.message}
                  </AlertDescription>
                </Alert>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailField label="Full Name" value={state.data.fullName} />
                    <DetailField label="Email" value={state.data.email} />
                </div>
              </div>
            )}
            {state.status === 'error' && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {savedIds.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <History className="mr-2 h-5 w-5" />
              Your All Tracking IDs
            </CardTitle>
            <CardDescription>Click an ID to check its status or copy it.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {savedIds.map((id) => (
                <div key={id} className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-mono text-xs truncate"
                    onClick={() => handleSavedIdClick(id)}
                  >
                    {id}
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(id)}>
                      <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
