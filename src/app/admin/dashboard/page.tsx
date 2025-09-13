import { getRegistrations } from "../registrations/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Hourglass, CheckCircle, XCircle } from "lucide-react";
import RegistrationChart from "./chart";

export default async function DashboardPage() {
  const registrations = await getRegistrations();

  const totalRegistrations = registrations.length;
  const pending = registrations.filter((r) => r.status === "pending").length;
  const approved = registrations.filter((r) => r.status === "approved").length;
  const rejected = registrations.filter((r) => r.status === "rejected").length;

  const chartData = [
    { name: "Pending", count: pending },
    { name: "Approved", count: approved },
    { name: "Rejected", count: rejected },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">An overview of website analytics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Registrations
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRegistrations}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Hourglass className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejected}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registration Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <RegistrationChart data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
}
