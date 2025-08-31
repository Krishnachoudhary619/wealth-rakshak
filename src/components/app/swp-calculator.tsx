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

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export function SWPCalculator() {
  const [totalInvestment, setTotalInvestment] = useState(50000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(1000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [duration, setDuration] = useState(5);

  const { finalValue, totalWithdrawal } = useMemo(() => {
    const monthlyReturnRate = expectedReturn / 100 / 12;
    const totalMonths = duration * 12;

    let balance = totalInvestment;

    for (let i = 0; i < totalMonths; i++) {
        // Add interest for the month
        balance += balance * monthlyReturnRate;
        // Subtract the withdrawal
        balance -= monthlyWithdrawal;
    }
    
    const calculatedFinalValue = balance;
    const calculatedTotalWithdrawal = monthlyWithdrawal * totalMonths;

    return { 
        finalValue: Math.max(0, Math.round(calculatedFinalValue)), 
        totalWithdrawal: calculatedTotalWithdrawal 
    };
  }, [totalInvestment, monthlyWithdrawal, expectedReturn, duration]);

  return (
    <Card className="shadow-lg overflow-hidden flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-xl sm:text-2xl text-primary">SWP Calculator</CardTitle>
        <CardDescription>Estimate your corpus value after regular withdrawals for a fixed period.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 space-y-6">
            <div className="p-4 border rounded-lg text-center shadow-inner">
                <p className="text-sm text-muted-foreground">Total Investment</p>
                <p className="text-3xl font-bold font-headline text-primary">{formatCurrency(totalInvestment)}</p>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                    <Label htmlFor="total-investment" className="text-sm">Total Investment</Label>
                    <span className="font-bold font-headline text-primary text-lg">{formatCurrency(totalInvestment)}</span>
                    </div>
                    <Slider id="total-investment" value={[totalInvestment]} onValueChange={([val]) => setTotalInvestment(val)} min={50000} max={10000000} step={10000} />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                    <Label htmlFor="monthly-withdrawal" className="text-sm">Monthly Withdrawal</Label>
                    <span className="font-bold font-headline text-primary text-lg">{formatCurrency(monthlyWithdrawal)}</span>
                    </div>
                    <Slider id="monthly-withdrawal" value={[monthlyWithdrawal]} onValueChange={([val]) => setMonthlyWithdrawal(val)} min={500} max={50000} step={500} />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                    <Label htmlFor="swp-expected-return" className="text-sm">Expected Return (%)</Label>
                    <span className="font-bold font-headline text-primary text-lg">{expectedReturn}%</span>
                    </div>
                    <Slider id="swp-expected-return" value={[expectedReturn]} onValueChange={([val]) => setExpectedReturn(val)} min={1} max={40} step={1} />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                    <Label htmlFor="duration" className="text-sm">Select Duration (Yrs)</Label>
                    <span className="font-bold font-headline text-primary text-lg">{duration}</span>
                    </div>
                    <Slider id="duration" value={[duration]} onValueChange={([val]) => setDuration(val)} min={1} max={30} step={1} />
                </div>
            </div>
        </div>
        <div className="lg:w-1/2 flex flex-col justify-center items-center space-y-8 bg-primary/5 p-6 rounded-lg">
             <div className="text-center">
                <p className="text-muted-foreground">Invested Amount</p>
                <p className="text-4xl font-bold font-headline text-primary">{formatCurrency(totalInvestment)}</p>
             </div>
             <div className="text-center">
                <p className="text-muted-foreground">Total Withdrawal</p>
                <p className="text-4xl font-bold font-headline text-primary">{formatCurrency(totalWithdrawal)}</p>
             </div>
             <div className="text-center">
                <p className="text-muted-foreground">Final Value</p>
                <p className="text-4xl font-bold font-headline text-accent">{formatCurrency(finalValue)}</p>
             </div>
        </div>
      </CardContent>
    </Card>
  );
}
