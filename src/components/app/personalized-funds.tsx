"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { getFundsAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Bot, Contact, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const initialState = {
  error: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto shadow-md transition-transform hover:scale-105">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Getting Suggestions...
        </>
      ) : (
        <>
          <Bot className="mr-2 h-4 w-4" />
          Get AI Suggestions
        </>
      )}
    </Button>
  );
}

export function PersonalizedFunds() {
  const [state, formAction] = useActionState(getFundsAction, initialState);

  return (
    <section id="suggestions" className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm text-accent font-medium font-headline">AI-Powered Guidance</div>
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">Personalized Fund Options</h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Enter your age and let our AI provide a curated list of mutual fund options suitable for your investment horizon and risk profile.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Find Your Funds</CardTitle>
              <CardDescription>Tell us your age to get started.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-4">
                <div className="flex flex-col sm:flex-row items-end gap-4">
                  <div className="w-full sm:flex-grow">
                    <Label htmlFor="age">Your Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="e.g., 30"
                      required
                      min="18"
                      max="100"
                    />
                  </div>
                  <SubmitButton />
                </div>
                {state?.error && (
                   <Alert variant="destructive" className="mt-4">
                     <AlertCircle className="h-4 w-4" />
                     <AlertTitle>Error</AlertTitle>
                     <AlertDescription>{state.error}</AlertDescription>
                   </Alert>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {state.data && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold font-headline text-center mb-8">
              Here are your AI-powered suggestions:
            </h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {state.data.map((fund, index) => (
                <div key={fund.name} className="relative">
                  <Card
                    className={`h-full transition-all duration-300 ${
                      index > 0 ? "blur-md" : ""
                    }`}
                  >
                    <CardHeader>
                      <CardTitle className="font-headline text-primary">{fund.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-foreground/90">{fund.description}</p>
                      <p className="text-sm text-foreground/70"><span className="font-bold text-accent">Suitability: </span>{fund.suitability}</p>
                    </CardContent>
                  </Card>
                  {index > 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-background/60 p-4 text-center backdrop-blur-[2px]">
                      <h3 className="text-xl font-bold text-primary font-headline mb-2">Unlock More Options</h3>
                      <p className="text-sm text-foreground/80 mb-4">Contact us to reveal this and other personalized recommendations.</p>
                      <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md">
                        <a href="#contact">
                          <Contact className="mr-2 h-4 w-4"/>
                          Contact Us
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
