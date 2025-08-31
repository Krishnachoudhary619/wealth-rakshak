import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { GraduationCap } from "lucide-react";
  
const resources = [
    {
        question: "Why is Investing Important Today?",
        answer: "Life is getting expensive every year. Twenty years ago, a good college education cost 2–3 lakhs. Today it’s 15–20 lakhs, and in another 20 years it could be 40–50 lakhs. If your money sits in savings or FDs, it grows at just 4–6%, while inflation is around 6–7%. That means your money is losing value. For example, ₹10 lakh in a savings account may become ₹15 lakh in 20 years. But due to inflation, it will feel like just ₹5–6 lakh in today’s value. The same ₹10 lakh invested in mutual funds at 12% could grow to over ₹1 crore. That’s the difference between struggling and being secure. Investing is not greed; it’s survival. It ensures your children’s education, your family’s comfort, and your peaceful retirement. In today’s India, investing is not optional — it’s essential."
    },
    {
        question: "Why Investors Are Rising in India",
        answer: "Fifteen years ago, most Indians trusted only FDs, gold, or land. Mutual funds felt risky or complicated. But things have changed. In 2000, less than 1 crore Indians invested in mutual funds. Today, it’s over 4.5 crores — and growing every month. Why this shift? People realized FDs don’t beat inflation, while mutual funds build real wealth. Technology also made investing simple — start with a mobile app, track anytime, withdraw easily. Plus, strict SEBI rules keep money safe. India is moving from a “saver’s country” to an “investor’s country.” The only question is: do you want to move with the new India, or stay stuck in the old ways?"
    },
    {
        question: "Why Mutual Funds Are Smarter Than Traditional Options",
        answer: "We’ve all heard: “FD is safe.” And yes, it is — but it doesn’t grow wealth. FD returns are 5–6%, while inflation is 6–7%. You save for years but don’t move ahead. Mutual funds, on the other hand, have given 10–12% over the long term. Professionals manage your money across industries, reducing risks and giving better growth. Example: ₹1 lakh in FD for 20 years grows to ₹2.65 lakh. The same in mutual funds at 12% grows to over ₹10 lakh. That’s the power of smart investing. Mutual funds aren’t “risky gambling” — they are regulated, transparent, and one of the best ways to beat inflation consistently."
    },
    {
        question: "The Magic of Compounding – Start Early, Grow Big",
        answer: "Compounding means your money earns returns, and then those returns also earn returns. Over time, it’s like a snowball becoming bigger and bigger. Take two friends: Aman starts investing ₹5,000/month at 25, for just 10 years. Ravi starts at 35, investing the same amount for 20 years. By 55, Aman has ₹1.1 crore, Ravi has ₹75 lakh — though Aman invested less! That’s the magic of starting early. The best day to invest was yesterday. The next best is today. Delay, and you lose years of compounding you can never get back."
    },
    {
        question: "How Investing Gives You Financial Freedom",
        answer: "Life goals — kids’ education, a dream home, vacations, or stress-free retirement — all need money. Depending only on salary keeps you limited. Investing creates a second income — your money works for you. Investments give freedom. Freedom to handle emergencies, to avoid loans, to choose the life you want. Someone who invested for 15 years can take a career break or retire early. Someone who didn’t invest has to compromise. Investing is not just about money; it’s about confidence and living life on your terms."
    },
    {
        question: "Saving vs. Investing – The Real Difference",
        answer: "Saving and investing are not the same. Saving means setting money aside. Investing means growing it. If you save ₹10,000/month for 20 years, you’ll have ₹24 lakh. If you invest the same in mutual funds at 12%, you’ll have over ₹1 crore. That’s life-changing. Saving protects your money. Investing multiplies it. It’s like keeping seeds in a jar (saving) vs. planting them in soil (investing). Only one grows into a tree."
    },
    {
        question: "Why Regular Investing (SIP) Works Best",
        answer: "SIP (Systematic Investment Plan) is one of the best ways to invest. You put in a fixed amount monthly — just like a bill payment. Start with ₹500 or ₹1,000. Over time, it builds wealth. SIPs bring discipline and reduce stress about market ups and downs. Through rupee-cost averaging, you buy fewer units when markets are high and more when they are low — balancing your returns."
    },
    {
        question: "Investing Creates Freedom, Not Just Wealth",
        answer: "“Real wealth is not about a big bank balance, it’s about freedom — the freedom to make choices without stress. The freedom to take a career break, to support your parents with pride, to explore the world, or to simply live peacefully without worrying about bills. That freedom comes only when you invest consistently. Salaries may stop one day, but your investments will keep working for you. And that’s what financial freedom truly means."
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
                    <AccordionTrigger className="text-lg font-headline hover:no-underline text-left">
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 text-accent"><GraduationCap className="h-5 w-5" /></div>
                            {resource.question}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-foreground/80 pl-8 whitespace-pre-line">
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
