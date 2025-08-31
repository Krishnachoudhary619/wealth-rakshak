import Image from "next/image";

export function AboutUs() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <Image
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
            alt="A team collaborating in an office"
            width={800}
            height={600}
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-lg"
            data-ai-hint="team collaboration"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium font-headline">About Us</div>
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl text-primary">
                Your Shield for Financial Security
              </h2>
            </div>
            <p className="max-w-prose text-foreground/80 md:text-lg/relaxed">
              At Wealth Rakshak, our mission is simple – to help individuals and families build wealth in a disciplined and stress-free way. We guide investors in choosing the right mutual funds based on their goals, risk profile, and time horizon.
            </p>
            <p className="max-w-prose text-foreground/80 md:text-lg/relaxed">
              With years of experience as an AMFI-registered Mutual Fund Distributor, we aim to make investing simple, transparent, and effective. Whether it’s starting a SIP, planning for retirement, or creating steady income with SWP, we are here to protect and grow your wealth – step by step.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
