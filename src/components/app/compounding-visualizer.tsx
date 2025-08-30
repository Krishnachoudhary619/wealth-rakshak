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
import { TrendingUp } from "lucide-react";

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

export function CompoundingVisualizer() {
  const [initialInvestment, setInitialInvestment] = useState(50000);
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [timeHorizon, setTimeHorizon] = useState(15);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const chartData = useMemo(() => {
    const data = [];
    let principal = initialInvestment;
    let current_value = initialInvestment;

    for (let year = 1; year <= timeHorizon; year++) {
      let yearly_investment = monthlyInvestment * 12;
      principal += yearly_investment;
      current_value = (current_value + yearly_investment) * (1 + expectedReturn / 100);
      data.push({
        year: `Year ${year}`,
        invested: Math.round(principal),
        returns: Math.round(current_value - principal),
        total: Math.round(current_value),
      });
    }
    return data;
  }, [initialInvestment, monthlyInvestment, timeHorizon, expectedReturn]);

  const finalValue = chartData.length > 0 ? chartData[chartData.length - 1].total : initialInvestment;
  const totalInvested = chartData.length > 0 ? chartData[chartData.length - 1].invested : initialInvestment;

  return (
    <section id="calculator" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium font-headline">Visualize Your Wealth</div>
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">The Power of Compounding</h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Use our interactive tool to see how consistent, long-term investment can grow your wealth exponentially over time. Adjust the sliders to match your financial goals.
            </p>
          </div>
        </div>

        <Card className="shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-5">
            <div className="lg:col-span-2 p-4 md:p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="initial-investment">Initial Investment</Label>
                  <span className="font-bold font-headline text-primary text-sm sm:text-base">{formatCurrency(initialInvestment)}</span>
                </div>
                <Slider id="initial-investment" value={[initialInvestment]} onValueChange={([val]) => setInitialInvestment(val)} min={0} max={1000000} step={10000} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="monthly-investment">Monthly Investment</Label>
                  <span className="font-bold font-headline text-primary text-sm sm:text-base">{formatCurrency(monthlyInvestment)}</span>
                </div>
                <Slider id="monthly-investment" value={[monthlyInvestment]} onValueChange={([val]) => setMonthlyInvestment(val)} min={1000} max={100000} step={1000} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="time-horizon">Time Horizon (Years)</Label>
                  <span className="font-bold font-headline text-primary text-sm sm:text-base">{timeHorizon}</span>
                </div>
                <Slider id="time-horizon" value={[timeHorizon]} onValueChange={([val]) => setTimeHorizon(val)} min={1} max={40} step={1} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="expected-return">Expected Annual Return (%)</Label>
                  <span className="font-bold font-headline text-primary text-sm sm:text-base">{expectedReturn}%</span>
                </div>
                <Slider id="expected-return" value={[expectedReturn]} onValueChange={([val]) => setExpectedReturn(val)} min={1} max={25} step={1} />
              </div>
            </div>
            <div className="lg:col-span-3 p-4 md:p-6 bg-primary/5 rounded-r-lg">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="font-headline text-xl sm:text-2xl">Projected Growth</CardTitle>
                <CardDescription>Your investment journey over {timeHorizon} years.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
                  <BarChart data={chartData} accessibilityLayer stackOffset="sign" margin={{ left: -10, right: 10 }}>
                    <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
                    <YAxis tickFormatter={(value) => `₹${Number(value) / 100000}L`} tickLine={false} axisLine={false} width={50} fontSize={10}/>
                    <ChartTooltip
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
                <div className="mt-4 flex flex-col sm:flex-row justify-around text-center p-3 bg-background rounded-lg shadow-inner gap-4 sm:gap-2">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Total Invested</p>
                    <p className="text-lg sm:text-2xl font-bold font-headline text-accent">{formatCurrency(totalInvested)}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Projected Value</p>
                    <p className="text-lg sm:text-2xl font-bold font-headline text-primary">{formatCurrency(finalValue)}</p>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
