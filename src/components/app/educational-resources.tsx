import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { GraduationCap } from "lucide-react";
  
const resources = [
    {
        question: "What is a Mutual Fund?",
        answer: "A mutual fund pools money from many investors and invests in equity, debt, or gold. It gives you diversification, professional management, and easy access to multiple investments."
    },
    {
        question: "What is SIP & Power of Compounding?",
        answer: "A SIP (Systematic Investment Plan) in mutual funds lets you invest small amounts regularly. With compounding, these small investments grow into a big corpus over time."
    },
    {
        question: "What is SWP (Systematic Withdrawal Plan)?",
        answer: "An SWP in mutual funds lets you withdraw a fixed amount regularly from your investment. It’s useful for creating a steady income while your remaining money keeps growing."
    },
    {
        question: "What is Risk Tolerance?",
        answer: "Mutual funds come with different levels of risk. Risk tolerance is your comfort with market ups and downs, based on your age, goals, and financial situation."
    },
    {
        question: "What is Asset Allocation?",
        answer: "Mutual funds allow you to spread money across equity, debt, and gold. Asset allocation balances risk and return, aligning your portfolio with your goals and time horizon."
    }
]

export function EducationalResources() {
    return (
        <section id="learn" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-3">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium font-headline">Knowledge Center</div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">Key Investing Concepts</h2>
                <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Empower yourself with fundamental knowledge. Understanding these concepts is the first step towards a successful investment journey.
                </p>
              </div>
            </div>
    
            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {resources.map((resource, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-headline hover:no-underline">
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 text-accent"><GraduationCap className="h-5 w-5" /></div>
                            {resource.question}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-foreground/80 pl-8">
                      {resource.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      );
}
