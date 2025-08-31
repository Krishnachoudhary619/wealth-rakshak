"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { saveContactAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, Send, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const initialState = {
  error: null,
  data: null,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full shadow-md transition-transform hover:scale-105">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Submit
        </>
      )}
    </Button>
  );
}

export function ContactUs() {
  const [state, formAction] = useActionState(saveContactAction, initialState);

  return (
    <section id="contact-form" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium font-headline">Get In Touch</div>
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">Contact Us</h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have questions? Want to get started? Fill out the form below and we'll get back to you shortly.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-lg">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Contact Form</CardTitle>
              <CardDescription>We're excited to hear from you!</CardDescription>
            </CardHeader>
            <CardContent>
                {state.success ? (
                    <Alert className="border-green-500 text-green-700">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <AlertTitle>Submission Successful!</AlertTitle>
                        <AlertDescription>Thank you for reaching out. We will get back to you soon.</AlertDescription>
                    </Alert>
                ) : (
                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" name="name" type="text" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="email">Your Email</Label>
                        <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="phone">Your Phone</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="+91 12345 67890" required />
                        </div>
                        <SubmitButton />
                        {state?.error && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{state.error}</AlertDescription>
                        </Alert>
                        )}
                    </form>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
