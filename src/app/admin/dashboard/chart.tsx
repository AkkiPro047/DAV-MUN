"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type ChartProps = {
  data: {
    name: string;
    count: number;
  }[];
};

const CHART_CONFIG = {
  count: {
    label: "Count",
  },
  Pending: {
    label: "Pending",
    color: "hsl(var(--chart-3))",
  },
  Approved: {
    label: "Approved",
    color: "hsl(var(--chart-2))",
  },
  Rejected: {
    label: "Rejected",
    color: "hsl(var(--chart-5))",
  },
};

export default function RegistrationChart({ data }: ChartProps) {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" tick={{ fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: "hsl(var(--card))" }}
            contentStyle={{
              background: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
            }}
          />
          <Legend />
          <Bar dataKey="count" name="Pending" fill="hsl(217 33% 17%)" />
          <Bar dataKey="count" name="Approved" fill="hsl(160 60% 45%)" />
          <Bar dataKey="count" name="Rejected" fill="hsl(0 62% 30%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
