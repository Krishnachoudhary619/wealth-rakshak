import { Button } from "@/components/ui/button";
import { Header } from "@/components/app/header";
import { Footer } from "@/components/app/footer";
import { CompoundingVisualizer } from "@/components/app/compounding-visualizer";
import { PersonalizedFunds } from "@/components/app/personalized-funds";
import { InstagramFeed } from "@/components/app/instagram-feed";
import { EducationalResources } from "@/components/app/educational-resources";
import { Target, ShieldCheck } from "lucide-react";
import Image from "next/image";

// Custom icon for a more visually distinct look
const GrowthIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8"
  >
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);


const HeroSection = () => (
  <section id="home" className="w-full py-20 md:py-32 lg:py-40 bg-background">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
            Unlock Your Financial Future with Wealth Rakshak
          </h1>
          <p className="max-w-[600px] text-foreground/80 md:text-xl">
            Your trusted partner in navigating the world of mutual funds. We provide personalized guidance to help you build long-term wealth and achieve your financial dreams.
          </p>
          <div className="flex flex-col gap-4 min-[400px]:flex-row">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-transform hover:scale-105">
              <a href="#contact">Get Started</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5 hover:text-primary shadow-sm transition-transform hover:scale-105">
              <a href="#calculator">See The Magic of Compounding</a>
            </Button>
          </div>
        </div>
        <Image
          src="https://zenithfinserve.in/wp-content/uploads/2025/01/5-Jan-2023-XX-Things-You-Need-To-Know-About-Mutual-Fund-NAV-12.png"
          alt="A person happily planning their finances"
          width={800}
          height={600}
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-lg"
          data-ai-hint="financial growth chart"
        />
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-3">
          <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm text-accent font-medium font-headline">Why Choose Us?</div>
          <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">A Smarter Path to Wealth</h2>
          <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We believe in empowering you with the knowledge and tools to make informed investment decisions.
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
        <div className="grid gap-2 text-center p-6 rounded-lg transition-all hover:bg-background/80 hover:shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4 shadow-inner">
               <GrowthIcon />
            </div>
          <h3 className="text-xl font-bold font-headline text-primary">Long-Term Growth</h3>
          <p className="text-sm text-foreground/80">
            Harness the power of compounding with mutual funds for substantial long-term wealth creation.
          </p>
        </div>
        <div className="grid gap-2 text-center p-6 rounded-lg transition-all hover:bg-background/80 hover:shadow-xl">
           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4 shadow-inner">
              <Target className="h-8 w-8" />
            </div>
          <h3 className="text-xl font-bold font-headline text-primary">Personalized Strategy</h3>
          <p className="text-sm text-foreground/80">
            Receive guidance tailored to your age, financial goals, and risk appetite.
          </p>
        </div>
        <div className="grid gap-2 text-center p-6 rounded-lg transition-all hover:bg-background/80 hover:shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4 shadow-inner">
             <ShieldCheck className="h-8 w-8" />
            </div>
          <h3 className="text-xl font-bold font-headline text-primary">Expert Guidance</h3>
          <p className="text-sm text-foreground/80">
            Benefit from our expertise in the mutual fund market to navigate your investment journey.
          </p>
        </div>
      </div>
    </div>
  </section>
);


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <CompoundingVisualizer />
        <PersonalizedFunds />
        <EducationalResources />
        <InstagramFeed />
      </main>
      <Footer />
    </div>
  );
}
