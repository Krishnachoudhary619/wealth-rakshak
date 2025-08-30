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
        answer: "A mutual fund is a professionally managed investment fund that pools money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities. This diversification helps spread out risk."
    },
    {
        question: "What is a Systematic Investment Plan (SIP)?",
        answer: "A SIP is a method of investing in mutual funds where you invest a fixed amount of money at regular intervals (e.g., monthly). It helps in rupee cost averaging and develops a disciplined investing habit."
    },
    {
        question: "How does the Power of Compounding work?",
        answer: "Compounding is the process where your investment returns themselves start earning returns. Over time, this can lead to exponential growth of your money. The longer your money stays invested, the more powerful compounding becomes."
    },
    {
        question: "What is risk tolerance?",
        answer: "Risk tolerance is an investor's ability and willingness to withstand large swings in the value of their investments. It's a crucial factor in determining the right investment strategy, as higher-risk investments typically have the potential for higher returns, and vice-versa."
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
