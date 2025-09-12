
'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getRegistrationStatus } from './actions';
import { Loader2, Search, History, User, Mail, Phone } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
      Check Status
    </Button>
  );
}

export default function TrackingForm() {
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

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
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

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Check Registration Status</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <Input
              name="trackingId"
              placeholder="Enter your tracking ID"
              value={trackingIdInput}
              onChange={(e) => setTrackingIdInput(e.target.value)}
              required
            />
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {state.status !== 'idle' && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            {state.status === 'success' && state.data && (
              <Alert>
                <AlertTitle className="flex items-center justify-between mb-4">
                  <span>Application Status</span>
                  <Badge variant={getStatusVariant(state.data.status)}>
                    {state.data.status}
                  </Badge>
                </AlertTitle>
                <AlertDescription asChild>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{state.data.fullName}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{state.data.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{state.data.whatsappNumber}</span>
                        </div>
                    </div>
                </AlertDescription>
              </Alert>
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
              Your Previous Submissions
            </CardTitle>
            <CardDescription>Click an ID to check its status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {savedIds.map((id) => (
                <Button
                  key={id}
                  variant="ghost"
                  className="w-full justify-start font-mono text-xs truncate"
                  onClick={() => handleSavedIdClick(id)}
                >
                  {id}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
    
