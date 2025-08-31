"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "Corpus Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export function SWPCalculator() {
  const [totalInvestment, setTotalInvestment] = useState(10000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(50000);
  const [expectedReturn, setExpectedReturn] = useState(8);

  const { chartData, years, finalBalance } = useMemo(() => {
    const data = [];
    let currentValue = totalInvestment;
    const monthlyReturnRate = Math.pow(1 + expectedReturn / 100, 1 / 12) - 1;
    let months = 0;

    if (monthlyWithdrawal <= totalInvestment * monthlyReturnRate) {
        // Withdrawals are sustainable, project for 40 years
        for (let m = 1; m <= 480; m++) {
            currentValue = currentValue * (1 + monthlyReturnRate) - monthlyWithdrawal;
            if (m % 12 === 0) {
                 data.push({
                    year: `Year ${m/12}`,
                    value: Math.round(currentValue),
                });
            }
        }
        months = 480;
    } else {
        // Corpus will deplete, calculate until it's zero
        while (currentValue > 0) {
            currentValue = currentValue * (1 + monthlyReturnRate) - monthlyWithdrawal;
            months++;
            if (months % 12 === 0) {
                data.push({
                    year: `Year ${months/12}`,
                    value: Math.max(0, Math.round(currentValue)),
                });
            }
             if (months > 480) break; // Safety break after 40 years
        }
    }
    
    return { chartData: data, years: Math.floor(months / 12), finalBalance: Math.max(0, currentValue) };
  }, [totalInvestment, monthlyWithdrawal, expectedReturn]);

  return (
    <Card className="shadow-lg overflow-hidden flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-xl sm:text-2xl text-primary">SWP Calculator</CardTitle>
        <CardDescription>Estimate how long your corpus will last with regular withdrawals.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="total-investment" className="text-sm">Total Investment</Label>
              <span className="font-bold font-headline text-primary text-lg">{formatCurrency(totalInvestment)}</span>
            </div>
            <Slider id="total-investment" value={[totalInvestment]} onValueChange={([val]) => setTotalInvestment(val)} min={100000} max={50000000} step={100000} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="monthly-withdrawal" className="text-sm">Monthly Withdrawal</Label>
              <span className="font-bold font-headline text-primary text-lg">{formatCurrency(monthlyWithdrawal)}</span>
            </div>
            <Slider id="monthly-withdrawal" value={[monthlyWithdrawal]} onValueChange={([val]) => setMonthlyWithdrawal(val)} min={1000} max={200000} step={1000} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="swp-expected-return" className="text-sm">Expected Return (%)</Label>
              <span className="font-bold font-headline text-primary text-lg">{expectedReturn}%</span>
            </div>
            <Slider id="swp-expected-return" value={[expectedReturn]} onValueChange={([val]) => setExpectedReturn(val)} min={1} max={20} step={1} />
          </div>
        </div>
        <div className="flex-1 flex flex-col h-[300px] bg-primary/5 p-4 rounded-lg">
           <div className="flex-1 w-full">
              <ChartContainer config={chartConfig}>
                <LineChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
                  <YAxis tickFormatter={(value) => `₹${Number(value) / 100000}L`} tickLine={false} axisLine={false} width={60} fontSize={10}/>
                  <ChartTooltip
                    cursor={true}
                    content={
                      <ChartTooltipContent
                        formatter={(value, name) => (
                           <div className="flex items-center">
                             <div className="mr-2 h-2.5 w-2.5 shrink-0 rounded-[2px]" style={{ backgroundColor: chartConfig.value.color }}/>
                             <span className="text-xs">Corpus: {formatCurrency(value as number)}</span>
                           </div>
                        )}
                        labelFormatter={(label) => <div className="font-bold text-sm">{label}</div>}
                      />
                    }
                  />
                  <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} dot={false} />
                </LineChart>
              </ChartContainer>
          </div>
          <div className="mt-4 flex flex-col items-center text-center p-2 bg-background rounded-lg shadow-inner">
             <div>
                <p className="text-xs text-muted-foreground">Your money will last for</p>
                <p className="text-lg font-bold font-headline text-primary">{years >= 40 ? "40+ Years" : `${years} Years`}</p>
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
