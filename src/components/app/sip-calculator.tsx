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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  invested: {
    label: "Invested",
    color: "hsl(var(--chart-2))",
  },
  returns: {
    label: "Returns",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [timeHorizon, setTimeHorizon] = useState(15);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const { chartData, finalValue, totalInvested, totalReturns } = useMemo(() => {
    const data = [];
    const annualReturn = expectedReturn / 100;
    const monthlyRate = Math.pow(1 + annualReturn, 1 / 12) - 1;
    const totalMonths = timeHorizon * 12;

    for (let year = 1; year <= timeHorizon; year++) {
      const monthsForYear = year * 12;
      const maturityValue = monthlyInvestment * ( (Math.pow(1 + monthlyRate, monthsForYear) - 1) / monthlyRate ) * (1 + monthlyRate);
      
      const investedAmount = monthlyInvestment * monthsForYear;
      
      data.push({
        year: `Year ${year}`,
        invested: Math.round(investedAmount),
        returns: Math.round(maturityValue - investedAmount),
        total: Math.round(maturityValue),
      });
    }

    const finalMaturityValue = monthlyInvestment * ( (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate ) * (1 + monthlyRate);
    const totalPrincipal = monthlyInvestment * totalMonths;

    const finalVal = Math.round(finalMaturityValue);
    const investedVal = Math.round(totalPrincipal);
    const returnsVal = finalVal - investedVal;

    return {
      chartData: data,
      finalValue: finalVal,
      totalInvested: investedVal,
      totalReturns: returnsVal,
    };
  }, [monthlyInvestment, timeHorizon, expectedReturn]);

  return (
    <Card className="shadow-lg overflow-hidden flex flex-col">
        <CardHeader>
            <CardTitle className="font-headline text-xl sm:text-2xl text-primary">SIP Calculator</CardTitle>
            <CardDescription>Project your wealth growth with systematic investments.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                    <Label htmlFor="monthly-investment" className="text-sm">Monthly Investment</Label>
                    <span className="font-bold font-headline text-primary text-lg">{formatCurrency(monthlyInvestment)}</span>
                    </div>
                    <Slider id="monthly-investment" value={[monthlyInvestment]} onValueChange={([val]) => setMonthlyInvestment(val)} min={1000} max={100000} step={1000} />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                    <Label htmlFor="time-horizon" className="text-sm">Time Horizon (Years)</Label>
                    <span className="font-bold font-headline text-primary text-lg">{timeHorizon}</span>
                    </div>
                    <Slider id="time-horizon" value={[timeHorizon]} onValueChange={([val]) => setTimeHorizon(val)} min={1} max={40} step={1} />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                    <Label htmlFor="expected-return" className="text-sm">Expected Return (%)</Label>
                    <span className="font-bold font-headline text-primary text-lg">{expectedReturn}%</span>
                    </div>
                    <Slider id="expected-return" value={[expectedReturn]} onValueChange={([val]) => setExpectedReturn(val)} min={1} max={40} step={1} />
                </div>
            </div>
            <div className="flex-1 flex flex-col h-[300px] bg-primary/5 p-4 rounded-lg">
                <div className="flex-1 w-full">
                    <ChartContainer config={chartConfig}>
                        <BarChart data={chartData} accessibilityLayer stackOffset="sign" margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                            <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
                            <YAxis tickFormatter={(value) => `₹${Number(value) / 100000}L`} tickLine={false} axisLine={false} width={60} fontSize={10}/>
                            <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                formatter={(value, name) => {
                                    const config = chartConfig[name as keyof typeof chartConfig];
                                    return (
                                        <div className="flex items-center">
                                        <div
                                            className="mr-2 h-2.5 w-2.5 shrink-0 rounded-[2px]"
                                            style={{ backgroundColor: config.color }}
                                        />
                                        <span className="text-xs">{config.label}: {formatCurrency(value as number)}</span>
                                        </div>
                                    )
                                }}
                                labelFormatter={(label, payload) => {
                                    const total = payload?.[0]?.payload.total ?? 0;
                                    return (
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm">{label}</span>
                                        <span className="text-xs">Total: {formatCurrency(total)}</span>
                                    </div>
                                    )
                                }}
                                />
                            }
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="invested" stackId="a" fill="var(--color-invested)" radius={[0, 0, 4, 4]} />
                            <Bar dataKey="returns" stackId="a" fill="var(--color-returns)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ChartContainer>
                </div>
                <div className="mt-4 text-center p-2 bg-background rounded-lg shadow-inner space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                        <p className="text-xs text-muted-foreground">Total Invested</p>
                        <p className="text-md font-bold font-headline text-accent">{formatCurrency(totalInvested)}</p>
                    </div>
                     <div>
                        <p className="text-xs text-muted-foreground">Est. Returns</p>
                        <p className="text-md font-bold font-headline text-accent">{formatCurrency(totalReturns)}</p>
                    </div>
                  </div>
                  <div>
                      <p className="text-xs text-muted-foreground">Projected Value</p>
                      <p className="text-lg font-bold font-headline text-primary">{formatCurrency(finalValue)}</p>
                  </div>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}
